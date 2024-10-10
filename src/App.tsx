import { Outlet } from "react-router-dom";
import Header from "./components/home/Header";
import Footer from "./components/home/Footer";
import { Toaster } from "sonner";

export default function App() {
  return (
    <div className="flex flex-col min-h-full">
      <Toaster richColors position="top-right" />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
