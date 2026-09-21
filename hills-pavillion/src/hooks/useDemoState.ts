import { useSyncExternalStore } from 'react';
import { demoStore, type DemoStoreState } from '../data/demoStore';

export function useDemoState(): [DemoStoreState, typeof demoStore] {
  const state = useSyncExternalStore(demoStore.subscribe, demoStore.getState);
  return [state, demoStore];
}
