// auth.ts
import { openDB } from '../setup.db';
import crypto from 'crypto';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  salt: string; // Add this line
}

const saltLength = 16;
const keyLength = 64;
const iterations = 10000;
const digest = 'sha512';

function generateSalt() {
  return crypto.randomBytes(saltLength).toString('hex');
}

function hashPassword(password: string, salt: string) {
  return new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(password, salt, iterations, keyLength, digest, (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey.toString('hex'));
    });
  });
}

export async function registerUser(name: string, email: string, password: string): Promise<User | null> {
  const db = await openDB();
  const existingUser = await db.get<User>('SELECT * FROM users WHERE email = ?', email);

  if (existingUser) {
    // El usuario ya existe
    return null;
  }

  const salt = generateSalt();
  const hashedPassword = await hashPassword(password, salt);

  const result = await db.run(
    'INSERT INTO users (name, email, password, salt) VALUES (?, ?, ?, ?)',
    name,
    email,
    hashedPassword,
    salt
  );

  const userId = result.lastID;
  const newUser = await db.get<User>('SELECT * FROM users WHERE id = ?', userId);

  return newUser || null;
}

export async function loginUser(email: string, password: string): Promise<User | null> {
  const db = await openDB();
  const user = await db.get<User>('SELECT id, name, email, password, salt FROM users WHERE email = ?', email);

  if (!user) {
    // El usuario no existe
    return null;
  }

  const hashedPassword = await hashPassword(password, user.salt);
  const passwordMatch = hashedPassword === user.password;

  if (passwordMatch) {
    // Contraseña correcta
    return user;
  }

  // Contraseña incorrecta
  return null;
}