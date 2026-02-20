import { useContext } from "react";
import { PhotoContext } from "../PhotoContext/PhotoProvider";

function FolderPage() {
  const { folders, photos } = useContext(PhotoContext);
  const firstPhotoId = folders
    .map((folder) => folder.photoIds[0])
    .find((id) => id !== undefined);
  const previewPhoto = photos.find((p) => p.id === firstPhotoId);

  return (
    <div className="min-h-screen flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Folders</h1>
      <p>This is the folders page. Here you can manage your photo folders.</p>
      <div className="border border-gray-400 rounded p-4">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {folders.map((folder) => (
            <li key={folder.id}>
              <button className="relative w-full h-40 border border-gray-400 rounded-lg p-4 text-left flex flex-col justify-between hover:shadow-lg transition">
                {previewPhoto ? (
                  <img
                    src={previewPhoto.urls.small}
                    alt={previewPhoto.alt_description || "Preview"}
                    className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 z-0">
                    No preview
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
                <div className="relative z-20 flex flex-col justify-end h-full p-4">
                  <span className="text-lg font-semibold text-white drop-shadow-md">
                    {folder.name}
                  </span>
                  <span className="text-sm text-gray-200">
                    {folder.photoIds.length} photos
                  </span>
                </div>
                {/* <span className="text-lg font-semibold">{folder.name}</span>
                <span className="text-sm text-gray-500">
                  {folder.photoIds.length} photos
                </span> */}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default FolderPage;
