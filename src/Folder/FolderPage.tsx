import { useContext } from "react";
import { PhotoContext } from "../PhotoContext/PhotoProvider";

function FolderPage() {
  const { folders, handleNavigateToFolderId } = useContext(PhotoContext);

  return (
    <div className="min-h-screen flex flex-col gap-4 p-4 overflow-hidden">
      <h1 className="text-2xl font-bold">Folders</h1>
      <p>This is the folders page. Here you can manage your photo folders.</p>
      {folders.length === 0 ? (
        <div className="border border-gray-400 rounded p-4 text-center text-gray-500">
          No folders created yet. Start by creating a new folder!
        </div>
      ) : (
        <div className="border border-gray-400 rounded p-4 overflow-hidden">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
            {folders.map((folder) => {
              const previewPhoto = folder.photos[0];

              return (
                <li
                  key={folder.id}
                  className="w-full h-52 bg-gray-900 border border-gray-700 rounded-lg p-4 flex flex-col justify-between hover:shadow-xl hover:border-gray-500 transition"
                >
                  <button
                    onClick={() => handleNavigateToFolderId(folder.id)}
                    className="text-white w-full h-40 border border-gray-400 rounded-lg p-4 text-left flex flex-col justify-between hover:shadow-lg transition"
                  >
                    {previewPhoto ? (
                      <img
                        src={previewPhoto.previewUrl}
                        alt={previewPhoto.id}
                        className="w-full h-24 object-cover rounded"
                      />
                    ) : (
                      <div className="h-24 bg-gray-800 rounded-md flex items-center justify-center text-gray-500">
                        No photos
                      </div>
                    )}
                    <span className="text-lg font-semibold">{folder.name}</span>
                    <span className="text-sm text-gray-500">
                      {folder.photos.length} photos
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
export default FolderPage;
