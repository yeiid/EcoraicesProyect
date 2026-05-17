import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SpeciesList from "@/components/SpeciesList";
import { act } from "react-dom/test-utils";

// Mock para respuesta de API
const mockEspecies = [
  {
    id: 1,
    especie: "Roble",
    municipio: "Medellín",
    latitud: 6.2442,
    longitud: -75.5812,
    descripcion: "Árbol nativo de la región",
    estadoConservacion: "Preocupación menor",
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z",
    userId: 1,
    user: {
      id: 1,
      name: "Usuario Test",
      email: "usuario@test.com",
    },
  },
  {
    id: 2,
    especie: "Guayacán",
    municipio: "Bogotá",
    latitud: 4.6097,
    longitud: -74.0817,
    descripcion: "Árbol con flores amarillas",
    estadoConservacion: "Vulnerable",
    createdAt: "2023-01-02T00:00:00.000Z",
    updatedAt: "2023-01-02T00:00:00.000Z",
    userId: 1,
    user: {
      id: 1,
      name: "Usuario Test",
      email: "usuario@test.com",
    },
  },
];

// Mock para el fetch global
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        especies: mockEspecies,
        total: 2,
        page: 1,
        limit: 10,
        totalPages: 1,
      }),
  })
) as jest.Mock;

// Mock para el router de Next.js
jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: jest.fn().mockReturnValue("/"),
}));

// Configuración inicial para las pruebas
describe("SpeciesList Component", () => {
  // Restablecer todos los mocks antes de cada prueba
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock de fetch por defecto
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        especies: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      }),
    });
  });

  test("debe mostrar mensaje de carga inicialmente", async () => {
    // Delay el fetch para asegurar que vemos el estado de carga
    global.fetch = jest.fn().mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              ok: true,
              json: () =>
                Promise.resolve({
                  especies: [],
                  total: 0,
                  page: 1,
                  limit: 10,
                  totalPages: 0,
                }),
            });
          }, 100);
        })
    );

    await act(async () => {
      render(<SpeciesList />);
    });

    // Verificar mensaje de carga
    expect(screen.getByText(/cargando/i)).toBeInTheDocument();
  });

  test("debe mostrar mensaje cuando no hay especies", async () => {
    await act(async () => {
      render(<SpeciesList />);
    });

    // Esperar a que se carguen los datos
    await waitFor(() => {
      expect(screen.queryByText(/cargando/i)).not.toBeInTheDocument();
    });

    // Verificar mensaje de no hay especies
    expect(
      screen.getByText(/no hay especies registradas/i)
    ).toBeInTheDocument();
  });

  test("debe mostrar mensaje de error si la carga falla", async () => {
    // Simular un error en la petición
    global.fetch = jest.fn().mockRejectedValue(new Error("Error de red"));

    await act(async () => {
      render(<SpeciesList />);
    });

    // Esperar a que se procese el error
    await waitFor(() => {
      expect(screen.queryByText(/cargando/i)).not.toBeInTheDocument();
    });

    // Verificar mensaje de error
    expect(screen.getByText(/error al cargar especies/i)).toBeInTheDocument();
  });
});
