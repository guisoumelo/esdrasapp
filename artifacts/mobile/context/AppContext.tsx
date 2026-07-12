import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DayProgress, WrongAnswer, BlockAvailability, Rank, RANKS, getRank, getBlockAvailability } from '../types';
import { DOCTRINES } from '../constants/doctrines';

const STORAGE_KEYS = {
  CURRENT_DOCTRINE: '@esdras_current_doctrine',
  COMPLETED_DOCTRINES: '@esdras_completed_doctrines',
  DAY_PROGRESS: '@esdras_day_progress',
  ERROR_SCROLL: '@esdras_error_scroll',
  DEBUG_HOUR: '@esdras_debug_hour',
};

function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getRealHour(): number {
  return new Date().getHours();
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

interface AppContextType {
  loaded: boolean;
  currentDoctrineId: number;
  completedDoctrines: number[];
  dayProgress: DayProgress;
  errorScroll: WrongAnswer[];
  debugHour: number | null;
  currentHour: number;
  blockAvailability: BlockAvailability;
  currentRank: Rank;
  masterMode: boolean;

  completeReading: () => Promise<void>;
  completeBlock: (
    block: 'block1' | 'block2' | 'provao',
    passed: boolean,
    errors?: WrongAnswer[],
  ) => Promise<void>;
  setDebugHour: (hour: number | null) => Promise<void>;
  resetProgress: () => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [currentDoctrineId, setCurrentDoctrineId] = useState(1);
  const [completedDoctrines, setCompletedDoctrines] = useState<number[]>([]);
  const [dayProgress, setDayProgress] = useState<DayProgress>(buildFreshDayProgress(1, false));
  const [errorScroll, setErrorScroll] = useState<WrongAnswer[]>([]);
  const [debugHour, setDebugHourState] = useState<number | null>(null);
  const [tick, setTick] = useState(0);

  // Re-compute currentHour every minute
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  const currentHour = debugHour !== null ? debugHour : getRealHour();
  const blockAvailability = getBlockAvailability(currentHour, dayProgress);
  const masterMode = completedDoctrines.length >= 28;
  const currentRank = getRank(completedDoctrines.length);

  // Load persisted state on mount
  useEffect(() => {
    (async () => {
      try {
        const [
          storedDoctrine,
          storedCompleted,
          storedProgress,
          storedErrors,
          storedDebug,
        ] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.CURRENT_DOCTRINE),
          AsyncStorage.getItem(STORAGE_KEYS.COMPLETED_DOCTRINES),
          AsyncStorage.getItem(STORAGE_KEYS.DAY_PROGRESS),
          AsyncStorage.getItem(STORAGE_KEYS.ERROR_SCROLL),
          AsyncStorage.getItem(STORAGE_KEYS.DEBUG_HOUR),
        ]);

        let docId = storedDoctrine ? parseInt(storedDoctrine, 10) : 1;
        const completed: number[] = storedCompleted ? JSON.parse(storedCompleted) : [];
        const errors: WrongAnswer[] = storedErrors ? JSON.parse(storedErrors) : [];
        const dbgHour: number | null = storedDebug !== null ? JSON.parse(storedDebug) : null;

        let progress: DayProgress = storedProgress
          ? JSON.parse(storedProgress)
          : buildFreshDayProgress(docId, false);

        const today = getTodayString();

        // Day-change logic
        if (progress.date !== today) {
          if (progress.provaoPassed === true) {
            // Advance to next doctrine
            if (!completed.includes(progress.doctrineId)) {
              completed.push(progress.doctrineId);
              await AsyncStorage.setItem(STORAGE_KEYS.COMPLETED_DOCTRINES, JSON.stringify(completed));
            }
            docId = Math.min(progress.doctrineId + 1, 28);
            await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_DOCTRINE, String(docId));
            progress = buildFreshDayProgress(docId, false);
          } else {
            // Repeat doctrine - second attempt if anything was tried
            const anyAttempted = progress.block1Passed !== null || progress.block2Passed !== null || progress.provaoPassed !== null;
            progress = buildFreshDayProgress(progress.doctrineId, anyAttempted || progress.isSecondAttempt);
          }
          await AsyncStorage.setItem(STORAGE_KEYS.DAY_PROGRESS, JSON.stringify(progress));
        }

        setCurrentDoctrineId(docId);
        setCompletedDoctrines(completed);
        setDayProgress(progress);
        setErrorScroll(errors);
        setDebugHourState(dbgHour);
      } catch (e) {
        console.error('Failed to load state', e);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const completeReading = async () => {
    const updated = { ...dayProgress, readingCompleted: true };
    setDayProgress(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.DAY_PROGRESS, JSON.stringify(updated));
  };

  const completeBlock = async (
    block: 'block1' | 'block2' | 'provao',
    passed: boolean,
    errors?: WrongAnswer[],
  ) => {
    const updated = { ...dayProgress };

    if (block === 'block1') updated.block1Passed = passed;
    else if (block === 'block2') updated.block2Passed = passed;
    else {
      updated.provaoPassed = passed;
      if (!passed && errors && errors.length > 0) {
        const newErrors = [...errorScroll, ...errors];
        setErrorScroll(newErrors);
        await AsyncStorage.setItem(STORAGE_KEYS.ERROR_SCROLL, JSON.stringify(newErrors));
      }
      if (passed) {
        // Mark doctrine as completed immediately (day advancement happens on next load)
        const alreadyDone = completedDoctrines.includes(currentDoctrineId);
        if (!alreadyDone) {
          const newCompleted = [...completedDoctrines, currentDoctrineId];
          setCompletedDoctrines(newCompleted);
          await AsyncStorage.setItem(STORAGE_KEYS.COMPLETED_DOCTRINES, JSON.stringify(newCompleted));
        }
      }
    }

    setDayProgress(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.DAY_PROGRESS, JSON.stringify(updated));
  };

  const setDebugHour = async (hour: number | null) => {
    setDebugHourState(hour);
    await AsyncStorage.setItem(STORAGE_KEYS.DEBUG_HOUR, JSON.stringify(hour));
  };

  const resetProgress = async () => {
    const fresh = buildFreshDayProgress(1, false);
    setCurrentDoctrineId(1);
    setCompletedDoctrines([]);
    setDayProgress(fresh);
    setErrorScroll([]);
    setDebugHourState(null);
    await Promise.all([
      AsyncStorage.setItem(STORAGE_KEYS.CURRENT_DOCTRINE, '1'),
      AsyncStorage.setItem(STORAGE_KEYS.COMPLETED_DOCTRINES, '[]'),
      AsyncStorage.setItem(STORAGE_KEYS.DAY_PROGRESS, JSON.stringify(fresh)),
      AsyncStorage.setItem(STORAGE_KEYS.ERROR_SCROLL, '[]'),
      AsyncStorage.setItem(STORAGE_KEYS.DEBUG_HOUR, 'null'),
    ]);
  };

  return (
    <AppContext.Provider
      value={{
        loaded,
        currentDoctrineId,
        completedDoctrines,
        dayProgress,
        errorScroll,
        debugHour,
        currentHour,
        blockAvailability,
        currentRank,
        masterMode,
        completeReading,
        completeBlock,
        setDebugHour,
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
