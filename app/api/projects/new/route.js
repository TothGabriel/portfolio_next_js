import Project from "@models/project";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  try {
    await connectToDB();

    // Extrayez les données du corps de la requête
    const { title, content_short, tags } = await request.json();
    // Créez une nouvelle instance du modèle de projet
    const newProject = new Project({
      title,
      content_short,
      tags,
      // Ajoutez d'autres champs si nécessaire
    });

    // Sauvegardez le nouveau projet dans la base de données
    await newProject.save();

    // Répondez avec le nouveau projet créé
    return new Response(JSON.stringify(newProject), { status: 201 });
  } catch (error) {
    console.error("Failed to create a new project:", error);
    return new Response("Failed to create a new project", { status: 500 });
  }
};
