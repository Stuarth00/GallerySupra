import Navigation from "../Navigation-Bar/Navigation";
import PhotoCard from "../Main-Content/PhotoCard";
import ModalPhoto from "../Main-Content/ModalPhoto";
import PictureDesc from "../Main-Content/PictureDesc";
import FolderModal from "../Folder/folderModal";

function Gallery() {
  return (
    <div className="min-h-screen flex flex-col gap-4 p-4">
      <Navigation />
      <PhotoCard />
      <ModalPhoto>
        <PictureDesc />
        <FolderModal />
      </ModalPhoto>
    </div>
  );
}
export default Gallery;
