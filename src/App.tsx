import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Layout from "./Main-Content/Layout";
import Gallery from "./Gallery/Gallery";
// import Navigation from "./Navigation-Bar/Navigation";
// import PhotoCard from "./Main-Content/PhotoCard";
import { PhotoProvider } from "./PhotoContext/PhotoProvider";
import "./App.css";
// import ModalPhoto from "./Main-Content/ModalPhoto";
// import PictureDesc from "./Main-Content/PictureDesc";
// import FolderModal from "./Folder/folderModal";
import { Routes, Route } from "react-router-dom";
import FolderPage from "./Folder/FolderPage";

function App() {
  return (
    <PhotoProvider>
      <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
        <Header />
        <main className="min-h-screen flex flex-col gap-4 p-4">
          <Layout>
            <Routes>
              <Route path="/" element={<Gallery />} />
              <Route path="/folders" element={<FolderPage />} />
            </Routes>
          </Layout>
        </main>
        <Footer />
      </div>
    </PhotoProvider>
  );
}

export default App;
