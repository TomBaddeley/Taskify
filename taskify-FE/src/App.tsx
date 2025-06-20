import { BrowserRouter, Routes, Route } from "react-router-dom";
import HelloPage from "./pages/HelloPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HelloPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;