import { useContext } from "react";
// import { useParams } from "react-router-dom";
import { PhotoContext } from "../PhotoContext/PhotoProvider";
import "./style.css";
import { Photo } from "../PhotoContext/PhotoProvider";

interface PhotoCardProps {
  photos: Photo[];
  hideLoadMore?: boolean;
}

function PhotoCard({ photos, hideLoadMore }: PhotoCardProps) {
  const { loadMore, loading, handleClick } = useContext(PhotoContext);

  const distributePhotos = (items: typeof photos, numCols: number) => {
    const cols = Array.from({ length: numCols }, () => [] as typeof photos);
    items.forEach((photo, i) => {
      cols[i % numCols].push(photo);
    });
    return cols;
  };
  const columns = distributePhotos(photos, 4);
  // const { id } = useParams();
  // const currentFolder = folders.find((f) => f.id === id);

  return (
    <div className="border border-gray-400 rounded p-4">
      <div className="flex gap-4 items-start">
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-4 flex-1">
            {col.map((photo) => (
              <div
                key={photo.id}
                className="border border-gray-300 rounded overflow-hidden shadow-lg break-inside-avoid"
              >
                <img
                  src={photo.urls.small}
                  alt={photo.alt_description || "Photo"}
                  className="w-full h-auto rounded-t hoverImg"
                  onClick={() => handleClick(photo)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      {loading && (
        <div className="col-span-full text-center text-gray-500">
          Loading photos...
        </div>
      )}
      {!hideLoadMore && (
        <button
          onClick={loadMore}
          className="flex border text-black mt-4 mx-auto block"
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default PhotoCard;
