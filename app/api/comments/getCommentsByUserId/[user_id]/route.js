// pages/api/comments/getCommentsByUserId/[user_id].js
import Comment from "@models/comment";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const comments = await Comment.find({ user_id: params.user_id });

    if (!comments) {
      return new Response("Comments not found", { status: 404 });
    }

    return new Response(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    console.error("Error fetching comments by user ID:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
