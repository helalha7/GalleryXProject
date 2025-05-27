import { Playfair_Display, Raleway } from "next/font/google";
import "../styles/globals.css";
import Header from "../components/shared/Header";
import AnimatedBackdrop from "@/components/shared/AnimatedBackdrop";
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

export const metadata = {
  title: "GalleryX - Virtual Museum Experience",
  description: "Explore art and artifacts from around the world in our virtual museum.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
