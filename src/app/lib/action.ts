
interface ValidationError {
  code: string;
  minimum?: number;
  path: string[];
  message?: string;
}

export function simplificarErrores(errores: ValidationError[]) {
  return errores.map((error) => {
    switch (error.code) {
      case "too_small":
        return `${error.path.join(".")} debe contener al menos ${
          error.minimum
        } caracter(es) ❌`;
      case "custom":
        return error.message || "Error de validación personalizado";
      default:
        return "Error de validación ❌";
    }
  });
}
