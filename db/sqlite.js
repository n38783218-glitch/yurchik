import sqlite from 'sqlite3';
import { isEmpty } from '../utils';
export default class SqliteLinker {}

class SqliteLinker {
  constructor(filename) {
    this.filename = filename;
    this.db = null;
  }

  /*
  Является ассинхронным методом.
  Отвечает за физическое подключение к файлу БД.
  Создаёт объект базы данных и сохраняет его в this.db.
  Возвращает Promise, который разрешется при успехе.
  При ошибке подключения отклоняет Promise.
  */
  async connect() {
    this.db = new sqlite.Database(this.filename, function (err) {
      if (err) {
        console.log(JSON.stringify(err));
        return;
      }
      console.log(`Database is startet... on the ${this.filename}`);
    });
    return this.db;
  }

  /* 
  Выполняет SQL-запросы, изменяющие данные (INSERT, UPDATE).
  Принимает текст запроса и массив параметров.
  Обрабатывает вызов this.db.run в Promise.
  Возвращает changes (кол-во изменённых строк).
  */
  async run(sql, params = []) {
    const result = await new Promise(function (resolve, reject) {
      this.db.run(sql, params, function (err) {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }
        resolve({
          lastId: this.lastID,
          changes: this.changes,
        });
      });
    });

    return result;
  }
  /*
  Выполняет SQL-запрос для получения одной строки.
  Принимает текст запроса и параметры.
  Использует метод this.db.get для выборки.
  Оборачивает колбэк в Promise.
  Возвращает одну найденную строку или undefined.
  */
  async get(sql, params = []) {
    const result = await new Promise(function (resolve, reject) {
      this.db.get(sql, params, function (err, row) {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }
        resolve(row);
      });
    });
    return result;
  }
  /* 
  Выполняет SQL-запрос для выборки множества строк.
  Принимает SQL-запрос и массив параметров.
  Использует метод this.db.all для получения массива.
  Оборачивает вызов в Promise с обработкой ошибок.
  Возвращает массив всех найденных строк.
  */
  async all(sql, params = []) {
    const result = await new Promise(function (resolve, reject) {
      this.db.all(sql, params, function (err, row) {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }
        resolve(row);
      });
    });
    return result;
  }
  /*
  Ассинхронно закрывает соединение с базой данных.
  Оборачивает метод this.db.close в Promise.
  Принимает колбэк с возможной ошибкой.
  При ошибке выводит её в консоль и отклоняет Promise.
  При успехе просто разрешает Promise (ничего не возвращает).
  */
  async close() {
    return new Promise(function (resovle, reject) {
      this.db.close(function (err) {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }
        resolve();
      });
    });
  }
  createPlaceholders(arr) {
    return arr.map(() => '?').join(', ');
  }
  createSetBlock(properties) {
    const values = [];
    const block = Object.entries(properties)
      .map(([key, value]) => {
        if (isEmpty(value)) return null;
        values.push(value);
        return `${key} = '?'`;
      })
      .filter((p) => p !== null)
      .join(', ');
    return { block, values };
  }
}
