import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthPage from "@/components/AuthPage";

// Mock para el router de Next.js
jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: jest.fn().mockReturnValue("/"),
}));

// Mock de signIn y signOut de next-auth
const mockSignIn = jest.fn();

jest.mock("next-auth/react", () => ({
  signIn: (provider: string, options: any) => mockSignIn(options),
  useSession: jest.fn().mockReturnValue({
    data: null,
    status: "unauthenticated",
  }),
}));

// Mock para el store de autenticación
const mockToggleAuthMode = jest.fn();
const mockUpdateFormData = jest.fn();
const mockSetError = jest.fn();
const mockSetIsSubmitting = jest.fn();
const mockValidateFormData = jest.fn();

jest.mock("@/stores/AuthStore", () => ({
  useAuthStore: jest.fn().mockImplementation(() => ({
    isLogin: true,
    formData: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    error: null,
    isSubmitting: false,
    toggleAuthMode: mockToggleAuthMode,
    updateFormData: mockUpdateFormData,
    setError: mockSetError,
    setIsSubmitting: mockSetIsSubmitting,
    validateFormData: mockValidateFormData,
  })),
}));

// Mock para la API fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: "Usuario creado exitosamente" }),
    status: 201,
  })
) as jest.Mock;

// Mock para el objeto window.location
Object.defineProperty(window, "location", {
  writable: true,
  value: { href: "http://localhost:3000" },
});

// Mock para alert
global.alert = jest.fn();

describe("AuthPage Component", () => {
  beforeEach(() => {
    // Limpiar todos los mocks antes de cada prueba
    jest.clearAllMocks();

    // Reiniciar el store para cada prueba
    const { useAuthStore } = require("@/stores/AuthStore");
    useAuthStore.mockImplementation(() => ({
      isLogin: true,
      formData: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      error: null,
      isSubmitting: false,
      toggleAuthMode: mockToggleAuthMode,
      updateFormData: mockUpdateFormData,
      setError: mockSetError,
      setIsSubmitting: mockSetIsSubmitting,
      validateFormData: mockValidateFormData.mockReturnValue(null), // Sin errores de validación por defecto
    }));
  });

  test("debe mostrar el formulario de inicio de sesión por defecto", () => {
    render(<AuthPage />);

    // Verificar elementos del formulario de inicio de sesión
    expect(screen.getByText("Iniciar Sesión")).toBeInTheDocument();
    expect(screen.queryByLabelText("Nombre")).not.toBeInTheDocument(); // No debe aparecer en modo login
    expect(screen.getByLabelText("Correo Electrónico")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
    expect(
      screen.queryByLabelText("Confirmar Contraseña")
    ).not.toBeInTheDocument(); // No debe aparecer en modo login
    expect(
      screen.getByRole("button", { name: /iniciar sesión/i })
    ).toBeInTheDocument();
  });

  test("debe mostrar el formulario de registro cuando isLogin es false", () => {
    // Cambiar el mock para que isLogin sea false
    const { useAuthStore } = require("@/stores/AuthStore");
    useAuthStore.mockImplementation(() => ({
      isLogin: false,
      formData: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      error: null,
      isSubmitting: false,
      toggleAuthMode: mockToggleAuthMode,
      updateFormData: mockUpdateFormData,
      setError: mockSetError,
      setIsSubmitting: mockSetIsSubmitting,
      validateFormData: mockValidateFormData,
    }));

    render(<AuthPage />);

    // Verificar que el formulario de registro está visible
    expect(screen.getByText("Registro de Usuario")).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Correo Electrónico")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirmar Contraseña")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /registrarse/i })
    ).toBeInTheDocument();
  });

  test("debe llamar a toggleAuthMode al hacer clic en el enlace de cambio de modo", () => {
    render(<AuthPage />);

    // Hacer clic en el enlace para cambiar al formulario de registro
    fireEvent.click(screen.getByText("¿No tienes cuenta? Regístrate"));

    // Verificar que se llamó a toggleAuthMode
    expect(mockToggleAuthMode).toHaveBeenCalledTimes(1);
  });

  test("debe actualizar el formData al escribir en los campos", () => {
    render(<AuthPage />);

    // Completar campo de email
    fireEvent.change(screen.getByLabelText("Correo Electrónico"), {
      target: { value: "usuario@test.com", name: "email" },
    });

    // Verificar que se llamó a updateFormData con los valores correctos
    expect(mockUpdateFormData).toHaveBeenCalledWith(
      "email",
      "usuario@test.com"
    );

    // Completar campo de contraseña
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "password123", name: "password" },
    });

    // Verificar que se llamó a updateFormData con los valores correctos
    expect(mockUpdateFormData).toHaveBeenCalledWith("password", "password123");
  });

  test("debe mostrar mensaje de error cuando validateFormData retorna un error", async () => {
    // Configurar el mock para que validateFormData retorne un error
    mockValidateFormData.mockReturnValue("Email o contraseña inválidos");

    render(<AuthPage />);

    // Enviar formulario
    fireEvent.submit(screen.getByRole("button", { name: /iniciar sesión/i }));

    // Verificar que se llaman las funciones necesarias
    expect(mockSetIsSubmitting).toHaveBeenCalledWith(true);
    expect(mockSetError).toHaveBeenCalledWith(null);
    expect(mockValidateFormData).toHaveBeenCalled();

    // Verificar que se muestra el mensaje de error
    expect(mockSetError).toHaveBeenCalledWith("Email o contraseña inválidos");
    expect(mockSetIsSubmitting).toHaveBeenCalledWith(false);
  });
});
