import { useContext, useState } from "react";
import { PhotoContext } from "../PhotoContext/PhotoProvider";

function UploadForm() {
  const { addPhoto } = useContext(PhotoContext);
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPhoto = {
      id: `local-${Date.now()}`,
      urls: {
        small: url,
        regular: url,
        full: url,
        raw: url,
      },
      alt_description: desc,
      user: { name: "Cedric" },
    };
    addPhoto(newPhoto);
    setUrl("");
    setDesc("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 bg-white rounded-lg"
    >
      <h2 className="text-xl font-bold">Upload new photo</h2>
      <input
        type="url"
        placeholder="Past Image here"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        className="border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-[#0E2931] text-[#E2E2E0] px-4 py-2 rounded-md hover:bg-[#1A4D5C] duration-300"
      >
        Add to gallery
      </button>
    </form>
  );
}
export default UploadForm;
