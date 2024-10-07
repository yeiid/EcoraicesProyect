// src/stores/AuthStore.ts

import { create } from "zustand";
import { User } from "@/app/lib/types";
import { userSchema } from "@/app/lib/validation";
import { z } from 'zod';

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  isLogin: boolean;
  formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  error: string | null;
  isSubmitting: boolean;
  toggleAuthMode: () => void;
  updateFormData: (field: keyof AuthState["formData"], value: string) => void;
  setError: (error: string | null) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  validateFormData: () => string | null; // Nueva función de validación
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  isLogin: true,
  formData: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  error: null,
  isSubmitting: false,
  toggleAuthMode: () =>
    set((state) => ({
      isLogin: !state.isLogin,
      formData: { ...state.formData, name: "", confirmPassword: "" },
      error: null,
    })),
  updateFormData: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),
  setError: (error) => set({ error }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  validateFormData: () => {
    try {
      userSchema.parse(get().formData); // Usa get() para acceder a formData
      return null; // No hay errores
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0].message; // Retorna el primer mensaje de error
      }
      return "Error de validación";
    }
  },
}));
