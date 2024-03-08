

export type Form = {
  especie: string;
  municipio: string;
  ciudadano: string;
};

export type Location = {
  location: { lat: boolean; lng: number };
};

export type Params = {
  params: { id: String };
}

export interface ContextMapProps {
  location: { lat: number; lng: number };
  setLocation: (newLocation: { lat: number; lng: number }) => void;

  data: { especie: string; municipio: string; ciudadano: string };
  setData: (newData: { especie: string; municipio: string; ciudadano: string }) => void;
}

export interface CombinedState {
  data: {
    especie: string;
    municipio: string;
    ciudadano: string;
  };
  location: { lat: number; lng: number },

}
