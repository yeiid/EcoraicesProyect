import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { Params } from "@/app/lib/types";

export async function GET(req: Request, { params }: Params) {
    try {
      const especie = await prisma.especie.findFirst({
        where: {
          id: Number(params.id),
        },
      });
      return NextResponse.json(especie);
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({
          message: error.message
        },
        {
          status:500
        });
      }
    }
  }
