import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../atoms/Loader";
import useFetch from "../../../../hooks/useFetch";
import { API_URL } from "../../../../constants/env";
import { token } from "../../../../helpers/auth";
import { formatPrice } from "../../../../helpers/number";
import axios from "axios";


const Table = () => {

  const { data, error, loading } = useFetch("public/products");

  const nav = useNavigate();

  const deleteProduct = (product) => {
    if (window.confirm("Estás seguro de eliminar")){
      axios.delete(`${API_URL}/admin/products/${product.id}`, {
        headers: {
          Authorization: `Bearer ${token()}`,
        }
      })
      .then(() => {nav("/admin/productos")})
    }
  }

  if (loading) return <Loader/>
  if (error) return <div className="alert_error">{error?.message}</div>

  return (
    <div className="bg-gray-200">
      <div className="container mx-auto py-5">
        <div className="flex flex-col gap-y-7 p-8 bg-white rounded-lg">
          <h1 className="font-semibold text-xl text-gray-400">ADMINISTRACIÓN DE PRODUCTOS</h1>
          <p className="font-light">Cantidad de productos: {data.length}</p>
          <div className="flex justify-end">
            <Link to="/admin/productos/crear" className="btn_primary">Agregar producto</Link>
          </div>
          <div className="relative overflow-x-auto rounded-tl-2xl rounded-tr-2xl">
            <table className="w-full table-fixed text-center text-sm ">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Editar</th>
                  <th>Borrar</th>
                </tr>
              </thead>
              <tbody className="">
                {data.length === 0 && <tr><td colSpan={4}>No existen productos actualmente</td></tr>}
                {
                  data.map((product) => (
                    <tr key={product.id} className="my-5">
                      <td className="th_2">{product.product_name}</td>
                      <td className="">{formatPrice(product.price)}</td>
                      <td className="">
                        <Link to={`/admin/productos/editar/${product.id}`}>Editar</Link>
                      </td>
                      <td className="">
                        <a className="text-red-500 hover:cursor-pointer" onClick={() => deleteProduct(product)}>Eliminar</a>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table