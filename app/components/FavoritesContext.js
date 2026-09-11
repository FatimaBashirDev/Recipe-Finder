"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FAVORITES_STORAGE_KEY = "recipe-finder-favorites";
const FavoritesContext = createContext(null);

function readFavorites() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedFavorites = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    return Array.isArray(favorites) ? favorites : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setFavorites(readFavorites());
      setIsHydrated(true);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    try {
      window.localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(favorites),
      );
    } catch {
      return;
    }
  }, [favorites, isHydrated]);

  const toggleFavorite = (meal) => {
    setFavorites((currentFavorites) => {
      const isSaved = currentFavorites.some(
        (favorite) => favorite.idMeal === meal.idMeal,
      );

      if (isSaved) {
        return currentFavorites.filter(
          (favorite) => favorite.idMeal !== meal.idMeal,
        );
      }

      return [meal, ...currentFavorites];
    });
  };

  const isFavorite = (mealId) => {
    return favorites.some((favorite) => favorite.idMeal === mealId);
  };

  const value = { favorites, isFavorite, isHydrated, toggleFavorite };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider.");
  }

  return context;
}
