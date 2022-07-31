import axios from "axios";
require("dotenv").config();

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: process.env.API,
});

// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = ;

export default instance;
