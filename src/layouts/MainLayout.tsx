import { Outlet } from "react-router-dom";
import BG from "../shared/assets/wallpaperflare.com_wallpaper.jpg";

export const MainLayout = () => {
  return (
    <div className="min-h-screen">
      <img src={BG} className="fixed -z-10 min-h-screen" />
      <Outlet />
    </div>
  );
};
