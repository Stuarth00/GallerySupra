import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Layout from "./Main-Content/Layout";
import Navigation from "./Navigation-Bar/Navigation";
import PhotoCard from "./Main-Content/PhotoCard";
import { PhotoProvider } from "./PhotoContext/PhotoProvider";
import "./App.css";
import ModalPhoto from "./Main-Content/ModalPhoto";
import PictureDesc from "./Main-Content/PictureDesc";

function App() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Header />

      <main className="min-h-screen flex flex-col gap-4 p-4">
        <PhotoProvider>
          <Navigation />
          <Layout>
            <PhotoCard />
            <ModalPhoto>
              <PictureDesc />
            </ModalPhoto>
          </Layout>
        </PhotoProvider>
      </main>
      <Footer />
    </div>
  );
}

export default App;
