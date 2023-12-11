// auth.ts
import { openDB } from '../setup.db';
import bcrypt from 'bcrypt';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

const saltRounds = 10;

export async function registerUser(name: string, email: string, password: string): Promise<User | null> {
  const db = await openDB();
  const existingUser = await db.get<User>('SELECT * FROM users WHERE email = ?', email);

  if (existingUser) {
    // El usuario ya existe
    return null;
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const result = await db.run(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    name,
    email,
    hashedPassword
  );

  const userId = result.lastID;
  const newUser = await db.get<User>('SELECT * FROM users WHERE id = ?', userId);

  return newUser || null;
}

export async function loginUser(email: string, password: string): Promise<User | null> {
  const db = await openDB();
  const user = await db.get<User>('SELECT * FROM users WHERE email = ?', email);

  if (!user) {
    // El usuario no existe
    return null;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    // Contraseña correcta
    return user;
  }

  // Contraseña incorrecta
  return null;
}