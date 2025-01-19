import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Reviews from "./pages/reviews";
import Header from "./components/header";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>
    </BrowserRouter>
  );
}
