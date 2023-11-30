import Comment from "@models/comment";
import { connectToDB } from "@utils/database";



export const GET = async (request) => {
    try {
        await connectToDB()
        console.log('in');
        const comments = await Comment.find({})
        return new Response(JSON.stringify(comments), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all comments", { status: 500 })
    }
} 