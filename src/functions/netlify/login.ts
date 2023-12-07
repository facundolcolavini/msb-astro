import type { APIGatewayEvent } from 'aws-lambda';
import { loginUser } from '../../db/auth/auth';
import type { Context } from '@netlify/functions';

export const handler = async (event:APIGatewayEvent, context: Context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { email, password } = JSON.parse(event.body as string);
    const user = await loginUser(email, password);

    if (user) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: 'Usuario logeado correctamente',
          data: user,
        }),
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ success: false, message: 'Invalid credentials' }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'An error occurred during login' }),
    };
  }
};