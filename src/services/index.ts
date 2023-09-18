import axios from "axios";
import { APIURL } from "../settings";

export default axios.create({
  baseURL: APIURL,
  headers: {
    "Content-type": "application/json"
  },
});