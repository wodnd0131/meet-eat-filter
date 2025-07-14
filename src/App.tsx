
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateJoinRoom from "./pages/CreateJoinRoom";
import RoomLobby from "./pages/RoomLobby";
import RestaurantFilter from "./pages/RestaurantFilter";
import NotFound from "./pages/NotFound";
import MapResults from "./components/MapResults";
import VoteResultPage from "./pages/VoteResultPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/meet-eat-filter">
        <Routes>
          <Route path="/" element={<CreateJoinRoom />} />
          <Route path="/room/:roomId" element={<RoomLobby />} />
          <Route path="/room/:roomId/filter" element={<RestaurantFilter />} />
          <Route path="/room/:roomId/map" element={<MapResults />} />
          <Route path="/room/:roomId/result" element={<VoteResultPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
