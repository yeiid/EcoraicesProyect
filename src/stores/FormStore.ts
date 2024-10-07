// src/stores/FormStore.ts

import { create } from "zustand";
import { Form, Location } from "@/app/lib/types";

interface FormState {
  formData: Form;
  location: Location | null;
  validationError: string[] | null;
  isSubmitting: boolean;
  setFormData: (data: Partial<Form>) => void;
  setLocation: (location: Location) => void;
  setValidationError: (errors: string[] | null) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export const useFormStore = create<FormState>((set) => ({
  formData: {
    especie: "",
    municipio: "",
  },
  location: null,
  validationError: null,
  isSubmitting: false,
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  setLocation: (location) => set({ location }),
  setValidationError: (errors) => set({ validationError: errors }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
}));
