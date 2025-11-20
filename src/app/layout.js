import "./globals.css";
import Footer from "./components/Footer";
import localFont from "next/font/local";
import AlertRenderer from "./components/AlertRenderer";
import { AlertProvider } from "./context/AlertContext";
import ClientLayout from "./clientLayout";

const poppins = localFont({
  src: [
    {
      path: "../../public/fonts/poppins/Poppins-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/poppins/Poppins-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/poppins/Poppins-Bold.woff2",
      weight: "400",
      style: "bold",
    },
    {
      path: "../../public/fonts/poppins/Poppins-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-poppins",
});

  export default function Layout({ children }) {

  return (
    <html lang="pt-BR">
      <body className={`${poppins.variable} bg-white text-black`}>
        <div id="alert-root"/>
        <AlertProvider>
          <ClientLayout>
            <AlertRenderer />
            <main className="flex-1 px-[10%] pt-[72px] bg-gray-50">{children}</main>
          </ClientLayout>
          <Footer />
        </AlertProvider>
      </body>
    </html>
  );
}
