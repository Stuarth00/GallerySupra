// import { MOCK_PHOTOS } from "../MockPhotos/Mocks";
import { useContext, useState } from "react";
import { PhotoContext } from "../PhotoContext/PhotoProvider";

function Navigation() {
  const { photos, searchPhotos } = useContext(PhotoContext);
  const heroPhoto = photos.length > 0 ? photos[0] : null;
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchClick = () => {
    if (searchTerm.trim() === "") return;
    searchPhotos(searchTerm);
    setSearchTerm("");
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="border border-gray-400 rounded p-4 text-[#0E2931] dark:text-[#e2e2e0]">
      <nav className="grid grid-flow-col grid-rows-3 gap-4">
        <p className="col-span-2 font-sans">
          The best place where you can get inspired and inspire anyone
        </p>
        <div className="col-span-2 flex items-center flex justify-between border rounded px-3 py-2">
          <input
            type="text"
            name="searchTerm"
            id="searching"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search what you want"
            className="bg-transparent border-none outline-none w-full"
          />
          <button onClick={handleSearchClick} className="flex border">
            Search
          </button>
        </div>
        <div className="row-span-3 flex justify-center">
          {heroPhoto && (
            <img
              src={heroPhoto.urls.regular}
              alt={heroPhoto.alt_description || "Hero Image"}
              className="w-64 h-64 object-cover border rounded-xl"
            />
          )}
        </div>
      </nav>
      <div className="flex flex-row gap-4 mt-4 align-items-center justify-center">
        <button onClick={() => searchPhotos("nature")} className="flex border ">
          Nature
        </button>
        <button onClick={() => searchPhotos("art")} className="flex border">
          Art
        </button>
        <button onClick={() => searchPhotos("travel")} className="flex border">
          Travel
        </button>
        <button
          onClick={() => searchPhotos("technology")}
          className="flex border"
        >
          Technology
        </button>
      </div>
    </div>
  );
}

export default Navigation;
