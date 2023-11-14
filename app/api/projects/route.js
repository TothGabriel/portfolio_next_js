import Project from "@models/project";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const projects = await Project.find({})
        console.log(projects)
        return new Response(JSON.stringify(projects), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all projects", { status: 500 })
    }
} 