// Netlify serverless function for the register page

import { registerUser } from '../db/auth/auth';

exports.handler = async function(event, context) {
  try {
    const { name, email, password } = JSON.parse(event.body);
    
    // Validar que se proporcionen los datos necesarios
    if (!name || !email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Nombre, correo electrónico y contraseña son requeridos',
          success : false,
          status : 400
        }),
      };
    }

    const newUser = await registerUser(name, email, password);

    if (newUser) {
      return {
        statusCode: 201,
        body: JSON.stringify({
          message: 'Usuario registrado correctamente',
          success : true,
          status : 201
        }),
      };
    }

    return {
      statusCode: 409,
      body: JSON.stringify({
        message: 'El correo electrónico ya está en uso',
        success : false,
        status : 409
      }),
    };
  } catch (error) {
    console.error('Error during registration:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error durante el registro',
        success : false,
        status : 500
      }),
    };
  }
};