import { useContext } from "react";
import { PhotoContext } from "../PhotoContext/PhotoProvider";
import PhotoCard from "../Main-Content/PhotoCard";
import ModalPhoto from "../Main-Content/ModalPhoto";
import PictureDesc from "../Main-Content/PictureDesc";
import FolderModal from "../Folder/folderModal";
import FormModal from "./FormModal";
import UploadForm from "./UploadForm";

function MyPhoto() {
  const { onOpenForm } = useContext(PhotoContext);
  return (
    <div>
      <h1>I'm going to upload photos and show them here</h1>
      <button onClick={onOpenForm}>Upload your photo</button>
      <FormModal>
        <UploadForm />
      </FormModal>
      <div>
        <PhotoCard photos={[]} hideLoadMore />
        <ModalPhoto>
          <PictureDesc />
          <FolderModal />
        </ModalPhoto>
      </div>
    </div>
  );
}
export default MyPhoto;
