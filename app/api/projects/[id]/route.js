import Project from "@models/project";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const project = await Project.findById(params.id);
        if (!project) return new Response("Project Not Found", { status: 404 });

        console.log("Project details:", project); // Ajoutez cette ligne pour voir les détails dans les logs

        return new Response(JSON.stringify(project), { status: 200 });

    } catch (error) {
        console.error("Error fetching project details:", error); // Ajoutez cette ligne pour voir les erreurs dans les logs
        return new Response("Internal Server Error", { status: 500 });
    }
};

export const PATCH = async (request, { params }) => {
    try {
      await connectToDB();
  
      const { title, content_short, tags } = await request.json();
  
      // Vérifier si title, content_short et tags sont fournis
      if (!title || !content_short || !tags) {
        return new Response("Missing required fields", { status: 400 });
      }
  
      // Trouver le projet existant par ID
      const existingProject = await Project.findById(params.id);
  
      if (!existingProject) {
        return new Response("Project not found", { status: 404 });
      }
  
      // Mettre à jour le projet avec les nouvelles données
      existingProject.title = title;
      existingProject.content_short = content_short;
      existingProject.tags = tags;
  
      await existingProject.save();
  
      return new Response("Successfully updated the project", { status: 200 });
    } catch (error) {
      console.error("Error updating project:", error);
      return new Response("Internal Server Error", { status: 500 });
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
