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
  resetForm: () => void;
}

// Estado inicial del formulario
const initialFormState: Form = {
  especie: "",
  municipio: "",
  descripcion: "",
  estadoConservacion: "",
};

export const useFormStore = create<FormState>((set) => ({
  formData: initialFormState,
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

  // Función para resetear el formulario
  resetForm: () =>
    set({
      formData: initialFormState,
      validationError: null,
      isSubmitting: false,
    }),
}));
