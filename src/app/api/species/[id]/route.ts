// src/app/api/species/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma'; // Importación nombrada
import { Especie } from '@/app/lib/types';

// GET: Obtener una especie por ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const especie: Especie | null = await prisma.especie.findUnique({
      where: { id: Number(id) },
    });
    if (!especie) return NextResponse.error();

    return NextResponse.json(especie);
  } catch (error) {
    return NextResponse.error();
  }
}

// PUT: Actualizar una especie por ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { especie, municipio, latitud, longitud } = await req.json();

  try {
    const updatedEspecie = await prisma.especie.update({
      where: { id: Number(id) },
      data: { especie, municipio, latitud, longitud },
    });
    return NextResponse.json(updatedEspecie);
  } catch (error) {
    return NextResponse.error();
  }
}

// DELETE: Eliminar una especie por ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.especie.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: 'Especie eliminada' });
  } catch (error) {
    return NextResponse.error();
  }
}
