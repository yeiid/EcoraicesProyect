import { schema } from "@/app/lib/schema";

interface ValidationError {
  code: string;
  minimum?: number;
  path: string[];
  message?: string;
}

export function simplificarErrores(errores: ValidationError[]) {
  return errores.map(error => {
    switch (error.code) {
      case "too_small":
        return `${error.path.join('.')} debe contener al menos ${error.minimum} caracter(es) ❌`;
      case "custom":
        return error.message || "Error de validación personalizado";
      default:
        return "Error de validación ❌";
    }
  });
}

export async function PostDate(data: any) {
  try {
    const validatedData = schema.parse(data);
    const res = await fetch("/api/date", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData),
    });

    if (res.ok) {
      return { success: true, message: "Datos enviados! Gracias ✔" };
    } else {
      return { success: false, message: "Error al enviar los Datos ❌" };
    }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Error desconocido" };
  }
}