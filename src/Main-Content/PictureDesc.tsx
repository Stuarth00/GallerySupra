import { useContext } from "react";
import { PhotoContext } from "../PhotoContext/PhotoProvider";

function PictureDesc() {
  const {
    selectedPhoto,
    downloadPhoto,
    handleSharePhoto,
    handleCloseModal,
    handleOpenSaveModal,
  } = useContext(PhotoContext);
  return (
    <div className="border border-gray-700 rounded-xl p-4 pb-8 flex flex-col items-center gap-4">
      <img
        className="w-auto max-h-[80vh] object-contain rounded-xl"
        src={selectedPhoto?.urls.regular}
        alt={selectedPhoto?.alt_description}
      />
      <p className="text-center">{selectedPhoto?.alt_description}</p>
      <p className="text-center text-gray-500">{selectedPhoto?.user?.name}</p>
      <div className="flex gap-4 ">
        <button
          onClick={() => selectedPhoto && downloadPhoto(selectedPhoto)}
          className="border border-gray-400 rounded px-4 py-2 mr-2"
        >
          Download
        </button>
        <button
          onClick={() => selectedPhoto && handleSharePhoto(selectedPhoto)}
          className="border border-gray-400 rounded px-4 py-2 mr-2"
        >
          Share
        </button>
        <button
          onClick={handleOpenSaveModal}
          className="border border-gray-400 rounded px-4 py-2"
        >
          Save
        </button>
      </div>
      <button
        onClick={handleCloseModal}
        className="absolute top-4 left-0 size-10"
      >
        X
      </button>
    </div>
  );
}

export default PictureDesc;
