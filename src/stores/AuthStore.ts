// src/stores/AuthStore.ts

import { create } from "zustand";
import { User, AuthFormData } from "@/app/lib/types";
import { z, ZodError } from "zod";
import { registrationSchema, loginSchema } from "@/app/lib/validation";

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  isLogin: boolean;
  formData: AuthFormData;
  error: string | null;
  isSubmitting: boolean;
  toggleAuthMode: () => void;
  updateFormData: (field: keyof AuthFormData, value: string) => void;
  setError: (error: string | null) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  validateFormData: () => string | null;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  isLogin: true,
  formData: {
    email: "",
    password: "",
  },
  error: null,
  isSubmitting: false,
  toggleAuthMode: () =>
    set((state) => ({
      isLogin: !state.isLogin,
      formData: {
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
      },
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
      if (get().isLogin) {
        loginSchema.parse(get().formData);
      } else {
        registrationSchema.parse(get().formData);
      }
      return null; // No hay errores
    } catch (error) {
      if (error instanceof ZodError) {
        return error.errors.map((e) => e.message).join(", "); // Retorna todos los mensajes de error
      }
      return "Error de validación";
    }
  },
}));
