import React from "react";
import Navbar from "../components/UI/Navbar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const HomeAuth = () => {

  const { size,  } = useAuth();

  return (
    <div>
    <div className="flex h-screen m-0 border bg-gray-100">
      <Navbar />
      <div className={`  ${size ? "pl-62 " : "pl-40"}`}  >
        <Outlet /> {/* Aquí se renderizarán las rutas hijas como Dashboard */}
      </div>
    </div>
    </div>
  );
};
