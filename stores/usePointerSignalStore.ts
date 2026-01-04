import { create } from 'zustand';

interface PointerSignalState {
  x: number; // 0..1 normalized
  y: number; // 0..1 normalized
  isActive: boolean;
  lastInput: number; // timestamp
  setPointer: (x: number, y: number) => void;
  setActive: (isActive: boolean) => void;
}

export const usePointerSignalStore = create<PointerSignalState>((set) => ({
  x: 0.5,
  y: 0.5,
  isActive: false,
  lastInput: 0,
  setPointer: (x, y) => set({ x, y, lastInput: Date.now() }),
  setActive: (isActive) => set({ isActive }),
}));
