import { FaShoppingCart, FaUtensils, FaUsers, FaDollarSign, FaChartLine } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const dataVentas = [
  { dia: "Lun", ventas: 1200 },
  { dia: "Mar", ventas: 2300 },
  { dia: "Mié", ventas: 1800 },
  { dia: "Jue", ventas: 2500 },
  { dia: "Vie", ventas: 3200 },
  { dia: "Sáb", ventas: 4000 },
  { dia: "Dom", ventas: 3800 }
];

const dataProductos = [
  { nombre: "Hamburguesa", cantidad: 50 },
  { nombre: "Pizza", cantidad: 40 },
  { nombre: "Hot Dog", cantidad: 35 },
  { nombre: "Papas Fritas", cantidad: 30 },
  { nombre: "Malteada", cantidad: 25 }
];

const Dashboard = () => {
  return (
    <div className="p-4 md:p-6 w-full h-screen overflow-auto bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">📊 Dashboard</h2>

      {/* Tarjetas de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard icon={<FaShoppingCart size={32} />} title="Ventas del Día" value="150" color="bg-blue-500" />
        <MetricCard icon={<FaUtensils size={32} />} title="Pedidos Activos" value="25" color="bg-green-500" />
        <MetricCard icon={<FaUsers size={32} />} title="Clientes Registrados" value="1,250" color="bg-yellow-500" />
        <MetricCard icon={<FaDollarSign size={32} />} title="Total Ingresos" value="$12,500" color="bg-red-500" />
      </div>

      {/* Sección de Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <ChartCard title="📈 Ventas Semanales">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dataVentas}>
              <XAxis dataKey="dia" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="ventas" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="🔥 Productos Más Vendidos">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dataProductos}>
              <XAxis dataKey="nombre" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Últimos Pedidos */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">📦 Últimos Pedidos</h3>
        <table className="w-full text-left min-w-[600px]">
          <thead>
            <tr className="border-b">
              <th className="p-2">Cliente</th>
              <th className="p-2">Producto</th>
              <th className="p-2">Total</th>
              <th className="p-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {[ 
              { cliente: "Juan Pérez", producto: "Combo Hamburguesa", total: "$20", estado: "Entregado" },
              { cliente: "María Gómez", producto: "Pizza Familiar", total: "$35", estado: "En Proceso" },
              { cliente: "Carlos Ramírez", producto: "Hot Dog + Gaseosa", total: "$15", estado: "Pendiente" }
            ].map((pedido, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="p-2">{pedido.cliente}</td>
                <td className="p-2">{pedido.producto}</td>
                <td className="p-2">{pedido.total}</td>
                <td className={`p-2 font-bold ${pedido.estado === "Entregado" ? "text-green-500" : pedido.estado === "En Proceso" ? "text-yellow-500" : "text-red-500"}`}>
                  {pedido.estado}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const MetricCard = ({ icon, title, value, color }) => (
  <div className={`flex items-center p-5 rounded-lg shadow-lg ${color} text-white`}>
    <div className="mr-4">{icon}</div>
    <div>
      <h4 className="text-lg">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

export default Dashboard;