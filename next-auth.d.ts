import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    name: string;
    email: string;
    userType: UserType;
    groupName?: string;
    groupAdmin?: string;
    image?: string; // Agregar la propiedad de imagen
  }

  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      userType: UserType;
      groupName?: string;
      groupAdmin?: string;
      image?: string; // Agregar la propiedad de imagen
    };
  }
}
