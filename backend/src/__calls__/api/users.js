const axios = require("axios");

const api = axios.create({ baseURL: "http://127.0.0.1:3000/api/users" });

exports.createAccount = async function (data = {}) {
  try {
    const response = await api.post("/", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

exports.logIntoAccount = async function (data = {}) {
  try {
    const response = await api.post("/login", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

exports.resetPassword = async function (data = {}) {
  try {
    const response = await api.patch("/reset", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

exports.readProfile = async function (token = "") {
  try {
    const response = await api.get("/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

exports.updateProfile = async function (data = {}, token = "") {
  try {
    const response = await api.patch("/profile", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
