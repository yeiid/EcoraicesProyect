import { schema } from "@/app/lib/schema"; // Importa el esquema de validación

export async function SchemaDate() {
  try {
    const allData = schema.parse({
      // data,
      location,
    });
    return allData;
  } catch (error) {
    // Captura el error de validación de Zod y establece el mensaje de error
    return error;
  }
}

export default async function PostDate(){
  try {
    const res = await fetch("/api/date", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(SchemaDate),
    });

    if (res.ok) {
      alert("Datos enviados! Gracias ✔");
      window.location.reload();
    } else {
      alert("Error al enviar lo Datos ❌");
    }
  } catch (error) {}
}


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
