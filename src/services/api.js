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

  if (!product.id) {
    delete product.id;
  }

  if (!product.oldPrice) {
    product.oldPrice = 0.0
  }

  if (!product.newPrice) {
    product.newPrice = 0.0
  }

  if (!product.discount) {
    product.discount = 0;
  }


  try {
    const response = await api.post("produto/novo", product, {
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

export const updateProduct = async (product = {}) => {

  if (!product.oldPrice) {
    product.oldPrice = 0.0;
  }

  if (!product.newPrice) {
    product.newPrice = 0.0;
  }

  if (!product.discount) {
    product.discount = 0;
  }

  try {
    const response = await api.put(`produto/${product.id}`, product, {
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
