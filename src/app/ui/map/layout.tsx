import { MapContextProvider } from "@/context/MapContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MapContextProvider>{children}</MapContextProvider>
    </>
  );
}
