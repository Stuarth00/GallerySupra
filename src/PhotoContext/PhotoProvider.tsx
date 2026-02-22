import { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { MOCK_PHOTOS } from "../MockPhotos/Mocks";
import { Folder } from "../Folder/folderInterface";

interface Photo {
  id: string;
  urls: {
    regular: string;
    small: string;
    full: string;
    raw: string;
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
  isSavePanelOpen: boolean;
  setIsSavePanelOpen: (isOpen: boolean) => void;
  loading: boolean;
  error: string | null;
  downloadPhoto: (photo: Photo) => void;
  handleSharePhoto: (photo: Photo) => void;
  folders: Folder[];
  createFolder: (name: string) => void;
  saveToFolder: (folrderId: string, photoId: string) => void;
  handleOpenSaveModal: () => void;
  handleHomeClick: () => void;
  hanldeNavigateToFolders: () => void;
  errorMessage: string | null;
}

export const PhotoContext = createContext<PhotoContextType>(
  {} as PhotoContextType,
);

export const PhotoProvider = ({ children }: { children: ReactNode }) => {
  //Router
  const navigate = useNavigate();
  const location = useLocation();

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const USE_MOCK_DATA = false;
  //For pagination
  const [page, setPage] = useState<number>(1);
  const [currentQuery, setCurrentQuery] = useState<string | null>(null);
  const searchParams = new URLSearchParams(location.search);
  const photoIdFromUrl = searchParams.get("photoId");
  const selectedPhoto = photos.find((p) => p.id === photoIdFromUrl) || null;
  const isOpen = !!selectedPhoto;

  //Saving photos by folders
  // const [isSavePanelOpen, setIsSavePanelOpen] = useState(false);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isSavePanelOpen, setIsSavePanelOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleHomeClick = () => {
    navigate("/");
  };
  const hanldeNavigateToFolders = () => {
    navigate("/folders");
  };

  const handleOpenSaveModal = () => {
    setIsSavePanelOpen(true);
    console.log(isSavePanelOpen);
  };

  const createFolder = (name: string) => {
    setErrorMessage("");
    if (name.trim() === "") {
      setErrorMessage("Folder name cannot be empty");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }
    const newFolder: Folder = {
      id: crypto.randomUUID(),
      name,
      photos: [],
    };
    setFolders((prev) => [...prev, newFolder]);
  };

  const saveToFolder = (folderId: string, photoId: string) => {
    const photo = photos.find((p) => p.id === photoId);
    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === folderId
          ? {
              ...folder,
              photos: folder.photos.some((p) => p.id === photoId)
                ? folder.photos
                : [
                    ...folder.photos,
                    {
                      id: photoId,
                      previewUrl: photo?.urls.small || "",
                    },
                  ],
            }
          : folder,
      ),
    );
    setIsSavePanelOpen(false);
  };

  //Handle the clik to open modal
  const handleClick = (photo: Photo) => {
    navigate(`/?photoId=${photo.id}`);
  };
  //Handle click to close Modal
  const handleCloseModal = () => {
    navigate("/");
    setIsSavePanelOpen(false);
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
      setPhotos((prev) => {
        if (pageToLoad === 1) return newPhotos;
        const uniqueNewPhotos = newPhotos.filter(
          (newP: Photo) => !prev.some((existingP) => existingP.id === newP.id),
        );
        return [...prev, ...uniqueNewPhotos];
      });
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
    if (loading) return;
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchPhotos(currentQuery ?? undefined, nextPage);
  };

  //Download photo
  const downloadPhoto = async (photo: Photo) => {
    try {
      const response = await fetch(photo.urls.raw, {
        method: "GET",
        headers: {
          Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to download photo: ${response.status}`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${photo.id}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading photo:", error);
    }
  };

  const handleSharePhoto = async () => {
    if (!selectedPhoto) return;

    const shareUrl = `${window.location.origin}/?photoId=${selectedPhoto.id}`;
    const shareData = {
      title: "Check out this photo!",
      text: `Look at this amazing photo by ${selectedPhoto.user.name}`,
      url: shareUrl,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Shared successfully");
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard");
    }
  };

  return (
    <PhotoContext.Provider
      value={{
        handleHomeClick,
        photos,
        addPhoto,
        removePhoto,
        searchPhotos,
        loadMore,
        loading,
        error,
        handleClick,
        selectedPhoto,
        handleCloseModal,
        downloadPhoto,
        handleSharePhoto,
        isOpen,
        isSavePanelOpen,
        setIsSavePanelOpen,
        folders,
        createFolder,
        saveToFolder,
        handleOpenSaveModal,
        hanldeNavigateToFolders,
        errorMessage,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};
