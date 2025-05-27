import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {  FaCog, FaSignOutAlt, FaTachometerAlt, FaShoppingCart, FaBoxOpen, FaChartBar, FaBars } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";

import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";


const Navbar = () => {
  const {  setSize } = useAuth();
  const [isExpanded, setIsExpanded] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    setSize(isExpanded);
  }, [isExpanded, setSize]);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className={`h-screen bg-gradient-to-b from-blue-600 fixed to-blue-900 text-white p-4 transition-all duration-300 ${isExpanded ? "w-64" : "w-20"}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-bold transition-opacity ${isExpanded ? "opacity-100" : "opacity-0 hidden"}`}>Admin POS</h2>
        <button onClick={() => setIsExpanded(!isExpanded)} className="p-2 rounded-full hover:bg-blue-500 transition">
         {isExpanded ? <IoCloseSharp size={36} /> : <FaBars size={24} /> } 
        </button>
      </div>
      
      <nav className="space-y-2">
        <Link to="/homeauth/dashboard" className="flex items-center gap-2 p-3 rounded-lg hover:bg-blue-500">
          <FaTachometerAlt size={20} />
          {isExpanded && <span>Dashboard</span>}
        </Link>
        
        <div onClick={() => setIsExpanded(true)}>
          <button onClick={() => toggleMenu("usuarios")} className="flex items-center gap-2 p-3 w-full text-left rounded-lg hover:bg-blue-500">
            <RiAdminFill size={20} />
            {isExpanded && <span>Administracion</span>}
          </button>
          {openMenu === "usuarios" && isExpanded && (
            <div className="ml-6 space-y-2">
              <Link to="/usuarios" className="block p-2 rounded-lg hover:bg-blue-400">Usuarios</Link>
              <Link to="/roles" className="block p-2 rounded-lg hover:bg-blue-400">Roles</Link>
            </div>
          )}
        </div>

        <Link to="/ventas" className="flex items-center gap-2 p-3 rounded-lg hover:bg-blue-500">
          <FaShoppingCart size={20} />
          {isExpanded && <span>Gestión de Ventas</span>}
        </Link>
        
        <Link to="/productos" className="flex items-center gap-2 p-3 rounded-lg hover:bg-blue-500">
          <FaBoxOpen size={20} />
          {isExpanded && <span>Gestión de Productos</span>}
        </Link>

        <Link to="/reportes" className="flex items-center gap-2 p-3 rounded-lg hover:bg-blue-500">
          <FaChartBar size={20} />
          {isExpanded && <span>Reportes</span>}
        </Link>
        
        <Link to="/configuracion" className="flex items-center gap-2 p-3 rounded-lg hover:bg-blue-500">
          <FaCog size={20} />
          {isExpanded && <span>Configuración</span>}
        </Link>

        <Link to="/logout" className="flex items-center gap-2 p-3 text-red-400 rounded-lg hover:bg-red-600">
          <FaSignOutAlt size={20} />
          {isExpanded && <span>Cerrar Sesión</span>}
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
