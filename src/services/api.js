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

  formData.append("titulo", product?.title);
  formData.append("brand", product?.brand);
  formData.append("store", product?.store);
  formData.append("linkAfiliate", product?.linkAfiliate);
  formData.append("totalBilhetes", prizeDraw.totalBilhetes);
  formData.append("valorBilhete", prizeDraw.valorBilhete);
  formData.append("sorteioImage", sorteioImages[i]);


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