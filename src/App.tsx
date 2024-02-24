import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CreateRooom, Home, Login, SelectRoom, SignUp } from "@/pages/index";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/selectroom" element={<SelectRoom />} />
          <Route path="/createroom" element={<CreateRooom />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
