// src/app/lib/types.ts

// Tipos básicos
export type Form = {
  especie: string;
  municipio: string;
};

export type Location = {
  lat: number;
  lng: number;
};

export type Params = {
  params: { id: string };
};

// Props para el contexto del mapa
export interface ContextMapProps {
  location: Location;
  setLocation: (newLocation: Location) => void;
  data: Form;
  setData: (newData: Form) => void;
}

// Estado combinado (posiblemente para Zustand)
export interface CombinedState {
  data: Form;
  location: Location;
}

// Modelo de Especie (básico)
export interface Especie {
  id: number;
  especie: string;
  municipio: string;
  latitud: number;
  longitud: number;
}

// Modelo de Especie (extendido)
export interface EspecieExtended extends Especie {
  createdAt: Date;
  userId: number;
  user?: User;
}

// Enum para UserType
export enum UserType {
  NORMAL = 'NORMAL',
  GROUP = 'GROUP',
  COMMUNITY = 'COMMUNITY'
}

// Modelo de Usuario
export interface User {
  id: number;
  name: string;
  email: string;
  // password: string;
  userType: UserType;
  groupName?: string;
  groupAdmin?: string;
  especies?: Especie[];
  createdAt: Date;
  updatedAt: Date;
}

// Tipo para el estado del formulario en Zustand
export interface FormState {
  formData: Form;
  location: Location | null;
  validationError: string[] | null;
  isSubmitting: boolean;
  setFormData: (data: Partial<Form>) => void;
  setLocation: (location: Location) => void;
  setValidationError: (errors: string[] | null) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  submitForm: (userId: number) => Promise<void>;
}

// Tipo para la respuesta de la API al crear una nueva especie
export interface CreateEspecieResponse {
  id: number;
  createdAt: Date; // Este campo debe ser devuelto desde la base de datos
  especie: string;
  municipio: string;
  latitud: number;
  longitud: number;
  userId: number; // Este campo debe corresponder al ID del usuario que crea la especie
  user: { // Este objeto debe contener detalles del usuario
    id: number;
    name: string;
    email: string;
  };
}


// Tipo para los parámetros de búsqueda de especies
export interface EspecieSearchParams {
  municipio?: string;
  especie?: string;
  userId?: number;
}

// Tipo para las opciones de paginación
export interface PaginationOptions {
  page: number;
  limit: number;
}

// Tipo para la respuesta paginada de especies
export interface PaginatedEspecieResponse {
  especies: EspecieExtended[];
  totalCount: number;
  page: number;
  totalPages: number;
}
