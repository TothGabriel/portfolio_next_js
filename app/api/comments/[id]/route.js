import Comment from "@models/comment";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const comments = await Comment.find({ _id: params.id });
    if (!comments) return new Response("Comments Not Found", { status: 404 });

    return new Response(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error); // Ajoutez cette ligne pour voir les erreurs dans les logs
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  try {
    await connectToDB();

    const { content } = await request.json();
    // Vérifier si content est fourni
    if (!content) {
      return new Response("Missing required fields", { status: 400 });
    }

    // Trouver le commentaire existant par ID
    const existingComment = await Comment.findById(params.id);

    console.log("Comment ID:", params.id);
    console.log("Existing Comment:", existingComment);

    if (!existingComment) {
      return new Response("Comment not found", { status: 404 });
    }

    // Mettre à jour le commentaire avec les nouvelles données
    existingComment.content = content;

    await existingComment.save();

    return new Response("Successfully updated the comment", { status: 200 });
  } catch (error) {
    console.error("Error updating comment:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};


export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the comment by ID and remove it
    const deletedComment = await Comment.findByIdAndDelete(params.id);

    if (!deletedComment) {
      return new Response("Comment not found", { status: 404 });
    }

    return new Response("Comment deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return new Response("Error deleting comment", { status: 500 });
  }
};

