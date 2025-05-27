import toast, { Toaster } from 'react-hot-toast';
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { signup, isAuthenticated, error } = useAuth();

  useEffect(() => {
 
    if (isAuthenticated) navigate('/homeauth/dashboard')
  
  
  
  }, [isAuthenticated])

  useEffect(() => {
    if (error && Array.isArray(error)) {
      error.forEach((err) => toast.error(err));
    }

  }, [error]);

  const onSubmit = handleSubmit(async (data) => {
    console.log("Datos enviados:", data);
    try {
      await signup(data);
     if (!error) {
        toast.success("Datos enviado"); // ✅ Solo si no hay error
       }
      
    } catch (error) {
      
      toast.error("Ocurrió un error en el registro");
    }

  });

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/ggg.png')" }}
    >
      {/* Toaster para mostrar los mensajes */}
      <Toaster position="top-right" reverseOrder={true} />

      <div className="flex bg-white bg-opacity-90 rounded-2xl shadow-lg overflow-hidden w-3/4 max-w-4xl">
        <div className="w-1/2 hidden md:block">
          <img
            src="/moni.jpg"
            alt="Register Image"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Crear Cuenta
          </h2>
          <p className="text-sm text-gray-600 text-center">
            Regístrate para continuar
          </p>
          <form onSubmit={onSubmit} className="mt-4">
            <div>
              <label className="block text-gray-700">Nombre</label>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: "El nombre es obligatorio" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="input input-bordered w-full mt-2"
                    placeholder="Tu Nombre"
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Correo Electrónico</label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Correo no válido",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    className="input input-bordered w-full mt-2"
                    placeholder="correo@ejemplo.com"
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Contraseña</label>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    className="input input-bordered w-full mt-2"
                    placeholder="******"
                  />
                )}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button className="btn bg-[#28f1d5] hover:bg-[#28f1d6bb] w-full mt-6">
              Registrarse
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600 text-center">
            ¿Ya tienes cuenta?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Inicia sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
