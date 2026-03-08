"use client";

import { useSyncExternalStore } from "react";

export type ScrollState = {
  progress: number;
  activeScene: 0 | 1 | 2;
};

type Listener = () => void;

let state: ScrollState = {
  progress: 0,
  activeScene: 0,
};

const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((l) => l());
}

export function getScrollState() {
  return state;
}

export function setScrollState(
  patch: Partial<ScrollState> | ((prev: ScrollState) => Partial<ScrollState>)
) {
  const nextPatch = typeof patch === "function" ? patch(state) : patch;
  state = { ...state, ...nextPatch };
  experienceScrollProgressRef.current = state.progress;
  emit();
}

export function subscribeScrollState(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useScrollState() {
  return useSyncExternalStore(subscribeScrollState, getScrollState, getScrollState);
}

export const experienceScrollProgressRef = { current: 0 };

/** Aliases عشان لو الاستيراد مختلف */
export const scrollStore = { get: getScrollState, set: setScrollState, subscribe: subscribeScrollState };
export const scrollState = scrollStore;
export default scrollStore;