import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Story from "./pages/Story";
import PlantATree from "./pages/PlantATree";
import MemorialWall from "./pages/MemorialWall";
import Shop from "./pages/Shop";
import Podcast from "./pages/Podcast";
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import AdminAuth from "./pages/AdminAuth";
import ChargerProject from "./pages/ChargerProject";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";
import CorporateLanding from "./pages/CorporateLanding";

import { AmbientPlayer } from "@/components/AmbientPlayer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AmbientPlayer />
      <BrowserRouter>
        <Routes>
          {/* Corporate / Startup Face (Default) */}
          <Route path="/" element={<CorporateLanding />} />
          <Route path="/enterprise" element={<CorporateLanding />} />

          {/* Community App (Moved to Subpage) */}
          <Route path="/community" element={<Index />} />

          <Route path="/story" element={<Story />} />
          <Route path="/plant-a-tree" element={<PlantATree />} />
          <Route path="/memorial-wall" element={<MemorialWall />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/podcast" element={<Podcast />} />
          {/* Duplicate community route for legacy support if needed, but Index is better at /community */}
          {/* <Route path="/community" element={<Community />} /> -- Renamed old Community page? No, wait. */}
          {/* Checking imports: Community was already a page. Index was the home page. */}
          {/* Let's keep the existing /community route as is (it was import Community from "./pages/Community") */}
          {/* We are moving the OLD HOME (Dashboard/Index) to /dashboard or /app */}

          <Route path="/dashboard" element={<Index />} />

          {/* Original Pages */}
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/community" element={<Community />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/auth" element={<AdminAuth />} />
          <Route path="/charger-project" element={<ChargerProject />} />
          <Route path="/product/:handle" element={<Product />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
