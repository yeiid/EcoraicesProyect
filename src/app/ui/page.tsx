import Formulario from "./form/TreeForm";
import { UserProvider } from "@/context/UserContext";

export default function RootLayout() {
  return (
    <>
      <UserProvider>
        <Formulario />
      </UserProvider>
    </>
  );
}
