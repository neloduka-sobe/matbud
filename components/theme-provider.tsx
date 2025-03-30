"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  attribute?: string
}

const initialState: {
  theme: Theme
  setTheme: (theme: Theme) => void
} = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  attribute = "class",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    const root = window.document.documentElement

    // Remove previous theme classes/attributes
    if (attribute === "class") {
      root.classList.remove("light", "dark")
    } else {
      root.removeAttribute(attribute)
    }

    // Determine the theme to apply
    const themeToApply = theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches 
        ? "dark" 
        : "light"
      : theme

    // Apply the theme
    if (attribute === "class") {
      root.classList.add(themeToApply)
    } else {
      root.setAttribute(attribute, themeToApply)
    }
  }, [theme, attribute])

  const value = {
    theme,
    setTheme: (theme: Theme) => setTheme(theme),
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}
