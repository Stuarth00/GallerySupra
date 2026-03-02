import { useContext } from "react";
import { PhotoContext } from "../PhotoContext/PhotoProvider";
import { useTheme } from "../ThemeMode/ThemeContext";

function Header() {
  const { handleHomeClick, hanldeNavigateToFolders, handleMyPhotosClick } =
    useContext(PhotoContext);
  const { toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 w-full bg-[#0E2931] text-[#E2E2E0] shadow-md z-50">
      <div className="flex justify-between items-center px-8 py-4 font-bold">
        <div className="flex items-center gap-4 text-2xl font-bold text-center">
          <button onClick={handleHomeClick}>Gallery Supra</button>
        </div>
        <div className="flex gap-4">
          <button onClick={handleMyPhotosClick}>My Photos</button>
          <button onClick={hanldeNavigateToFolders}>My Folders</button>
          <button onClick={toggleTheme}>Dark Mode</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
