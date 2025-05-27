import toast, { Toaster } from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const LoginPage = () => {
  const {signin,error,isAuthenticated}=useAuth()

  const navigate=useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (error && Array.isArray(error)) {
      error.forEach((err) => toast.error(err));
    }

  }, [error]);

  // const navigate = useNavigate();

  const onSubmit = (data) => {
    signin( data);
    toast.success("Inicio de sesión exitoso");
    // Aquí puedes manejar la autenticación
  };

useEffect(() => {
 
  if (isAuthenticated) navigate('/homeauth/dashboard')



}, [isAuthenticated])


  return (
    <div
      className="flex h-screen items-center justify-center bg-blue-600"
      style={{ backgroundImage: "url('/ggg.png')" }}
    >
      <Toaster position="top-right" reverseOrder={false} />

      <div className="flex bg-white rounded-2xl shadow-lg overflow-hidden w-3/4 max-w-4xl">
        {/* Imagen de la izquierda */}
        <div className="w-1/2 hidden md:block">
          <img
            src="https://i.pinimg.com/550x/bc/ff/f7/bcfff79f5f557831a48ac8c1f31b293c.jpg"
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Formulario */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Bienvenido
          </h2>
          <p className="text-sm text-gray-600 text-center">
            Inicia sesión en tu cuenta
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Campo de Email */}
            <div>
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
                    className={`input input-bordered w-full mt-2 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    placeholder="correo@ejemplo.com"
                    autoComplete="email"
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Campo de Contraseña */}
            <div>
              <label className="block text-gray-700">Contraseña</label>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 6,
                    message: "Debe tener al menos 6 caracteres",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    className={`input input-bordered w-full mt-2 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    placeholder="******"
                    autoComplete="current-password"
                  />
                )}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              className="w-full btn bg-[#28f1d5] text-black py-2 mt-6 rounded-lg hover:bg-[#28f1d6bb] transition"
            >
              Iniciar Sesión
            </button>
          </form>

          {/* Enlace para registrarse */}
          <p className="mt-4 text-sm text-gray-600 text-center">
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
