import { useContext } from "react";
import { PhotoContext } from "../PhotoContext/PhotoProvider";

function PictureDesc() {
  const { selectedPhoto } = useContext(PhotoContext);
  return (
    <div className="border border-gray-700 rounded-xl p-4 pb-8 flex flex-col items-center gap-4">
      <img
        className="w-auto h-auto rounded-xl"
        src={selectedPhoto?.urls.small}
        alt={selectedPhoto?.alt_description}
      />
      <p className="text-center">{selectedPhoto?.alt_description}</p>
      <p className="text-center text-gray-500">{selectedPhoto?.user?.name}</p>
    </div>
  );
}

export default PictureDesc;
