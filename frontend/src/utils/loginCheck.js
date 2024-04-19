import { getCookie } from "./cookie";

export function loginCheck() {
  let token = getCookie("auth-token");
  if (token) {
    return true;
  } else {
    return false;
  }
}

export function typeCheck() {
  let type = getCookie("type");
  if (type == "User") {
    return "User";
  } else if (type == "Company") {
    return "Company";
  } else if (type == "Institution") {
    return "Institution";
  } else {
    return "None";
  }
}