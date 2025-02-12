import { StrictMode } from "react";

import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";

import { SocketContextProvider } from "../context/SocketContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
