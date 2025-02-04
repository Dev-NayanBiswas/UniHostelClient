import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";
import Routers from "./Routes/Routes";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./Providers/AuthProvider";
import axios from "axios";
import { ParallaxProvider } from "react-scroll-parallax";
import { ToastContainer } from "react-toastify";
import { ReactLenis, useLenis } from 'lenis/react'
import { AnimatePresence } from "motion/react";

const queryClient = new QueryClient();

axios.defaults.baseURL = import.meta.env.VITE_BASE_URl;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AnimatePresence mode="wait">
    <HelmetProvider>
      <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ParallaxProvider>
        <ReactLenis root>
        <RouterProvider key={crypto.randomUUID()} router={Routers}/>
        </ReactLenis>
      <ReactQueryDevtools initialIsOpen />
      </ParallaxProvider>
      <ToastContainer position='top-center' />
    </QueryClientProvider>
      </AuthProvider>
    </HelmetProvider>
    </AnimatePresence>
  </StrictMode>,
);
