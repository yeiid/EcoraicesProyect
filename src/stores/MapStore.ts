// src/stores/MapStore.ts

import { create } from "zustand";
import { Especie } from "@/app/lib/types";

interface MapState {
  especies: Especie[];
  searchTerm: string;
  searchResults: Especie[];
  error: string | null;
  isLoading: boolean;
  setEspecies: (especies: Especie[]) => void;
  setSearchTerm: (term: string) => void;
  setSearchResults: (results: Especie[]) => void;
  setError: (error: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useMapStore = create<MapState>((set) => ({
  especies: [],
  searchTerm: "",
  searchResults: [],
  error: null,
  isLoading: true,
  setEspecies: (especies) => set({ especies }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSearchResults: (results) => set({ searchResults: results }),
  setError: (error) => set({ error }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
