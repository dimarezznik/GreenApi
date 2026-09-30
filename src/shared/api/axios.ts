import axios from "axios";
import { env } from "../config/env";

export const axiosClient = axios.create({
  baseURL: env.greenApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
