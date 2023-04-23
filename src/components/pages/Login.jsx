import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../constants/env";
import { setToken } from "../../helpers/auth";
import { LoginTemplate } from "../templates/LoginTemplate";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const nav = useNavigate();
  const {setUserData} = useContext(UserContext);

  const [error, setError] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    axios
      .post(`${API_URL}/public/login`, data)
      .then((resp) => {
        setToken(resp.data.data.token);
        setUserData(resp.data.data.user);
        nav("/");
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <LoginTemplate title="Iniciar sesión">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            className="border-gray-300 w-full rounded-full"
            type="email"
            placeholder="Correo electrónico"
            name="email"
            required
          />
        </div>
        <div className="mb-4">
          <input
            className="border-gray-300 w-full rounded-full"
            type="password"
            placeholder="Contraseña"
            name="password"
            required
          />
        </div>
        <div className="text-center pt-1 mb-12 pb-1">
          <button
            className="bg-gradient w-full mb-2 py-2 rounded-full text-gray-100"
            type="submit"
          >
            Ingresar
          </button>
          <Link className="text-gray-500 " to="/registro">
            ¿Deseas registrarte?
          </Link>
        </div>
        {error && (
          <p className="text-center p-2 bg-red-100 text-red-800">
            {error?.response?.data?.data}
          </p>
        )}
      </form>
    </LoginTemplate>
  );
};

export default Login;
