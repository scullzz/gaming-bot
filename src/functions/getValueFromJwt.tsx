import { jwtDecode } from "jwt-decode";

const env = "LOCAL";
interface DecodedToken {
  [key: string]: any;
}
export function getValueFromJWT(key: string): string {
  const cookieString = document.cookie;
  if (env == "LOCAL") {
    if (key == "NameId") return "272";
    if (key == "Name") return "Peter";
  }
  function getCookieValue(cookieString: string, name: string): string {
    const value = `; ${cookieString}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || "";
    return "";
  }

  // Извлекаем JWT токен из куки
  const token = getCookieValue(cookieString, "auth");
  if (!token) {
    console.error("JWT токен не найден в куки.");
    return "";
  }

  try {
    // Декодируем токен
    const decoded: DecodedToken = jwtDecode(token);

    // Возвращаем значение нужного ключа из payload
    return decoded[key] || "";
  } catch (error) {
    console.error("Ошибка при декодировании JWT токена:", error);
    return "";
  }
}

const createSetter = (prop: string) => () => getValueFromJWT(prop);
export const getNameId = createSetter("NameId");
export const getFirstName = createSetter("Name");
