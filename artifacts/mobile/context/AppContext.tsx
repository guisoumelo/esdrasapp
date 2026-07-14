import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DayProgress,
  WrongAnswer,
  BlockAvailability,
  Rank,
  Profile,
  ProfileData,
  Gender,
  ThemeId,
  DEFAULT_THEME_ID,
  getRank,
  getBlockAvailability,
  MAX_UNLOCKED_DOCTRINE,
} from '../types';

const STORAGE_KEYS = {
  PROFILES: '@esdras_profiles',
  ACTIVE_PROFILE: '@esdras_active_profile',
  /** @deprecated global key kept only for one-time migration */
  TIME_LOCK_GLOBAL: '@esdras_time_lock',
  DEBUG_HOUR: '@esdras_debug_hour',
  PROFILE_DATA: (id: string) => `@esdras_data_${id}`,
};

function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getRealHour(): number {
  return new Date().getHours();
}

function makeId(): string {
  return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function buildFreshDayProgress(doctrineId: number, isSecondAttempt: boolean): DayProgress {
  return {
    doctrineId,
    date: getTodayString(),
    readingCompleted: false,
    block1Passed: null,
    block2Passed: null,
    provaoPassed: null,
    isSecondAttempt,
  };
}

function buildFreshProfileData(): ProfileData {
  return {
    currentDoctrineId: 1,
    completedDoctrines: [],
    readDoctrines: [],
    dayProgress: buildFreshDayProgress(1, false),
    errorScroll: [],
  };
}

/** Migrate old ProfileData that may lack readDoctrines. */
function normalizeProfileData(raw: Partial<ProfileData> & Omit<ProfileData, 'readDoctrines'>): ProfileData {
  const base = raw as ProfileData;
  if (base.readDoctrines) return base;
  const readDoctrines = [...base.completedDoctrines];
  if (base.dayProgress.readingCompleted && !readDoctrines.includes(base.currentDoctrineId)) {
    readDoctrines.push(base.currentDoctrineId);
  }
  return { ...base, readDoctrines };
}

function applyDayChange(data: ProfileData): ProfileData {
  const today = getTodayString();
  if (data.dayProgress.date === today) return data;

  const progress = data.dayProgress;
  let currentDoctrineId = data.currentDoctrineId;
  let completedDoctrines = [...data.completedDoctrines];

  if (progress.provaoPassed === true) {
    if (!completedDoctrines.includes(progress.doctrineId)) {
      completedDoctrines.push(progress.doctrineId);
    }
    currentDoctrineId = Math.min(progress.doctrineId + 1, MAX_UNLOCKED_DOCTRINE);
    return {
      ...data,
      currentDoctrineId,
      completedDoctrines,
      dayProgress: buildFreshDayProgress(currentDoctrineId, false),
    };
  }

  const anyAttempted =
    progress.block1Passed !== null ||
    progress.block2Passed !== null ||
    progress.provaoPassed !== null;
  return {
    ...data,
    completedDoctrines,
    dayProgress: buildFreshDayProgress(
      progress.doctrineId,
      anyAttempted || progress.isSecondAttempt,
    ),
  };
}

/** Returns the effective timeLock for a profile (defaults to true). */
function profileTimeLock(p: Profile): boolean {
  return p.timeLockEnabled ?? true;
}

interface AppContextType {
  loaded: boolean;

  // Profiles
  profiles: Profile[];
  activeProfile: Profile | null;

  // Active profile progress
  currentDoctrineId: number;
  completedDoctrines: number[];
  dayProgress: DayProgress;
  errorScroll: WrongAnswer[];

  // Settings / debug
  timeLockEnabled: boolean;
  debugHour: number | null;
  currentHour: number;

  // Appearance (per-profile theme)
  themeId: ThemeId;

  // Derived
  blockAvailability: BlockAvailability;
  currentRank: Rank;
  masterMode: boolean;

  // Profile actions
  createProfile: (nome: string, gender: Gender, avatar?: string) => Promise<void>;
  updateProfile: (id: string, nome: string, gender: Gender, avatar: string) => Promise<void>;
  switchProfile: (id: string) => Promise<void>;
  deleteProfile: (id: string) => Promise<void>;
  resetAll: () => Promise<void>;

  // Progress actions
  readDoctrines: number[];
  markDoctrineRead: (id: number) => Promise<void>;
  completeReading: () => Promise<void>;
  completeBlock: (
    block: 'block1' | 'block2' | 'provao',
    passed: boolean,
    errors?: WrongAnswer[],
  ) => Promise<void>;

  // Settings actions
  setDebugHour: (hour: number | null) => Promise<void>;
  setTimeLockEnabled: (enabled: boolean) => Promise<void>;
  setThemeId: (id: ThemeId) => Promise<void>;
  resetProgress: () => Promise<void>;
}

export const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);
  const [data, setData] = useState<ProfileData>(buildFreshProfileData());
  const [debugHour, setDebugHourState] = useState<number | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  const activeProfile = profiles.find((p) => p.id === activeProfileId) ?? null;
  const timeLockEnabled: boolean = activeProfile ? profileTimeLock(activeProfile) : true;
  const themeId: ThemeId = activeProfile?.themeId ?? DEFAULT_THEME_ID;
  const currentHour = debugHour !== null ? debugHour : getRealHour();
  const blockAvailability = getBlockAvailability(currentHour, data.dayProgress, timeLockEnabled);
  const masterMode = data.completedDoctrines.length >= 28;
  const currentRank = getRank(data.completedDoctrines.length);

  // ── Persistence helpers ────────────────────────────────────────────────────
  async function persistData(id: string, next: ProfileData) {
    await AsyncStorage.setItem(STORAGE_KEYS.PROFILE_DATA(id), JSON.stringify(next));
  }

  async function loadProfileData(id: string, lock: boolean): Promise<ProfileData> {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.PROFILE_DATA(id));
    const parsed: ProfileData = raw ? normalizeProfileData(JSON.parse(raw)) : buildFreshProfileData();
    return lock ? applyDayChange(parsed) : parsed;
  }

  // ── Initial load ────────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const [storedProfiles, storedActive, storedTimeLockGlobal, storedDebug] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.PROFILES),
          AsyncStorage.getItem(STORAGE_KEYS.ACTIVE_PROFILE),
          AsyncStorage.getItem(STORAGE_KEYS.TIME_LOCK_GLOBAL),
          AsyncStorage.getItem(STORAGE_KEYS.DEBUG_HOUR),
        ]);

        let parsedProfiles: Profile[] = storedProfiles ? JSON.parse(storedProfiles) : [];

        // One-time migration: if global key exists, apply to profiles that don't have own setting.
        if (storedTimeLockGlobal !== null) {
          const globalLock: boolean = JSON.parse(storedTimeLockGlobal);
          let migrated = false;
          parsedProfiles = parsedProfiles.map((p) => {
            if (p.timeLockEnabled === undefined) {
              migrated = true;
              return { ...p, timeLockEnabled: globalLock };
            }
            return p;
          });
          if (migrated) {
            await AsyncStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(parsedProfiles));
          }
          // Remove global key after migration.
          await AsyncStorage.removeItem(STORAGE_KEYS.TIME_LOCK_GLOBAL);
        }

        const dbgHour = storedDebug !== null ? JSON.parse(storedDebug) : null;
        setProfiles(parsedProfiles);
        setDebugHourState(dbgHour);

        const activeId =
          storedActive && parsedProfiles.some((p) => p.id === storedActive)
            ? storedActive
            : parsedProfiles[0]?.id ?? null;

        if (activeId) {
          setActiveProfileId(activeId);
          const targetProfile = parsedProfiles.find((p) => p.id === activeId)!;
          const lock = profileTimeLock(targetProfile);
          const normalized = await loadProfileData(activeId, lock);
          setData(normalized);
          await persistData(activeId, normalized);
        }
      } catch (e) {
        console.error('Failed to load state', e);
      } finally {
        setLoaded(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Day-boundary watcher ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!loaded || !activeProfileId || !timeLockEnabled) return;
    if (data.dayProgress.date === getTodayString()) return;
    const normalized = applyDayChange(data);
    setData(normalized);
    persistData(activeProfileId, normalized);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, activeProfileId, timeLockEnabled, tick]);

  // ── Profile actions ──────────────────────────────────────────────────────────
  const createProfile = async (nome: string, gender: Gender, avatar?: string) => {
    const profile: Profile = {
      id: makeId(),
      nome: nome.trim(),
      gender,
      avatar,
      themeId: DEFAULT_THEME_ID,
      timeLockEnabled: true,
    };
    const nextProfiles = [...profiles, profile];
    const freshData = buildFreshProfileData();

    setProfiles(nextProfiles);
    setActiveProfileId(profile.id);
    setData(freshData);

    await Promise.all([
      AsyncStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(nextProfiles)),
      AsyncStorage.setItem(STORAGE_KEYS.ACTIVE_PROFILE, profile.id),
      persistData(profile.id, freshData),
    ]);
  };

  const updateProfile = async (id: string, nome: string, gender: Gender, avatar: string) => {
    const nextProfiles = profiles.map((p) =>
      p.id === id ? { ...p, nome: nome.trim(), gender, avatar } : p,
    );
    setProfiles(nextProfiles);
    await AsyncStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(nextProfiles));
  };

  const switchProfile = async (id: string) => {
    if (!profiles.some((p) => p.id === id)) return;
    const targetProfile = profiles.find((p) => p.id === id)!;
    const lock = profileTimeLock(targetProfile);
    const normalized = await loadProfileData(id, lock);
    setActiveProfileId(id);
    setData(normalized);
    await AsyncStorage.setItem(STORAGE_KEYS.ACTIVE_PROFILE, id);
    await persistData(id, normalized);
  };

  const deleteProfile = async (id: string) => {
    const nextProfiles = profiles.filter((p) => p.id !== id);
    setProfiles(nextProfiles);
    await Promise.all([
      AsyncStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(nextProfiles)),
      AsyncStorage.removeItem(STORAGE_KEYS.PROFILE_DATA(id)),
    ]);

    if (activeProfileId === id) {
      const nextActive = nextProfiles[0]?.id ?? null;
      if (nextActive) {
        const targetProfile = nextProfiles.find((p) => p.id === nextActive)!;
        const lock = profileTimeLock(targetProfile);
        const normalized = await loadProfileData(nextActive, lock);
        setActiveProfileId(nextActive);
        setData(normalized);
        await AsyncStorage.setItem(STORAGE_KEYS.ACTIVE_PROFILE, nextActive);
        await persistData(nextActive, normalized);
      } else {
        setActiveProfileId(null);
        setData(buildFreshProfileData());
        await AsyncStorage.removeItem(STORAGE_KEYS.ACTIVE_PROFILE);
      }
    }
  };

  const resetAll = async () => {
    // Wipe all profile data
    for (const p of profiles) {
      await AsyncStorage.removeItem(STORAGE_KEYS.PROFILE_DATA(p.id));
    }
    await Promise.all([
      AsyncStorage.removeItem(STORAGE_KEYS.PROFILES),
      AsyncStorage.removeItem(STORAGE_KEYS.ACTIVE_PROFILE),
      AsyncStorage.removeItem(STORAGE_KEYS.TIME_LOCK_GLOBAL),
      AsyncStorage.removeItem(STORAGE_KEYS.DEBUG_HOUR),
    ]);
    setProfiles([]);
    setActiveProfileId(null);
    setData(buildFreshProfileData());
    setDebugHourState(null);
  };

  // ── Progress actions ─────────────────────────────────────────────────────────
  const commit = async (next: ProfileData) => {
    setData(next);
    if (activeProfileId) await persistData(activeProfileId, next);
  };

  const markDoctrineRead = async (id: number) => {
    const existing = data.readDoctrines ?? [];
    if (existing.includes(id)) return;
    const readDoctrines = [...existing, id];
    const dayProgress =
      id === data.currentDoctrineId
        ? { ...data.dayProgress, readingCompleted: true }
        : data.dayProgress;
    await commit({ ...data, readDoctrines, dayProgress });
  };

  const completeReading = async () => {
    const readDoctrines = data.readDoctrines ?? [];
    const nextRead = readDoctrines.includes(data.currentDoctrineId)
      ? readDoctrines
      : [...readDoctrines, data.currentDoctrineId];
    await commit({
      ...data,
      readDoctrines: nextRead,
      dayProgress: { ...data.dayProgress, readingCompleted: true },
    });
  };

  const completeBlock = async (
    block: 'block1' | 'block2' | 'provao',
    passed: boolean,
    errors?: WrongAnswer[],
  ) => {
    let dayProgress = { ...data.dayProgress };
    let currentDoctrineId = data.currentDoctrineId;
    let completedDoctrines = [...data.completedDoctrines];
    let errorScroll = data.errorScroll;

    if (block === 'block1') {
      dayProgress.block1Passed = passed ? true : timeLockEnabled ? false : null;
    } else if (block === 'block2') {
      dayProgress.block2Passed = passed ? true : timeLockEnabled ? false : null;
    } else {
      if (!passed && errors && errors.length > 0) {
        errorScroll = [...errorScroll, ...errors];
      }

      if (passed) {
        dayProgress.provaoPassed = true;
        if (!completedDoctrines.includes(currentDoctrineId)) {
          completedDoctrines = [...completedDoctrines, currentDoctrineId];
        }
        if (!timeLockEnabled && currentDoctrineId < MAX_UNLOCKED_DOCTRINE) {
          currentDoctrineId = currentDoctrineId + 1;
          dayProgress = buildFreshDayProgress(currentDoctrineId, false);
        }
      } else {
        dayProgress.provaoPassed = timeLockEnabled ? false : null;
      }
    }

    await commit({ currentDoctrineId, completedDoctrines, readDoctrines: data.readDoctrines ?? [], dayProgress, errorScroll });
  };

  // ── Settings actions ─────────────────────────────────────────────────────────
  const setDebugHour = async (hour: number | null) => {
    setDebugHourState(hour);
    await AsyncStorage.setItem(STORAGE_KEYS.DEBUG_HOUR, JSON.stringify(hour));
  };

  const setTimeLockEnabled = async (enabled: boolean) => {
    if (!activeProfileId) return;
    const nextProfiles = profiles.map((p) =>
      p.id === activeProfileId ? { ...p, timeLockEnabled: enabled } : p,
    );
    setProfiles(nextProfiles);
    await AsyncStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(nextProfiles));
    // Re-enabling lock mode must normalize stale day state.
    if (enabled && activeProfileId) {
      const normalized = applyDayChange(data);
      if (normalized !== data) {
        setData(normalized);
        await persistData(activeProfileId, normalized);
      }
    }
  };

  const setThemeId = async (id: ThemeId) => {
    if (!activeProfileId) return;
    const nextProfiles = profiles.map((p) =>
      p.id === activeProfileId ? { ...p, themeId: id } : p,
    );
    setProfiles(nextProfiles);
    await AsyncStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(nextProfiles));
  };

  const resetProgress = async () => {
    const fresh = buildFreshProfileData();
    await commit(fresh);
  };

  return (
    <AppContext.Provider
      value={{
        loaded,
        profiles,
        activeProfile,
        currentDoctrineId: data.currentDoctrineId,
        completedDoctrines: data.completedDoctrines,
        dayProgress: data.dayProgress,
        errorScroll: data.errorScroll,
        timeLockEnabled,
        debugHour,
        currentHour,
        themeId,
        blockAvailability,
        currentRank,
        masterMode,
        createProfile,
        updateProfile,
        switchProfile,
        deleteProfile,
        resetAll,
        readDoctrines: data.readDoctrines ?? [],
        markDoctrineRead,
        completeReading,
        completeBlock,
        setDebugHour,
        setTimeLockEnabled,
        setThemeId,
        resetProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
