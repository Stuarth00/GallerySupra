import { createContext, useState, useEffect } from "react";
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
  loadMore: () => Promise<void>;
  handleClick: (photo: Photo) => void;
  selectedPhoto: Photo | null;
  handleCloseModal: () => void;
  isOpen: boolean;
  loading: boolean;
  error: string | null;
}

export const PhotoContext = createContext<PhotoContextType>(
  {} as PhotoContextType,
);

export const PhotoProvider = ({ children }: { children: ReactNode }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const USE_MOCK_DATA = false;
  //For pagination
  const [page, setPage] = useState<number>(1);
  const [currentQuery, setCurrentQuery] = useState<string | null>(null);

  //Modal and image clicked
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  //Handle the clik to open modal
  const handleClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };
  //Handle click to close Modal
  const handleCloseModal = () => {
    setSelectedPhoto(null);
    setIsModalOpen(false);
  };

  //Fetching photos from Unsplash API
  const fetchPhotos = async (query?: string, pageToLoad = 1) => {
    const params = new URLSearchParams({
      page: pageToLoad.toString(),
      per_page: "30",
      ...(query && { query }),
    });

    const url = query
      ? `https://api.unsplash.com/search/photos?${params.toString()}`
      : `https://api.unsplash.com/photos?${params.toString()}`;
    setLoading(true);

    if (USE_MOCK_DATA) {
      console.log("Using mock data");
      setPhotos(MOCK_PHOTOS);
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const newPhotos = query ? data.results : data;
      setPhotos((prev) =>
        pageToLoad === 1 ? newPhotos : [...prev, ...newPhotos],
      );
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unkown erro occurred",
      );
    } finally {
      setLoading(false);
    }
  };
  //Fetches photos on initial load
  useEffect(() => {
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
    setCurrentQuery(query);
    setPage(1);
    await fetchPhotos(query, 1);
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchPhotos(currentQuery ?? undefined, nextPage);
  };

  return (
    <PhotoContext.Provider
      value={{
        photos,
        addPhoto,
        removePhoto,
        searchPhotos,
        loadMore,
        loading,
        error,
        handleClick,
        isOpen: isModalOpen,
        selectedPhoto,
        handleCloseModal,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};
