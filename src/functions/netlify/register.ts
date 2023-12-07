
import type { Context, Handler } from '@netlify/functions';
import { registerUser } from '../../db/auth/auth';
import type { APIGatewayEvent } from 'aws-lambda';


export const handler = async (event:APIGatewayEvent, context: Context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { name, email, password } = JSON.parse(event.body as string);
  const user = await registerUser(name, email, password);

  if (user) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Usuario registrado correctamente',
        data: user,
      }),
    };
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: 'Registration failed' }),
    };
  }
};