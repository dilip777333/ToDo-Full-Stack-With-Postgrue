import axios from "axios";

/* =======================
   AXIOS INSTANCE
======================= */

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =======================
   SIMPLE REQUEST WRAPPER
======================= */

const request = {
  get: async (url, params) => {
    const response = await API.get(url, { params });
    return response.data;
  },

  post: async (url, data) => {
    const response = await API.post(url, data);
    return response.data;
  },

  put: async (url, data) => {
    const response = await API.put(url, data);
    return response.data;
  },

  delete: async (url, config) => {
    const response = await API.delete(url, config);
    return response.data;
  },
};

/* =======================
   TODO SERVICE
======================= */

const TodoService = {
  getAll: () => {
    return request.get("/todos");
  },

  create: (payload) => {
    return request.post("/todos", payload);
  },

  update: (id, payload) => {
    return request.put(`/todos/${id}`, payload);
  },

  complete: (id) => {
    return request.post(`/todos/${id}/complete`);
  },

  delete: (id) => {
    return request.delete(`/todos/${id}`);
  },
};

export default TodoService;
