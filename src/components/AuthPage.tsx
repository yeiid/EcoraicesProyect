// src/app/components/AuthPage.tsx

"use client";

import React, { ChangeEvent, FormEvent } from "react";
import { useAuthStore } from "@/stores/AuthStore";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { signIn } from "next-auth/react"; // Importar la función signIn de NextAuth

const AuthPage: React.FC = () => {
  const {
    isLogin,
    formData,
    error,
    isSubmitting,
    toggleAuthMode,
    updateFormData,
    setError,
    setIsSubmitting,
    validateFormData,
  } = useAuthStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData(name as "name" | "confirmPassword" | "email" | "password", value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const validationError = validateFormData();
    if (validationError) {
      setError(validationError);
      setIsSubmitting(false);
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      setIsSubmitting(false);
      return;
    }

    try {
      if (isLogin) {
        // Iniciar sesión usando NextAuth
        const result = await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });

        if (result?.error) {
          setError(result.error);
        } else {
          alert("Inicio de sesión exitoso");
          // Opcional: Redirigir al usuario después de iniciar sesión
          window.location.href = "/"; // Ejemplo de redirección
        }
      } else {
        // Registrar un nuevo usuario
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Error en el registro");
        } else {
          alert("Registro exitoso");
          toggleAuthMode(); // Cambiar a modo login después de registrar
        }
      }
    } catch (error) {
      setError("Error en la conexión");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-full flex-col items-center px-3 py-2 md:px-2">
      <h1 className="text-3xl font-bold mb-6">
        {isLogin ? "Iniciar Sesión" : "Registro de Usuario"}
      </h1>

      <form
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        {!isLogin && (
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              <UserIcon className="w-5 h-5 inline-block mr-2" />
              Nombre
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="name"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="Ingrese su nombre"
              required={!isLogin}
            />
          </div>
        )}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            <EnvelopeIcon className="w-5 h-5 inline-block mr-2" />
            Correo Electrónico
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ingrese su correo electrónico"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            <LockClosedIcon className="w-5 h-5 inline-block mr-2" />
            Contraseña
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Ingrese su contraseña"
            required
          />
        </div>

        {!isLogin && (
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              <LockClosedIcon className="w-5 h-5 inline-block mr-2" />
              Confirmar Contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword || ""}
              onChange={handleChange}
              placeholder="Confirme su contraseña"
              required={!isLogin}
            />
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            <p className="text-sm">{error}</p>
          </div>
        )}

        <button
          className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Procesando..."
            : isLogin
            ? "Iniciar Sesión"
            : "Registrarse"}
        </button>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={toggleAuthMode}
            className="text-blue-500 hover:text-blue-700"
          >
            {isLogin
              ? "¿No tienes cuenta? Regístrate"
              : "¿Ya tienes cuenta? Inicia sesión"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
