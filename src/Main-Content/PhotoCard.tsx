import { PhotoContext } from "../PhotoContext/PhotoProvider";

function PhotoCard() {
  return (
    <div className="border border-gray-400 rounded p-4">
      <PhotoContext.Consumer>
        {({ photos }) => (
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
          </div>
        )}
      </PhotoContext.Consumer>
    </div>
  );
}

export default PhotoCard;
