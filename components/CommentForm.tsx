import { useState } from "react";

const CommentForm = ({ project_id, session, setUpdate }) => {
  const [commentData, setCommentData] = useState({
    user_id: session?.user?.id,
    project_id: project_id || "",
    content: "",
    created_at: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCommentData({
      ...commentData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the current date and time
    const currentDate = new Date();
    // Format the date as a string (adjust the format as needed)
    // const formattedDate = currentDate.toISOString();
    try {
      const response = await fetch(`/api/comments/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...commentData,
          created_at: currentDate,
        }),
      });

      if (response.ok) {
        // La requête a réussi
        const newComment = await response.json();
        console.log("Comment submitted:", newComment);

        // Réinitialise les champs du formulaire après la soumission
        setCommentData({
          user_id: session?.user?.id,
          project_id: project_id || "",
          content: "",
          created_at: "",
        });
        
        // Appelle la fonction de mise à jour pour déclencher la mise à jour dans CommentFeed
        setUpdate((prevUpdate) => !prevUpdate);

      } else {
        // La requête a échoué
        console.error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
              <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                <label htmlFor="comment" className="sr-only">
                  Votre commentaire
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={commentData.content}
                  onChange={handleInputChange}
                  required
                  className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                  placeholder="Laisser un commentaire..."
                ></textarea>
              </div>
              <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                <button
                  type="submit"
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                >
                  Publier
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CommentForm;
