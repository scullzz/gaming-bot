import * as fs from "fs";
import * as path from "path";

// Функция для получения файлов из директории
function getFiles(dir) {
  // Читаем содержимое директории
  const files = fs.readdirSync(dir);
  // Фильтруем только файлы (исключаем папки)
  return files.filter((file) => fs.statSync(path.join(dir, file)).isFile());
}

// Заданный путь (измените на нужный вам)
const directoryPath = "D:/projects/iGamingBot/frontend-iGamingBot/public";

// Получаем массив файлов
const files = getFiles(directoryPath);

// Выводим массив
console.log(files);
