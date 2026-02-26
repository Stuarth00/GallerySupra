import { ChangeEvent, useContext, useState } from "react";
import { PhotoContext } from "../PhotoContext/PhotoProvider";

function UploadForm() {
  const { addPhoto, onCloseForm } = useContext(PhotoContext);
  const [desc, setDesc] = useState("");
  const [, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFilechange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;

    if (!imageUrl) return;
    if (selectedFile) {
      setFile(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFilechange(e as unknown as ChangeEvent<HTMLInputElement>);

    const newPhoto = {
      id: `local-${Date.now()}`,
      urls: {
        regular: imageUrl || "",
        small: imageUrl || "",
        full: imageUrl || "",
        raw: imageUrl || "",
      },
      alt_description: desc,
      user: {
        name: "Cedric",
      },
    };
    addPhoto(newPhoto);
    setDesc("");
    setFile(null);
    setImageUrl(null);
    onCloseForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 bg-white rounded-lg"
    >
      <h2 className="text-xl font-bold">Upload new photo</h2>
      <input
        id="file-input"
        type="file"
        placeholder="Past Image here"
        accept="image/*"
        onChange={handleFilechange}
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
