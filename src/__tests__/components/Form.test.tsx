import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Form from "@/app/ui/form/Form";
import { useFormStore } from "@/stores/FormStore";
import { useAuthStore } from "@/stores/AuthStore";
import { toast } from "react-toastify";

// Mock de las dependencias
jest.mock("@/stores/FormStore");
jest.mock("@/stores/AuthStore");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("Formulario de Registro de Especies", () => {
  // Configuración común para las pruebas
  const mockSetFormData = jest.fn();
  const mockSetValidationError = jest.fn();
  const mockSetIsSubmitting = jest.fn();
  const mockLocation = { lat: 10.123, lng: -74.456 };

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock del store de formulario
    (useFormStore as jest.Mock).mockReturnValue({
      formData: {
        especie: "",
        municipio: "",
        descripcion: "",
        estadoConservacion: "",
      },
      setFormData: mockSetFormData,
      location: mockLocation,
      validationError: null,
      isSubmitting: false,
      setValidationError: mockSetValidationError,
      setIsSubmitting: mockSetIsSubmitting,
    });

    // Mock del store de autenticación
    (useAuthStore as jest.Mock).mockReturnValue({
      user: { id: 1, name: "Usuario Test", email: "test@example.com" },
    });
  });

  test("renderiza correctamente el formulario", () => {
    render(<Form />);

    // Verifica que los elementos principales estén presentes
    expect(screen.getByText("Registro de Especies")).toBeInTheDocument();
    expect(screen.getByText("Ubicación Actual")).toBeInTheDocument();
    expect(screen.getByText("Nombre de la Especie")).toBeInTheDocument();
    expect(screen.getByText("Municipio")).toBeInTheDocument();
    expect(screen.getByText("Estado de Conservación")).toBeInTheDocument();
    expect(screen.getByText("Descripción")).toBeInTheDocument();

    // Verifica que los inputs estén presentes
    expect(
      screen.getByPlaceholderText("Ej. Ceiba pentandra")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ej. Riohacha")).toBeInTheDocument();

    // Verifica que el botón de envío esté presente
    expect(screen.getByText("Registrar Especie")).toBeInTheDocument();
  });

  test("muestra información de ubicación cuando está disponible", () => {
    render(<Form />);

    // Buscar textos por elementos separados
    expect(screen.getByText("Latitud:")).toBeInTheDocument();
    expect(screen.getByText(mockLocation.lat.toFixed(6))).toBeInTheDocument();
    expect(screen.getByText("Longitud:")).toBeInTheDocument();
    expect(screen.getByText(mockLocation.lng.toFixed(6))).toBeInTheDocument();
  });

  test("actualiza el estado del formulario cuando cambian los inputs", () => {
    render(<Form />);

    // Simula la entrada de texto en el campo especie
    const especieInput = screen.getByPlaceholderText("Ej. Ceiba pentandra");
    fireEvent.change(especieInput, {
      target: { value: "Ceiba", name: "especie" },
    });

    // Verifica que se haya llamado a setFormData con los datos correctos
    expect(mockSetFormData).toHaveBeenCalledWith(
      expect.objectContaining({
        especie: "Ceiba",
      })
    );

    // Simula la entrada de texto en el campo municipio
    const municipioInput = screen.getByPlaceholderText("Ej. Riohacha");
    fireEvent.change(municipioInput, {
      target: { value: "Riohacha", name: "municipio" },
    });

    // Verifica que se haya llamado a setFormData con los datos correctos
    expect(mockSetFormData).toHaveBeenCalledWith(
      expect.objectContaining({
        municipio: "Riohacha",
      })
    );
  });

  test("muestra una pista cuando se hace clic en el botón de información", () => {
    render(<Form />);

    // Inicialmente, la pista no debería estar visible
    expect(
      screen.queryByText(/Haga clic en "Obtener Ubicación"/)
    ).not.toBeInTheDocument();

    // Simula un clic en el botón de información
    const infoButton = screen.getByLabelText("Mostrar información");
    fireEvent.click(infoButton);

    // Ahora la pista debería estar visible
    expect(
      screen.getByText(/Haga clic en "Obtener Ubicación"/)
    ).toBeInTheDocument();
  });
});
