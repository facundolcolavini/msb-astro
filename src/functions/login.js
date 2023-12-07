// Netlify serverless function for the login page

import { loginUser } from '../db/auth/auth';

exports.handler = async function(event, context) {
  try {
    const { email, password } = JSON.parse(event.body);
    const user = await loginUser(email, password);
    if (user) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          status: 200,
          message: 'Usuario logeado correctamente',
          data: user,
        }),
      };
    }

    return {
      statusCode: 401,
      body: JSON.stringify({
        success: false,
        status: 401,
        message: 'Usuario o contraseña incorrectos',
      }),
    };
  } catch (error) {
    console.error('Error during login:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        status: 500,
        message: 'Error durante el inicio de sesión',
      }),
    };
  }
};