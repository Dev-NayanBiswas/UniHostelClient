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

const queryClient = new QueryClient();

axios.defaults.baseURL = import.meta.env.VITE_BASE_URl;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={Routers}/>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
);
