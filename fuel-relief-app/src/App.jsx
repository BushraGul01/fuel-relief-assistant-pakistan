import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import Validator from "./pages/Validator.jsx";
import Eligibility from "./pages/Eligibility.jsx";
import RejectionHelp from "./pages/RejectionHelp.jsx";
import Guide from "./pages/Guide.jsx";
import Assistant from "./pages/Assistant.jsx";
import FAQ from "./pages/FAQ.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Privacy from "./pages/Privacy.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/validator" element={<Validator />} />
          <Route path="/eligibility" element={<Eligibility />} />
          <Route path="/rejection-help" element={<RejectionHelp />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
