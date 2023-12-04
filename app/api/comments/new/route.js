import Comment from "@models/comment"; // Assure-toi que le chemin vers le modèle Comment est correct
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { user_id, project_id, content, created_at } = await request.json(); // Assure-toi que la structure de la requête JSON correspond à ce que tu attends

  try {
    await connectToDB();
    const newComment = new Comment({
      user_id,
      project_id,
      content,
      created_at,
    });

    await newComment.save();
    return new Response(JSON.stringify(newComment), { status: 201 });
  } catch (error) {
    console.error("Failed to create a new comment:", error);
    return new Response(`Failed to create a new comment: ${error.message}`, {
      status: 500,
    });
  }
};
