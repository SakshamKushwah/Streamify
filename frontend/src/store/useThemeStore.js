import { create } from 'zustand'

export const useThemeStore  = create((set) => ({
   theme: "coffee",
  inc: () => set((state) => ({ count: state.count + 1 })),
}))