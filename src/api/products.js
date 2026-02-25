import axios from "axios";

const API = "https://artpour.onrender.com/api/products";

export const getProducts = () => axios.get(API);
export const getProductById = (id) => axios.get(`${API}/${id}`);