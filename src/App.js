import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/HomePage/Homepage";
import CollectionPage from "./Pages/CollectionPage/CollectionPage";
import { CollectionProvider } from "./Components/Collection/CollectionProvider";

function App() {
  return (
    <div>
      <BrowserRouter>
        <CollectionProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/collections" element={<CollectionPage />} />
          </Routes>
        </CollectionProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
