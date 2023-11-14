import Project from "@models/project";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const project = await Project.findById(params.id).populate("creator")
        if (!project) return new Response("Project Not Found", { status: 404 });

        return new Response(JSON.stringify(project), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { title, content_short, tags } = await request.json();

    try {
        await connectToDB();

        // Find the existing project by ID
        const existingProject = await Project.findById(params.id);

        if (!existingProject) {
            return new Response("Project not found", { status: 404 });
        }

        // Update the project with new data
        existingProject.title = title;
        existingProject.content_short = content_short;
        existingProject.tags = tags;

        await existingProject.save();

        return new Response("Successfully updated the Projects", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Project", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the project by ID and remove it
        await Project.findByIdAndRemove(params.id);

        return new Response("Project deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting project", { status: 500 });
    }
};
