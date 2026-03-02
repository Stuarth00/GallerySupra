import { useContext } from "react";
import { PhotoContext } from "../PhotoContext/PhotoProvider";
import PhotoCard from "../Main-Content/PhotoCard";
import ModalPhoto from "../Main-Content/ModalPhoto";
import PictureDesc from "../Main-Content/PictureDesc";
import FolderModal from "../Folder/folderModal";
import FormModal from "./FormModal";
import UploadForm from "./UploadForm";

function MyPhoto() {
  const { onOpenForm, photoUploaded } = useContext(PhotoContext);
  return (
    <div className="text-[#0E2931] dark:text-[#e2e2e0]">
      <button onClick={onOpenForm}>Upload your photo</button>
      <FormModal>
        <UploadForm />
      </FormModal>
      <div>
        <PhotoCard photos={photoUploaded} hideLoadMore />
        <ModalPhoto>
          <PictureDesc />
          <FolderModal />
        </ModalPhoto>
      </div>
    </div>
  );
}
export default MyPhoto;
