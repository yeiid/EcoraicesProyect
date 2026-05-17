// Importamos las utilidades de testing
require("@testing-library/jest-dom");

// Mock para Next.js
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock para leaflet
jest.mock("leaflet", () => ({
  Icon: jest.fn(),
  icon: jest.fn(),
  latLngBounds: jest.fn().mockImplementation(() => ({
    extend: jest.fn(),
  })),
}));

// Mock para react-leaflet
jest.mock("react-leaflet", () => {
  const React = require("react");
  return {
    MapContainer: (props) =>
      React.createElement(
        "div",
        {
          ...props,
          "data-testid": "map-container",
        },
        props.children
      ),
    TileLayer: () =>
      React.createElement("div", {
        "data-testid": "tile-layer",
      }),
    Marker: (props) =>
      React.createElement(
        "div",
        {
          ...props,
          "data-testid": "marker",
        },
        props.children
      ),
    Popup: (props) =>
      React.createElement(
        "div",
        {
          ...props,
          "data-testid": "popup",
        },
        props.children
      ),
    useMap: () => ({
      fitBounds: jest.fn(),
    }),
  };
});

// Mock para next/image
jest.mock("next/image", () => {
  const React = require("react");
  return (props) => React.createElement("img", { ...props });
});

// Mock de zustand
jest.mock("zustand", () => ({
  create: () => jest.fn(),
  createStore: () => ({
    getState: jest.fn(),
    setState: jest.fn(),
    subscribe: jest.fn(),
  }),
}));

// Mock de módulos globales para usar en los tests
global.useMapStore = jest.fn();
global.useAuthStore = jest.fn();
global.useFormStore = jest.fn();
