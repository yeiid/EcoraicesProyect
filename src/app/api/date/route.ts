import { NextRequest, NextResponse } from "next/server";
import { schema } from "@/app/lib/schema";
import {prisma} from '@/app/lib/prisma'
import { CombinedState } from "@/app/lib/types";



export async function GET() {
  try {
    const especies = await prisma.especie.findMany();
    console.log('estoy bajando datos')
    return NextResponse.json(especies);
  } catch (error) {
    console.error('Error al obtener las especies:', error);
    return NextResponse.error();
  }
}

export  async function POST(req: NextRequest, res: NextResponse) {
  // Obtiene el cuerpo de la petición
  const body:CombinedState= await req.json();
  // console.log(body)
  // Validar datos con Zod
  try {
    const result = schema.safeParse(body);
    if(!result.success){
      return NextResponse.json(result.error );
    }
  } catch (error) {
    console.error("Error de validación:", error);
    return NextResponse.json({ error: "Error de validación" });
  }

  const data = {
    especie: body.data.especie,
    municipio: body.data.municipio,
    ciudadano: body.data.ciudadano,
    latitud: body.location.lat,
    longitud: body.location.lng,
  };

  try {
    // Crear un nuevo registro en la tabla "Especie" usando Prisma
    const createdEspecie = await prisma.especie.create({
    data,
    });
    // Si la operación fue exitosa, devolver la respuesta
    if (createdEspecie) {
      return NextResponse.json({
        message: "Datos guardados exitosamente",
        data: createdEspecie,
      });
    } else {
      // Si la operación no fue exitosa, devolver un error
      return NextResponse.json({ error: "Error al guardar datos" });
    }
  } catch (error) {
    console.error("Error al enviar datos:", error);
    return NextResponse.json({ message: "Error interno del servidor" });
  }
  // return NextResponse.json({ error: "lo logre" });
}
