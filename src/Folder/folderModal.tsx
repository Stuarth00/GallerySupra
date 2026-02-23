import { useEffect, useRef, useState, useContext } from "react";
import { PhotoContext } from "../PhotoContext/PhotoProvider";
import "./folderModal.css";

function FolderModal() {
  const {
    isSavePanelOpen,
    folders,
    createFolder,
    saveToFolder,
    setIsSavePanelOpen,
    selectedPhoto,
    errorMessage,
  } = useContext(PhotoContext);
  const [newFolderName, setNewFolderName] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  const sendNewFolderName = (name: string) => {
    createFolder(name);
    setNewFolderName("");
  };

  useEffect(() => {
    if (!dialogRef.current) return;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isSavePanelOpen) {
      dialogRef.current.showModal();
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      dialogRef.current.close();
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isSavePanelOpen]);

  return (
    <dialog ref={dialogRef} className="p-4 rounded-lg w-80">
      <h3>Save to...</h3>
      <div className="flex flex-col gap-2 my-4">
        {folders.map((folder) => (
          <button
            key={folder.id}
            onClick={() => {
              saveToFolder(folder.id, selectedPhoto?.id || "");
              setIsSavePanelOpen(false);
            }}
            className="text-left p-2 hover:bg-gray-100 rounded"
          >
            {folder.name}
          </button>
        ))}
      </div>
      <div className="flex gap-2 mt-4 border-t pt-4">
        <input
          required
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          placeholder="New Folder Name"
          className="border p-1 flex-1"
        />
        <button
          onClick={() => sendNewFolderName(newFolderName)}
          className="bg-black text-white px-3 rounded"
        >
          +
        </button>
        <button
          onClick={
            isSavePanelOpen ? () => setIsSavePanelOpen(false) : undefined
          }
          className="absolute top-4 left-0 size-10"
        >
          {" "}
          X{" "}
        </button>
      </div>
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </dialog>
  );
}
export default FolderModal;
