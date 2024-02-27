"use client"

import React, { createContext, useState } from 'react';

export interface ContextMapProps {
  location: { lat: number; lng: number };
  setLocation: (newLocation: { lat: number; lng: number }) => void;
  data: { especie: string; municipio: string; ciudadano: string };
  setData: (newData: { especie: string; municipio: string; ciudadano: string }) => void;
}

export const ContextMap = createContext<ContextMapProps>({
  // Set initial values, adjust types if needed
  location: { lat: 10.9968347, lng: -72.7802635 },
  setLocation: () => {},
  data: { especie: '', municipio: '', ciudadano: '' },
  setData: () => {},
});

export function FormContext({ children }: { children: React.ReactNode }): JSX.Element {
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 10.9968347, // Adjust initial values if needed
    lng: -72.7802635,
  });
  const [data, setData] = useState<ContextMapProps['data']>({
    especie: '',
    municipio: '',
    ciudadano: '',
  });

  return (
    <ContextMap.Provider value={{ location, setLocation, data, setData }}>
      {children}
    </ContextMap.Provider>
  );
}
