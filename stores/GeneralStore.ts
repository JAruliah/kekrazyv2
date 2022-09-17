import create from 'zustand';
import { Store, GeneralState } from '../interfaces/GeneralStore';

export const initialState: GeneralState = {
  themeMode: 'light',
};

const useGeneralStore = create<Store>((set: any, get: any) => ({
  ...initialState,
  // actions: gameStateActions(set, get),
}));

export default useGeneralStore;
