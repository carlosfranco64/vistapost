import { useState } from "react";
import { FaPlus, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Ventas = () => {
  const [pedidos, setPedidos] = useState([
    { id: 1, cliente: "Juan Pérez", producto: "Hamburguesa Doble", total: "$15", estado: "Pendiente" },
    { id: 2, cliente: "Ana López", producto: "Pizza Personal", total: "$12", estado: "En Proceso" },
  ]);
  
  return (
    <div className="h-screen overflow-y-auto p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">🛒 Ventas / Pedidos</h2>
      
      {/* Formulario para nuevo pedido */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Agregar Pedido</h3>
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" placeholder="Cliente" className="p-3 border rounded-lg" />
          <input type="text" placeholder="Producto" className="p-3 border rounded-lg" />
          <input type="text" placeholder="Total" className="p-3 border rounded-lg" />
          <button className="col-span-1 md:col-span-3 bg-blue-500 text-white p-3 rounded-lg flex items-center justify-center">
            <FaPlus className="mr-2" /> Agregar Pedido
          </button>
        </form>
      </div>
      
      {/* Pedidos Activos */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Pedidos Activos</h3>
        <ul>
          {pedidos.map((pedido) => (
            <li key={pedido.id} className="p-3 border-b flex justify-between">
              <span>{pedido.cliente} - {pedido.producto} ({pedido.total})</span>
              <span className={pedido.estado === "Pendiente" ? "text-red-500" : "text-yellow-500"}>{pedido.estado}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Tabla de Pedidos Recientes */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">📦 Últimos Pedidos</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">Cliente</th>
              <th className="p-2">Producto</th>
              <th className="p-2">Total</th>
              <th className="p-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id} className="border-b hover:bg-gray-100">
                <td className="p-2">{pedido.cliente}</td>
                <td className="p-2">{pedido.producto}</td>
                <td className="p-2">{pedido.total}</td>
                <td className={`p-2 font-bold flex items-center space-x-2 ${pedido.estado === "Pendiente" ? "text-red-500" : "text-yellow-500"}`}>
                  {pedido.estado === "Pendiente" ? <FaTimesCircle /> : <FaCheckCircle />}
                  <span>{pedido.estado}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ventas;
