"use client";

import React, { createContext, useState } from "react";

// Define the shape of the context data.
// It's an array where the first element is the state value, and the second is the updater function.
// The context can also be `undefined` if it's used outside of a provider.
type NavbarContextType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];
type NavbarColorContextType = [string, React.Dispatch<React.SetStateAction<string>>];

// Create contexts with an initial value of `undefined`.
// The check for `undefined` will happen in the component that consumes the context.
export const NavbarContext = createContext<NavbarContextType | undefined>(undefined);
export const NavbarColorContext = createContext<NavbarColorContextType | undefined>(undefined);

// Create a provider component that will wrap your application or a part of it.
export const NavProvider = ({ children }: { children: React.ReactNode }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [navColor, setNavColor] = useState("white"); // Default color

  return (
    <NavbarContext.Provider value={[navOpen, setNavOpen]}>
      <NavbarColorContext.Provider value={[navColor, setNavColor]}>
        {children}
      </NavbarColorContext.Provider>
    </NavbarContext.Provider>
  );
};
