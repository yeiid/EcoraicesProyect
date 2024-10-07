// src/app/api/species/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma'; // Asegúrate de esta importación
import { Especie, CreateEspecieResponse } from '@/app/lib/types';

// GET: Obtener todas las especies
export async function GET() {
  try {
    const especies: Especie[] = await prisma.especie.findMany();
    return NextResponse.json(especies);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

// POST: Crear una nueva especie
export async function POST(req: Request) {
    const { especie, municipio, latitud, longitud, userId } = await req.json();
  
    try {
      const newEspecie = await prisma.especie.create({
        data: {
          especie,
          municipio,
          latitud,
          longitud,
          user: {
            connect: { id: userId } // Conecta el usuario que está creando la especie
          },
        },
        include: { 
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
      
      return NextResponse.json(newEspecie, { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.error();
    }
  }
  