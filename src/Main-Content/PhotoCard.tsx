import { useContext } from "react";
import { PhotoContext } from "../PhotoContext/PhotoProvider";

function PhotoCard() {
  const { photos, loadMore, loading } = useContext(PhotoContext);

  return (
    <div className="border border-gray-400 rounded p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="border border-gray-300 rounded overflow-hidden shadow-lg"
          >
            <img
              src={photo.urls.small}
              alt={photo.alt_description || "Photo"}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">
                {photo.alt_description || "Untitled"}
              </h2>
              <p className="text-sm text-gray-600">By {photo.user.name}</p>
            </div>
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
