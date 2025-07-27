// Default Import

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { useState } from "react";
import { Toaster } from "react-hot-toast";

// Utility Pages / Components

import ScrollToTop from "./utility/ScrollToTop";
import CustomCursor from "./utility/CustomCursor";
import ScrollToTopFunction from "./utility/ScrollToTopFunction";
import NotFoundPage from "./pages/Utility/NotFound404";
import LoadingScreen from "./pages/Utility/LoadingScreen";

// Pages

import LandingPage from "@/pages/Landing/page";
import MapGamePage from "./pages/GeoCulture/page";

import DemoPage from "./pages/Demo/page";

function App() {

  const [loading, setLoading] = useState(true);

  return (

    // Providers, Router, Scroll to Top Function and Button, and Custom Cursor

    <BrowserRouter>
      <ScrollToTopFunction />
      <ScrollToTop />
      <CustomCursor />

      {loading && (
        <LoadingScreen onComplete={() => setLoading(false)} />
      )}

      <AnimatePresence mode="wait">

        {!loading && (

          <Routes>
          
              
            <Route index element={<LandingPage/>} />

            <Route path="*" element={<NotFoundPage />} />


            <Route path="/geoculture" element={<MapGamePage />} />
            <Route path="/explore" element={<DemoPage />} />

          </Routes>

        )}

      </AnimatePresence>

      <Toaster position="top-center" />

    </BrowserRouter>

  );
}

export default App;
