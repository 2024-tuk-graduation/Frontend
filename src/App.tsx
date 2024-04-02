import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CreateRoom, Editor, Home, Login, SelectRoom, SignUp } from "@/pages/index";
import Modal from "react-modal";

const queryClient = new QueryClient();
Modal.setAppElement("#root");

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/selectRoom" element={<SelectRoom />} />
          <Route path="/createRoom" element={<CreateRoom />} />
          <Route path="/Editor/:roomId" element={<Editor />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
