// components/dashboard/EmptyUsers.tsx
"use client";

export const EmptyUsers = () => {
  return (
    <div className="w-full h-[500px] flex flex-col items-center justify-center 
      rounded-xl bg-white border border-neutral-200 border-dashed relative">

      {/* Icono */}
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500/10 mb-4">
        <svg
          width={32}
          height={32}
          viewBox="0 0 48 48"
          fill="none"
        >
          <path
            d="M25 24C28.3137 24 31 21.3137 31 18C31 14.6863 28.3137 12 25 12C21.6863 12 19 14.6863 19 18C19 21.3137 21.6863 24 25 24Z"
            fill="#3B82F6"
          />
          <path
            d="M29.043 26.001H20.957C19.6428 26.0026 18.3829 26.5253 17.4536 27.4546C16.5244 28.3839 16.0016 29.6438 16 30.958V36.001H34V30.958C33.9984 29.6438 33.4756 28.3839 32.5464 27.4546C31.6171 26.5253 30.3572 26.0026 29.043 26.001Z"
            fill="#3B82F6"
          />
        </svg>
      </div>

      {/* Texto */}
      <p className="text-lg font-semibold text-gray-900">No users yet</p>

      <p className="text-sm text-center text-[#616f89] max-w-[300px] mt-1">
        Aún no tienes colaboradores. Empieza por añadir un nuevo usuario.
      </p>

      {/* Botón */}
      <button
        className="mt-6 px-6 py-2 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600"
      >
        Añade un usuario
      </button>
    </div>
  );
};
