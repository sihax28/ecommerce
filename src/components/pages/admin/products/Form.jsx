import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../../../constants/env";
import { token } from "../../../../helpers/auth";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../atoms/Loader";

const Form = () => {
  const nav = useNavigate();
  const [error, setError] = useState();
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState();

  useEffect(() => {
    if (params?.id) {
      setLoading(true);
      axios
        .get(`${API_URL}/public/products/${params.id}`)
        .then((resp) => {
          setProduct(resp.data.data);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      product_name: e.target.productName.value,
      price: Number(e.target.price.value),
      images: [e.target.image.value],
      description: e.target.description.value,
      features: {
        color: e.target.color.value,
      },
    };

    if (!params.id) {
      axios
        .post(`${API_URL}/admin/products`, data, {
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        })
        .then(() => {
          nav("/admin/productos");
        })
        .catch((err) => {
          setError(err);
        });
    } else {
      axios
        .put(`${API_URL}/admin/products/${params.id}`, data, {
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        })
        .then(() => {
          nav("/admin/productos");
        })
        .catch((err) => {
          setError(err);
        });
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-row justify-center bg-gray-100 p-10 gap-x-2">
      <div className="bg-white shadow-lg rounded-2xl px-10 py-10 w-1/2">
        <h1 className="text-2xl font-semibold mb-5 flex justify-center">
          {`${params.id ? "Editar" : "Crear"}`} producto
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-2 justify-center"
        >
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              className=""
              name="productName"
              defaultValue={product && product.product_name}
              placeholder="Nombre"
              required
            />
            <input
              type="text"
              name="color"
              className=""
              defaultValue={product && product.color}
              placeholder="color"
              required
            />
            <input
              type="number"
              className=""
              name="price"
              defaultValue={product && product.price}
              placeholder="Precio"
              required
            />
            <input
              type="url"
              name="image"
              className="col-span-3"
              defaultValue={product && product.images}
              placeholder="Imagen url"
              required
            />
          </div>
          <textarea
            name="description"
            className=""
            id=""
            rows="10"
            defaultValue={product && product.description}
            placeholder="Descripción"
          />
          <div className="flex justify-center pt-5">
            <button
              type="submit"
              className="btn_primary transition ease-in-out duration-1000 hover:scale-105"
            >
              Crear Producto
            </button>
          </div>
          {error ? (
            <div className="alert_error">{error && error?.message}</div>
          ) : (
            <div></div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;
