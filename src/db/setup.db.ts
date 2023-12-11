import sqlite3 from 'sqlite3';
import { open, Database as SqliteDatabase } from 'sqlite';

let instance: SqliteDatabase | null = null;

export async function openDB(): Promise<SqliteDatabase> {
  if (!instance) {
    instance = await open({
      filename: './src/db/database.db',
      driver: sqlite3.Database,
    });
  }
  return instance;
}

export async function initializeDB(): Promise<SqliteDatabase> {
  const db = await openDB();
  // Aquí puedes ejecutar consultas para crear tablas si no existen
  await db.exec(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      salt TEXT
    )`
  );

  await db.exec(
    `CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      house_id INTEGER,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )`
  );
  return db;
}
export { instance as db };
