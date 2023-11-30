import Comment from "@models/comment"; // Assure-toi que le chemin vers le modèle Comment est correct
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { userId, projectId, content } = await request.json(); // Assure-toi que la structure de la requête JSON correspond à ce que tu attends

    try {
        await connectToDB();
        const newComment = new Comment({ user_id: userId, project_id: projectId, content });

        await newComment.save();
        return new Response(JSON.stringify(newComment), { status: 201 });
    } catch (error) {
        return new Response("Failed to create a new comment", { status: 500 });
    }
};
