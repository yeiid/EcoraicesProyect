import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Map from "@/components/mapcomponet/Map";
import { useMapStore } from "@/stores/MapStore";
import { useAuthStore } from "@/stores/AuthStore";

// Mock de los hooks de estado
jest.mock("@/stores/MapStore");
jest.mock("@/stores/AuthStore");

// Mock de global.fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        especies: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      }),
  })
) as jest.Mock;

describe("Componente Map", () => {
  // Configuración común para las pruebas
  const mockSetSearchTerm = jest.fn();
  const mockSetFilteredEspecies = jest.fn();
  const mockSetSearchResults = jest.fn();
  const mockSetEspecies = jest.fn();
  const mockSetError = jest.fn();
  const mockSetIsLoading = jest.fn();

  const mockEspecies = [
    {
      id: 1,
      especie: "Ceiba pentandra",
      municipio: "Riohacha",
      latitud: 11.5444,
      longitud: -72.9072,
      createdAt: new Date(),
      userId: 1,
      user: {
        id: 1,
        name: "Usuario Test",
        email: "test@example.com",
      },
    },
    {
      id: 2,
      especie: "Roble",
      municipio: "Maicao",
      latitud: 11.3783,
      longitud: -72.2447,
      createdAt: new Date(),
      userId: 1,
      user: {
        id: 1,
        name: "Usuario Test",
        email: "test@example.com",
      },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock del store del mapa
    (useMapStore as jest.Mock).mockReturnValue({
      especies: mockEspecies,
      searchTerm: "",
      searchResults: [],
      error: null,
      isLoading: false,
      setEspecies: mockSetEspecies,
      setSearchTerm: mockSetSearchTerm,
      setSearchResults: mockSetSearchResults,
      setError: mockSetError,
      setIsLoading: mockSetIsLoading,
    });

    // Mock del store de autenticación
    (useAuthStore as jest.Mock).mockReturnValue({
      user: { id: 1, name: "Usuario Test", email: "test@example.com" },
    });
  });

  test("renderiza correctamente el mapa", () => {
    render(<Map />);

    // Verifica que el título está presente
    expect(screen.getByText("Mapa de Especies")).toBeInTheDocument();

    // Verifica que el buscador está presente
    expect(
      screen.getByPlaceholderText("Buscar por especie o municipio...")
    ).toBeInTheDocument();

    // Verifica que los encabezados de las secciones están presentes
    expect(screen.getByText("Resultados de Búsqueda")).toBeInTheDocument();
    expect(screen.getByText("Mapa General")).toBeInTheDocument();

    // Verifica que el componente del mapa está presente
    expect(screen.getByTestId("map-container")).toBeInTheDocument();
  });

  test("maneja la búsqueda correctamente", () => {
    (useMapStore as jest.Mock).mockReturnValue({
      especies: mockEspecies,
      searchTerm: "Ceiba",
      searchResults: [],
      error: null,
      isLoading: false,
      setEspecies: mockSetEspecies,
      setSearchTerm: mockSetSearchTerm,
      setSearchResults: mockSetSearchResults,
      setError: mockSetError,
      setIsLoading: mockSetIsLoading,
    });

    render(<Map />);

    // Verifica que el input de búsqueda tiene el valor correcto
    const searchInput = screen.getByPlaceholderText(
      "Buscar por especie o municipio..."
    );
    expect(searchInput).toHaveValue("Ceiba");

    // Simula un clic en el botón de búsqueda - buscamos por clase en lugar de por rol
    const searchButton = screen.getByRole("button", {
      name: "",
      hidden: true,
    });
    fireEvent.click(searchButton);

    // Verifica que se llamó a setSearchResults
    expect(mockSetSearchResults).toHaveBeenCalled();
  });

  test("muestra el mensaje de carga", () => {
    (useMapStore as jest.Mock).mockReturnValue({
      especies: [],
      searchTerm: "",
      searchResults: [],
      error: null,
      isLoading: true,
      setEspecies: mockSetEspecies,
      setSearchTerm: mockSetSearchTerm,
      setSearchResults: mockSetSearchResults,
      setError: mockSetError,
      setIsLoading: mockSetIsLoading,
    });

    render(<Map />);

    // Verifica que el mensaje de carga está presente
    expect(screen.getByText("Cargando datos...")).toBeInTheDocument();
  });

  test("muestra los resultados de búsqueda", () => {
    (useMapStore as jest.Mock).mockReturnValue({
      especies: mockEspecies,
      searchTerm: "Ceiba",
      searchResults: [mockEspecies[0]],
      error: null,
      isLoading: false,
      setEspecies: mockSetEspecies,
      setSearchTerm: mockSetSearchTerm,
      setSearchResults: mockSetSearchResults,
      setError: mockSetError,
      setIsLoading: mockSetIsLoading,
    });

    render(<Map />);

    // Verifica que el resultado de búsqueda está presente
    expect(screen.getByText("Ceiba pentandra")).toBeInTheDocument();
    // Buscar texto por fragmento ya que está en varios elementos
    expect(screen.getByText(/Municipio:/)).toBeInTheDocument();
    expect(screen.getByText(/Riohacha/)).toBeInTheDocument();
  });

  test("muestra mensaje cuando no hay resultados", () => {
    (useMapStore as jest.Mock).mockReturnValue({
      especies: mockEspecies,
      searchTerm: "NoExiste",
      searchResults: [],
      error: null,
      isLoading: false,
      setEspecies: mockSetEspecies,
      setSearchTerm: mockSetSearchTerm,
      setSearchResults: mockSetSearchResults,
      setError: mockSetError,
      setIsLoading: mockSetIsLoading,
    });

    render(<Map />);

    // Verifica que el mensaje de "no encontrado" está presente
    expect(
      screen.getByText(
        "No se encontraron especies que coincidan con tu búsqueda"
      )
    ).toBeInTheDocument();
  });

  test("muestra mensaje de error cuando hay un error", () => {
    const errorMessage = "Error al cargar datos";

    (useMapStore as jest.Mock).mockReturnValue({
      especies: [],
      searchTerm: "",
      searchResults: [],
      error: errorMessage,
      isLoading: false,
      setEspecies: mockSetEspecies,
      setSearchTerm: mockSetSearchTerm,
      setSearchResults: mockSetSearchResults,
      setError: mockSetError,
      setIsLoading: mockSetIsLoading,
    });

    render(<Map />);

    // Verifica que el mensaje de error está presente
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
