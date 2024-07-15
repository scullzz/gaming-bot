import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  [key: string]: any;
}
export function getValueFromJWT(key: string): string | null {
  const cookieString = document.cookie;
  function getCookieValue(cookieString: string, name: string): string | null {
    const value = `; ${cookieString}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  }

  // Извлекаем JWT токен из куки
  const token = getCookieValue(cookieString, "auth");
  if (!token) {
    console.error("JWT токен не найден в куки.");
    return null;
  }

  try {
    // Декодируем токен
    const decoded: DecodedToken = jwtDecode(token);

    // Возвращаем значение нужного ключа из payload
    return decoded[key] || null;
  } catch (error) {
    console.error("Ошибка при декодировании JWT токена:", error);
    return null;
  }
}
