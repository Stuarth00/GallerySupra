import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Layout from "./Main-Content/Layout";
import Gallery from "./Gallery/Gallery";
import { PhotoProvider } from "./PhotoContext/PhotoProvider";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import FolderPage from "./Folder/FolderPage";
import FolderNavigation from "./FolderNavigation/FolderNavigation";
import MyPhoto from "./MyPhotos/MyPhoto";

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
              <Route path="/folders/:id" element={<FolderNavigation />} />
              <Route path="/my-photos" element={<MyPhoto />} />
            </Routes>
          </Layout>
        </main>
        <Footer />
      </div>
    </PhotoProvider>
  );
}

export default App;
