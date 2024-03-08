"use client"

import React, { createContext, useContext, useState } from 'react';
import {ContextMapProps} from '@/app/lib/types'




export const ContextMap = createContext<ContextMapProps>({
  // Set initial values, adjust types if needed
  location: { lat: 0, lng: 0 },
  setLocation: () => {},
  data: { especie: '', municipio: '', ciudadano: '' },
  setData: () => {},
});



export const useProvider =()=>{
  const context =useContext<ContextMapProps>(ContextMap)
  if(!context){
    throw new Error("ContextMap must be used whitin a ContextMapProvider")
  }
  return context
}



export function FormContext({ children }: { children: React.ReactNode }): JSX.Element {

  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 0, // Adjust initial values if needed
    lng: 0,
  });
  const [data, setData] = useState<ContextMapProps['data']>({
    especie: '',
    municipio: '',
    ciudadano: '',
  });


  return (
    <ContextMap.Provider value={{ data,setData,location,setLocation }}>
      {children}
    </ContextMap.Provider>
  );
}
