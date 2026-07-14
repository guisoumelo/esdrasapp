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
  TIME_LOCK: '@esdras_time_lock',
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
    dayProgress: buildFreshDayProgress(1, false),
    errorScroll: [],
  };
}

/**
 * Applies the daily "day change" progression logic. Only meaningful when the
 * time-lock (Trilha) mode is enabled — in free mode advancement is immediate.
 */
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

  // Repeat the doctrine — second attempt if anything was tried.
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
  createProfile: (nome: string, idade: number, gender: Gender, avatar?: string) => Promise<void>;
  switchProfile: (id: string) => Promise<void>;
  deleteProfile: (id: string) => Promise<void>;

  // Progress actions
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
  const [timeLockEnabled, setTimeLockState] = useState(true);
  const [debugHour, setDebugHourState] = useState<number | null>(null);
  const [tick, setTick] = useState(0);

  // Re-compute currentHour (and re-check the day boundary) every minute.
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  const activeProfile = profiles.find((p) => p.id === activeProfileId) ?? null;
  const themeId: ThemeId = activeProfile?.themeId ?? DEFAULT_THEME_ID;
  const currentHour = debugHour !== null ? debugHour : getRealHour();
  const blockAvailability = getBlockAvailability(currentHour, data.dayProgress, timeLockEnabled);
  const masterMode = data.completedDoctrines.length >= 28;
  const currentRank = getRank(data.completedDoctrines.length);

  // ── Persistence helpers ────────────────────────────────────────────────────
  async function persistData(id: string, next: ProfileData) {
    await AsyncStorage.setItem(STORAGE_KEYS.PROFILE_DATA(id), JSON.stringify(next));
  }

  async function loadProfileData(id: string): Promise<ProfileData> {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.PROFILE_DATA(id));
    const parsed: ProfileData = raw ? JSON.parse(raw) : buildFreshProfileData();
    // Day-change only applies in time-lock mode.
    return timeLockEnabled ? applyDayChange(parsed) : parsed;
  }

  // ── Initial load ────────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const [storedProfiles, storedActive, storedTimeLock, storedDebug] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.PROFILES),
          AsyncStorage.getItem(STORAGE_KEYS.ACTIVE_PROFILE),
          AsyncStorage.getItem(STORAGE_KEYS.TIME_LOCK),
          AsyncStorage.getItem(STORAGE_KEYS.DEBUG_HOUR),
        ]);

        const parsedProfiles: Profile[] = storedProfiles ? JSON.parse(storedProfiles) : [];
        const timeLock = storedTimeLock !== null ? JSON.parse(storedTimeLock) : true;
        const dbgHour = storedDebug !== null ? JSON.parse(storedDebug) : null;

        setProfiles(parsedProfiles);
        setTimeLockState(timeLock);
        setDebugHourState(dbgHour);

        const activeId =
          storedActive && parsedProfiles.some((p) => p.id === storedActive)
            ? storedActive
            : parsedProfiles[0]?.id ?? null;

        if (activeId) {
          setActiveProfileId(activeId);
          const raw = await AsyncStorage.getItem(STORAGE_KEYS.PROFILE_DATA(activeId));
          const parsed: ProfileData = raw ? JSON.parse(raw) : buildFreshProfileData();
          const normalized = timeLock ? applyDayChange(parsed) : parsed;
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
  // Applies the daily progression exactly once per date change while the app
  // stays open (time-lock mode only). Driven by the per-minute `tick`.
  useEffect(() => {
    if (!loaded || !activeProfileId || !timeLockEnabled) return;
    if (data.dayProgress.date === getTodayString()) return;
    const normalized = applyDayChange(data);
    setData(normalized);
    persistData(activeProfileId, normalized);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, activeProfileId, timeLockEnabled, tick]);

  // ── Profile actions ──────────────────────────────────────────────────────────
  const createProfile = async (nome: string, idade: number, gender: Gender, avatar?: string) => {
    const profile: Profile = {
      id: makeId(),
      nome: nome.trim(),
      idade,
      gender,
      avatar,
      themeId: DEFAULT_THEME_ID,
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

  const switchProfile = async (id: string) => {
    if (!profiles.some((p) => p.id === id)) return;
    // Load the target profile's data BEFORE flipping the active id so that
    // `data` and `activeProfileId` update together (no mixed-state window).
    const normalized = await loadProfileData(id);
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
        // Load next profile data first, then swap id + data atomically.
        const normalized = await loadProfileData(nextActive);
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

  // ── Progress actions ─────────────────────────────────────────────────────────
  const commit = async (next: ProfileData) => {
    setData(next);
    if (activeProfileId) await persistData(activeProfileId, next);
  };

  const completeReading = async () => {
    await commit({
      ...data,
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
      // Free mode: a failed block resets to null so the user retries immediately.
      dayProgress.block1Passed = passed ? true : timeLockEnabled ? false : null;
    } else if (block === 'block2') {
      dayProgress.block2Passed = passed ? true : timeLockEnabled ? false : null;
    } else {
      // Provão
      if (!passed && errors && errors.length > 0) {
        errorScroll = [...errorScroll, ...errors];
      }

      if (passed) {
        dayProgress.provaoPassed = true;
        if (!completedDoctrines.includes(currentDoctrineId)) {
          completedDoctrines = [...completedDoctrines, currentDoctrineId];
        }
        // Free mode: advance to the next unlocked doctrine immediately.
        if (!timeLockEnabled && currentDoctrineId < MAX_UNLOCKED_DOCTRINE) {
          currentDoctrineId = currentDoctrineId + 1;
          dayProgress = buildFreshDayProgress(currentDoctrineId, false);
        }
      } else {
        // Free mode: allow immediate retake of the provão.
        dayProgress.provaoPassed = timeLockEnabled ? false : null;
      }
    }

    await commit({ currentDoctrineId, completedDoctrines, dayProgress, errorScroll });
  };

  // ── Settings actions ─────────────────────────────────────────────────────────
  const setDebugHour = async (hour: number | null) => {
    setDebugHourState(hour);
    await AsyncStorage.setItem(STORAGE_KEYS.DEBUG_HOUR, JSON.stringify(hour));
  };

  const setTimeLockEnabled = async (enabled: boolean) => {
    setTimeLockState(enabled);
    await AsyncStorage.setItem(STORAGE_KEYS.TIME_LOCK, JSON.stringify(enabled));
    // Re-enabling lock mode must normalize any stale day state immediately.
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
        switchProfile,
        deleteProfile,
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
