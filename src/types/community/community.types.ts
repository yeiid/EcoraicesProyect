import { User } from "@prisma/client";

export type CommunityRole = 'MIEMBRO' | 'MODERADOR' | 'ADMIN';

export interface CommunityMember extends Pick<User, 'id' | 'name' | 'email' | 'imagenPerfil'> {
  rol: CommunityRole;
  fechaUnion: Date;
}

export interface Community {
  id: number;
  nombre: string;
  descripcion: string | null;
  imagen: string | null;
  ubicacion: string | null;
  latitud: number | null;
  longitud: number | null;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  activa: boolean;
  creadorId: number;
  _count?: {
    miembros: number;
    publicaciones: number;
    eventos: number;
  };
  creador?: Pick<User, 'id' | 'name' | 'imagenPerfil'>;
  miembros?: CommunityMember[];
}

export interface CommunityPost {
  id: number;
  titulo: string;
  contenido: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  comunidadId: number;
  autorId: number;
  autor?: Pick<User, 'id' | 'name' | 'imagenPerfil'>;
}

export interface CommunityEvent {
  id: number;
  titulo: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  ubicacion: string | null;
  latitud: number | null;
  longitud: number | null;
  comunidadId: number;
  creadorId: number;
  fechaCreacion: Date;
  creador?: Pick<User, 'id' | 'name' | 'imagenPerfil'>;
}

export interface CreateCommunityInput {
  nombre: string;
  descripcion?: string;
  imagen?: string;
  ubicacion?: string;
  latitud?: number;
  longitud?: number;
}

export interface UpdateCommunityInput extends Partial<CreateCommunityInput> {
  activa?: boolean;
}

export interface JoinCommunityInput {
  comunidadId: number;
  userId: number;
  rol?: CommunityRole;
}

export interface CreateCommunityPostInput {
  titulo: string;
  contenido: string;
  comunidadId: number;
}

export interface CreateCommunityEventInput {
  titulo: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  ubicacion?: string;
  latitud?: number;
  longitud?: number;
  comunidadId: number;
}
