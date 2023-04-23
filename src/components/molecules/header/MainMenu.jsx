import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteToken, token } from "../../../helpers/auth";
import { UserContext } from "../../../context/UserContext";

const MainMenu = () => {
  const nav = useNavigate();

  const { userData, setUserData } = useContext(UserContext);

  const handleSesion = () => {
    deleteToken();
    nav("/");
    setUserData();
  };

  return (
    <nav className="w-full">
      <ul className="flex justify-end text-gray-100">
        <li className="flex items-center">
          <Link className="menu-item" to="/">
            Inicio
          </Link>
        </li>
        <li className="flex items-center">
          <Link className="menu-item" to="/productos">
            Productos
          </Link>
        </li>
        <li className="flex items-center">
          <Link className="menu_item" to="/carrito">
            Carrito
          </Link>
        </li>

        {!token() ? (
          <li className="flex items-center">
            <Link className="menu-item" to="/login">
              Iniciar Sesión
            </Link>
          </li>
        ) : (
          <>
            {userData?.is_admin && (
              <li className="flex items-center">
                <Link className="menu_item" to="/admin/productos">
                  Administrar productos
                </Link>
              </li>
            )}
            <li className="flex items-center">
              <a onClick={handleSesion} className="menu-item cursor-pointer">
                Cerrar sesión
              </a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default MainMenu;
