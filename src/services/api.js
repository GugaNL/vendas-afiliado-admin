import axios from "axios";
import { baseURL } from "../constants";

// var config = {
//   headers: { "Access-Control-Allow-Origin": "*" },
// };

export const api = axios.create({
  baseURL,
});

const token = localStorage.getItem("@vendas-afiliados-admin:token");

//Usuário
export const loginUser = async (email, password) => {
  try {
    const response = await api.post("usuario/login", {
      login: email,
      password,
    });
    return response;
  } catch (error) {
    const { response: { data = [] } = "" } = error;
    return data[0];
  }
};

//Produto
export const newProduct = async (product = {}) => {
  const formData = new FormData();
  const { productImage = [] } = product;

  formData.append("title", product?.title);
  formData.append("brand", product?.brand);
  formData.append("store", product?.store);
  formData.append("linkAfiliate", product?.linkAfiliate);
  formData.append("uploadedImage", productImage[0]);
  formData.append("categoryId", product?.categoryId);
  formData.append("oldPrice", product?.oldPrice);
  formData.append("newPrice", product?.newPrice);
  formData.append("discount", product?.discount);
  formData.append("obs1", product?.obs1);
  formData.append("obs2", product?.obs2);

  try {
    const response = await api.post("produto/novo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        token,
      },
    });

    return response;
  } catch (error) {
    const { response: { data = [], status = "" } = "" } = error;
    if (status === 401) {
      return status;
    }
    return data[0];
  }
};

export const updateProduct = async (product = {}) => {
  const formData = new FormData();
  const { productImage = [] } = product;

  formData.append("title", product?.title);
  formData.append("brand", product?.brand);
  formData.append("store", product?.store);
  formData.append("linkAfiliate", product?.linkAfiliate);
  if (productImage.length > 0) {
    formData.append("uploadedImage", productImage[0]);
  }
  formData.append("categoryId", product?.categoryId);
  formData.append("oldPrice", product?.oldPrice);
  formData.append("newPrice", product?.newPrice);
  formData.append("discount", product?.discount);
  formData.append("obs1", product?.obs1);
  formData.append("obs2", product?.obs2);

  try {
    const response = await api.put(`produto/${product.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        token,
      },
    });

    return response;
  } catch (error) {
    const { response: { data = [], status = "" } = "" } = error;
    if (status === 401) {
      return status;
    }
    return data[0];
  }
};

export const listProducts = async (page, limit) => {
  try {
    const response = await api.get(`produto/lista-leve?page=${page}&limit=${limit}`);
    return response;
  } catch (error) {
    const { response: { data = [] } = "" } = error;
    return data[0];
  }
};

export const findProduct = async (id) => {
  try {
    const response = await api.get(`produto/${id}`);
    return response;
  } catch (error) {
    const { response: { data = [] } = "" } = error;
    return data[0];
  }
};

export const removeProduct = async (id) => {
  try {
    const response = await api.delete(`produto/${id}`, {
      headers: {
        token,
      },
    });
    return response;
  } catch (error) {
    const { response: { data = [], status = "" } = "" } = error;
    if (status === 401) {
      return status;
    }
    return data[0];
  }
};

//Categoria
export const createCategory = async (category) => {
  try {
    const response = await api.post("categoria/novo", {
      name: category.name
    }, {
      headers: {
        token,
      },
    });

    return response;
  } catch (error) {
    const { response: { data = [] } = "", status = "" } = error;
    if (status === 401) {
      return status;
    }
    return data[0];
  }
};

export const listCategories = async () => {
  try {
    const response = await api.get("categoria/lista");
    return response;
  } catch (error) {
    const { response: { data = [], status = "" } = "" } = error;
    if (status === 401) {
      return status;
    }
    return data[0];
  }
};

export const findCategory = async (id) => {
  try {
    const response = await api.get(`categoria/${id}`);
    return response;
  } catch (error) {
    const { response: { data = [] } = "" } = error;
    return data[0];
  }
};

export const updateCategory = async (category) => {
  try {
    const response = await api.put(
      `categoria/${category.id}`,
      {
        name: category.name,
      },
      {
        headers: {
          token,
        },
      }
    );
    return response;
  } catch (error) {
    const { response: { data = [], status = "" } = "" } = error;
    if (status === 401) {
      return status;
    }
    return data[0];
  }
};

export const removeCategory = async (categoryId) => {
  try {
    const response = await api.delete(`categoria/${categoryId}`, {
      headers: {
        token,
      },
    });
    return response;
  } catch (error) {
    const { response: { data = [], status = "" } = "" } = error;
    if (status === 401) {
      return status;
    }
    return data[0];
  }
};
