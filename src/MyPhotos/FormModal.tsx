import React, { useEffect, useRef, useContext } from "react";
import "./FormModal.css";
import { PhotoContext } from "../PhotoContext/PhotoProvider";

const FormModal = ({ children }: { children: React.ReactNode }) => {
  const { isFormOpen, onCloseForm } = useContext(PhotoContext);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current) return;
    if (isFormOpen) {
      dialogRef.current.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialogRef.current.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFormOpen]);

  const handleClose = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onCloseForm();
    }
  };
  return (
    <dialog ref={dialogRef} onClick={handleClose}>
      {children}
    </dialog>
  );
};
export default FormModal;
