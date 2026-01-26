import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { MOCK_PHOTOS } from "../MockPhotos/Mocks";

interface Photo {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
}
interface PhotoContextType {
  photos: Photo[];
  addPhoto: (photo: Photo) => void;
  removePhoto: (id: string) => void;
  searchPhotos: (query: string) => Promise<void>;
}

export const PhotoContext = createContext<PhotoContextType>(
  {} as PhotoContextType,
);

export const PhotoProvider = ({ children }: { children: ReactNode }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const USE_MOCK_DATA = true;

  //Fetching photos from Unsplash API
  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);

      if (USE_MOCK_DATA) {
        console.log("Using mock data");
        setPhotos(MOCK_PHOTOS);
        setLoading(false);
        return;
      }
      try {
        const response = await fetch("https://api.unsplash.com/photos", {
          headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Photo[] = await response.json();
        setPhotos(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unkown erro occurred",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  const addPhoto = (photo: Photo) => {
    setPhotos((prevPhotos) => [...prevPhotos, photo]);
  };

  const removePhoto = (id: string) => {
    setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== id));
  };

  //Searching photos
  const searchPhotos = async (query: string) => {
    const baseURL = "https://api.unsplash.com/search/photos?query=${query}";
    const params = new URLSearchParams({
      query: query,
      per_page: "50",
      orientation: "landscape",
    });

    try {
      const url = `${baseURL}?${params.toString()}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        return data.results;
      }
    } catch (error) {
      console.error("Error searching photos:", error);
      return [];
    }
  };

  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const form = e.target as HTMLFormElement;
  //   const input = form.querySelector("input");
  //   const searchTerm = input?.value || "";

  //   if (searchTerm.trim() === "") return;

  //   searchPhotos(searchTerm).then((results) => {
  //     setPhotos(results);
  //   });
  // };

  return (
    <PhotoContext.Provider
      value={{ photos, addPhoto, removePhoto, searchPhotos }}
    >
      {loading && <div>Loading photos...</div>}
      {error && <div>Error loading photos: {error}</div>}
      {!loading && !error && children}
    </PhotoContext.Provider>
  );
};
