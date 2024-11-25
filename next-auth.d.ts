import NextAuth from "next-auth";
import { UserType } from "./src/app/lib/types";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      userType: UserType;
      groupName?: string;
      groupAdmin?: string;
    };
  }

  interface User {
    id: number;
    name: string;
    email: string;
    userType: UserType;
    groupName?: string;
    groupAdmin?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    name: string;
    email: string;
    userType: UserType;
    groupName?: string;
    groupAdmin?: string;
  }
}
