"use client"

import { createContext, useContext, useState, ReactNode } from 'react';
import { ContextMapProps } from '@/app/lib/types';

// Creación del contexto con valores iniciales
export const ContextMap = createContext<ContextMapProps | undefined>(undefined);

// Hook para usar el contexto
export const useContextMap = () => {
  const context = useContext(ContextMap);
  if (!context) {
    throw new Error("useContextMap must be used within a ContextMapProvider");
  }
  return context;
};

// Proveedor de contexto
export function FormContext({ children }: { children: ReactNode }): JSX.Element {
  const [location, setLocation] = useState<ContextMapProps['location']>({ lat: 0, lng: 0 });
  const [data, setData] = useState<ContextMapProps['data']>({ especie: '', municipio: '', ciudadano: '' });

  return (
    <ContextMap.Provider value={{ location, setLocation, data, setData }}>
      {children}
    </ContextMap.Provider>
  );
}
