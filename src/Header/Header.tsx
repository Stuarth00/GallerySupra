import { useContext } from "react";
import { PhotoContext } from "../PhotoContext/PhotoProvider";

function Header() {
  const { handleHomeClick, hanldeNavigateToFolders, handleMyPhotosClick } =
    useContext(PhotoContext);
  return (
    <div className="relative mb-24 grid grid-flow-col grid-cols-2 pt-20">
      <div className="fixed w-full justify-between font-bold text-2xl text-center bg-[#0E2931] text-[#E2E2E0] py-4 px-8 shadow-md">
        <button
          className="bg-[#0E2931] text-[#E2E2E0] px-4 py-2"
          onClick={handleHomeClick}
        >
          Gallery Supra
        </button>
      </div>
      <div className="flex justify-end items-center fixed w-full px-8 py-4 top-0 right-0">
        <button
          onClick={() => handleMyPhotosClick()}
          className="bg-[#0E2931] text-[#E2E2E0] px-4 py-2 rounded-md hover:bg-[#1A4D5C] duration-300"
        >
          My Photos
        </button>
        <button
          onClick={() => hanldeNavigateToFolders()}
          className="bg-[#0E2931] text-[#E2E2E0] px-4 py-2 rounded-md hover:bg-[#1A4D5C] transition-colors duration-300"
        >
          My Folders
        </button>
      </div>
    </div>
  );
}

export default Header;
