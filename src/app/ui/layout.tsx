// src/app/layout.tsx

"use client";

import React, { useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useAuthStore } from "@/stores/AuthStore";
import Sidenav from "@/components/sidenav";
import Footer from "@/components/Footer";
// import { User } from "@/app/lib/types";

const InnerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();

  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser({
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        // password: session.user.password || undefined,
        userType: session.user.userType,
        groupName: session.user.groupName,
        groupAdmin: session.user.groupAdmin,
        // especies: session.user.especies || [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } else {
      setUser(null);
    }
  }, [session, status, setUser]);

  return (
    <div className="flex">
      <Sidenav />
      <main className="flex-1">
        {children}
        <Footer />
      </main>
    </div>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SessionProvider>
      <InnerLayout>
        {children}
      </InnerLayout>
    </SessionProvider>
  );
};

export default Layout;
