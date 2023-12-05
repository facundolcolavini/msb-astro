// Server endpoint for the register page using Astro

import type { APIRoute } from 'astro';
import { registerUser } from '../../db/auth/auth';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, password } = await request.json();
    
    // Validar que se proporcionen los datos necesarios
    if (!name || !email || !password) {
      return new Response(JSON.stringify({
        message: 'Nombre, correo electrónico y contraseña son requeridos',
      }), {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 400,
      });
    }

    const newUser = await registerUser(name, email, password);

    if (newUser) {
      return new Response(JSON.stringify({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        message: 'Usuario registrado correctamente',
      }), {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 201, // Código de respuesta para "Created"
      });
    }

    return new Response(JSON.stringify({
      message: 'El correo electrónico ya está en uso',
    }), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 409, // Código de respuesta para "Conflict"
    });
  } catch (error) {
    console.error('Error during registration:', error);

    return new Response(JSON.stringify({
      message: 'Error durante el registro',
    }), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 500,
    });
  }
};
