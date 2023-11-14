// C:\Users\gabt7\Desktop\portfolio_next_js\app\api\users\[id]\route.js
import { connectToDB } from '@utils/database';
import User from '@models/user';

// Fonction pour la méthode GET
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const userData = await User.findById(params.id);

    if (!userData) {
      return new Response('User not found', { status: 404 });
    }

    return new Response(JSON.stringify(userData), { status: 200 });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

// Fonction pour la méthode POST
export const POST = async (request) => {
  // Logique pour gérer la méthode POST
};

// Fonction pour la méthode PUT
export const PUT = async (request) => {
  // Logique pour gérer la méthode PUT
};

// Fonction pour la méthode DELETE
export const DELETE = async (request) => {
  // Logique pour gérer la méthode DELETE
};
