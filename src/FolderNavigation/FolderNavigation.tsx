import { useContext } from "react";
import { useParams } from "react-router-dom";
import { PhotoContext } from "../PhotoContext/PhotoProvider";
import PhotoCard from "../Main-Content/PhotoCard";
import ModalPhoto from "../Main-Content/ModalPhoto";
import PictureDesc from "../Main-Content/PictureDesc";
import FolderModal from "../Folder/folderModal";

function FolderNavigation() {
  const { folders } = useContext(PhotoContext);
  const { id } = useParams();

  const folder = folders.find((f) => f.id === id);
  if (!folder) {
    return <div>Folder not found</div>;
  }

  return (
    <div>
      <PhotoCard photos={folder.photos} hideLoadMore />
      <ModalPhoto>
        <PictureDesc />
        <FolderModal />
      </ModalPhoto>
    </div>
  );
}
export default FolderNavigation;
