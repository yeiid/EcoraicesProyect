import { especieSchema } from "@/app/lib/schema";

describe("Esquema de validación de especies", () => {
  test("valida correctamente una especie con datos completos", () => {
    const especieValida = {
      especie: "Ceiba pentandra",
      municipio: "Riohacha",
      latitud: 11.5444,
      longitud: -72.9072,
      descripcion: "Árbol de gran tamaño, conocido como la Ceiba.",
      estadoConservacion: "LC",
      userId: 1,
    };

    const resultado = especieSchema.safeParse(especieValida);
    expect(resultado.success).toBe(true);
    if (resultado.success) {
      expect(resultado.data).toEqual(especieValida);
    }
  });

  test("valida correctamente una especie con datos mínimos", () => {
    const especieMinima = {
      especie: "Ceiba",
      municipio: "Riohacha",
      latitud: 11.5444,
      longitud: -72.9072,
      userId: 1,
    };

    const resultado = especieSchema.safeParse(especieMinima);
    expect(resultado.success).toBe(true);
    if (resultado.success) {
      expect(resultado.data.especie).toBe("Ceiba");
      expect(resultado.data.municipio).toBe("Riohacha");
      expect(resultado.data.descripcion).toBeNull();
      expect(resultado.data.estadoConservacion).toBeNull();
    }
  });

  test("rechaza una especie con nombre demasiado corto", () => {
    const especieNombreCorto = {
      especie: "Ce", // Menos de 3 caracteres
      municipio: "Riohacha",
      latitud: 11.5444,
      longitud: -72.9072,
      userId: 1,
    };

    const resultado = especieSchema.safeParse(especieNombreCorto);
    expect(resultado.success).toBe(false);
    if (!resultado.success) {
      const errores = resultado.error.format();
      expect(errores.especie?._errors).toContain(
        "El nombre de la especie debe tener al menos 3 caracteres"
      );
    }
  });

  test("rechaza una especie con municipio demasiado corto", () => {
    const especieMunicipioCorto = {
      especie: "Ceiba",
      municipio: "Ri", // Menos de 3 caracteres
      latitud: 11.5444,
      longitud: -72.9072,
      userId: 1,
    };

    const resultado = especieSchema.safeParse(especieMunicipioCorto);
    expect(resultado.success).toBe(false);
    if (!resultado.success) {
      const errores = resultado.error.format();
      expect(errores.municipio?._errors).toContain(
        "El nombre del municipio debe tener al menos 3 caracteres"
      );
    }
  });

  test("rechaza una especie con latitud fuera de rango", () => {
    const especieLatitudInvalida = {
      especie: "Ceiba",
      municipio: "Riohacha",
      latitud: 95.5444, // Más de 90 grados
      longitud: -72.9072,
      userId: 1,
    };

    const resultado = especieSchema.safeParse(especieLatitudInvalida);
    expect(resultado.success).toBe(false);
  });

  test("rechaza una especie con longitud fuera de rango", () => {
    const especieLongitudInvalida = {
      especie: "Ceiba",
      municipio: "Riohacha",
      latitud: 11.5444,
      longitud: -182.9072, // Menos de -180 grados
      userId: 1,
    };

    const resultado = especieSchema.safeParse(especieLongitudInvalida);
    expect(resultado.success).toBe(false);
  });

  test("rechaza una especie con userId inválido", () => {
    const especieUserIdInvalido = {
      especie: "Ceiba",
      municipio: "Riohacha",
      latitud: 11.5444,
      longitud: -72.9072,
      userId: -1, // Debe ser positivo
    };

    const resultado = especieSchema.safeParse(especieUserIdInvalido);
    expect(resultado.success).toBe(false);
  });

  test("transforma correctamente los campos opcionales vacíos", () => {
    const especieConCamposVacios = {
      especie: "Ceiba",
      municipio: "Riohacha",
      latitud: 11.5444,
      longitud: -72.9072,
      descripcion: "",
      estadoConservacion: "",
      userId: 1,
    };

    const resultado = especieSchema.safeParse(especieConCamposVacios);
    expect(resultado.success).toBe(true);
    if (resultado.success) {
      expect(resultado.data.descripcion).toBeNull();
      expect(resultado.data.estadoConservacion).toBeNull();
    }
  });
});
