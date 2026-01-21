import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Layout from "./Main-Content/Layout";
import Navigation from "./Navigation-Bar/Navigation";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="min-h-screen flex flex-row gap-4 p-4">
        <Navigation />
        <Layout />
      </main>
      <Footer />
    </div>
  );
}

export default App;
