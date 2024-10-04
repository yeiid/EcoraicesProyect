"use client"
import { createContext, useContext, useState, ReactNode } from 'react';

// Actualizamos la interfaz ContextMapProps
interface ContextMapProps {
  location: { lat: number; lng: number };
  setLocation: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
  formData: { especie: string; municipio: string; ciudadano: string };
  setFormData: React.Dispatch<React.SetStateAction<{ especie: string; municipio: string; ciudadano: string }>>;
}

export const FormContext = createContext<ContextMapProps | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormContextProvider");
  }
  return context;
};

export function FormContextProvider({ children }: { children: ReactNode }): JSX.Element {
  const [location, setLocation] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  const [formData, setFormData] = useState<{ especie: string; municipio: string; ciudadano: string }>({ especie: '', municipio: '', ciudadano: '' });

  return (
    <FormContext.Provider value={{ location, setLocation, formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
}