import { useContext, useRef, useEffect, useCallback } from "react";
import "./ModalPhoto.css";
import { PhotoContext } from "../PhotoContext/PhotoProvider";
function ModalPhoto({ children }: { children: React.ReactNode }) {
  const { isOpen, handleCloseModal } = useContext(PhotoContext);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  useEffect(() => {
    if (!dialogRef.current) return;
    if (isOpen) {
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
  }, [isOpen]);

  const handleClose = (
    e:
      | React.MouseEvent<HTMLDialogElement>
      | React.KeyboardEvent<HTMLDialogElement>,
  ) => {
    if (
      e.target === dialogRef.current ||
      (e as React.KeyboardEvent).key === "Escape"
    ) {
      handleCloseModal();
      //   dialogRef.current.close();
    }
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    },
    [handleCloseModal],
  );
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      onClick={handleClose}
      className="border border-gray-400 rounded w-full max-w-2xl m-0"
    >
      {children}
    </dialog>
  );
}

export default ModalPhoto;
