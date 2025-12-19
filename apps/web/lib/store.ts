import { create } from 'zustand';

interface TimeState {
    isPlaying: boolean;
    currentTime: number; // Unix timestamp
    startTime: number;
    endTime: number;
    playSpeed: number; // Multiplier (1x, 5x, etc.)
    initialized: boolean;

    togglePlay: () => void;
    setPlay: (playing: boolean) => void;
    setTime: (time: number) => void;
    setRange: (start: number, end: number) => void;
    initialize: () => void;
}

// Use static initial values to avoid SSR hydration mismatch
// The actual time will be set on client mount via initialize()
const STATIC_START = 0;
const STATIC_END = 86400000; // 24h in ms
const STATIC_CURRENT = 43200000; // 12h

export const useTimeStore = create<TimeState>((set) => ({
    isPlaying: false,
    currentTime: STATIC_CURRENT,
    startTime: STATIC_START,
    endTime: STATIC_END,
    playSpeed: 1,
    initialized: false,

    togglePlay: () => set((state: TimeState) => ({ isPlaying: !state.isPlaying })),
    setPlay: (playing: boolean) => set({ isPlaying: playing }),
    setTime: (time: number) => set({ currentTime: time }),
    setRange: (start: number, end: number) => set({ startTime: start, endTime: end }),
    initialize: () => set(() => {
        const now = new Date();
        const startOfDay = new Date(now);
        startOfDay.setHours(0, 0, 0, 0);

        return {
            currentTime: now.getTime(),
            startTime: startOfDay.getTime(),
            endTime: now.getTime(),
            initialized: true
        };
    }),
}));

interface ThemeState {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    setTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    theme: 'light', // Default to Light as requested
    toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    setTheme: (theme) => set({ theme }),
}));
