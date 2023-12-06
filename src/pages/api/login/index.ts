// Server endpoint for the login page using Astro

import type { APIRoute } from 'astro';
import { loginUser } from '../../../db/auth/auth';


export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, password } = await request.json();
    const user = await loginUser(email, password);

    if (user) {
      return new Response(JSON.stringify({
        success : true,
        status : 200,
        message: 'Usuario logeado correctamente',
        data: user,
      }), {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
      });
    }

    return new Response(JSON.stringify({
      success : false,
      status : 401,
      message: 'Usuario o contraseña incorrectos',
    }), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 401,
    });
  } catch (error) {
    console.error('Error during login:', error);

    return new Response(JSON.stringify({
      success : false,
      status : 500,
      message: 'Error durante el inicio de sesión',
    }), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 500,
    });
  }
};
