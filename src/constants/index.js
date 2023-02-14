//Server
export const baseURL = "http://localhost:5000/api/";

//Pages
export const PAGE_LIST_PRODUCTS = '/lista-produtos';
export const PAGE_NEW_PRODUCT = '/novo-produto';
export const PAGE_LOGIN = '/';

export const statusType = [
  { name: "livre", title: "Livre"},
  { name: "comprado", title: "Comprado"},
  { name: "reservado", title: "Reservado"},
  { name: "cancelado", title: "Cancelado"}
]

export const ImageTypeRegex = /image\/(png|jpg|jpeg)/gm;
