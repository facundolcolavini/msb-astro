// Server endpoint for the register page using Astro

import type { APIRoute } from 'astro';

import { registerUser } from '../../src/db/auth/auth';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, password } = await request.json();
    
    // Validar que se proporcionen los datos necesarios
    if (!name || !email || !password) {
      return new Response(JSON.stringify({
        message: 'Nombre, correo electrónico y contraseña son requeridos',
        success : false,
        status : 400
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
        message: 'Usuario registrado correctamente',
        success : true,
        status : 201
      }), {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 201, // Código de respuesta para "Created"
      });
    }

    return new Response(JSON.stringify({
      message: 'El correo electrónico ya está en uso',
      success : false,
      status : 409
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
      success : false,
      status : 500
    }), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 500,
    });
  }
};
