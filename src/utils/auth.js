import { serverConfig } from "../const/serverConfig";
import axios from "axios";
export default class Auth {
  static saveToken(token) {
    window.localStorage.setItem("token", token);
  }

  static removeToken() {
    window.localStorage.removeItem("token");
  }

  static async refreshToken() {
    try {
      const refreshToken = window.localStorage.getItem('refresh_token')
      const refreshRes = await axios.post(`${serverConfig.server}/api/auth/refresh`, {
        refresh_token: refreshToken,
      });
      const newToken = refreshRes?.data?.access_token;
      if (!newToken) {
        return false;
      }
      this.saveToken(newToken);
      return true;
    } catch (e) {
      this.removeToken();
      window.location.href = "/login";
      window.localStorage.clear();
    }
  }
}
