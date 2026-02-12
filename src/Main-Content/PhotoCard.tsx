import { useContext } from "react";
import { PhotoContext } from "../PhotoContext/PhotoProvider";

function PhotoCard() {
  const { photos, loadMore, loading, handleClick } = useContext(PhotoContext);

  return (
    <div className="border border-gray-400 rounded p-4">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {photos.map((photo) => (
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
        {loading && (
          <div className="col-span-full text-center text-gray-500">
            Loading photos...
          </div>
        )}
      </div>
      <button
        onClick={loadMore}
        className="flex border text-black mt-4 mx-auto block"
      >
        Load More
      </button>
    </div>
  );
}

export default PhotoCard;
