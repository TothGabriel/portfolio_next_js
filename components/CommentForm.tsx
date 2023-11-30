import { useState } from "react";

const CommentForm = ({ projectId, session }) => {
  const [commentData, setCommentData] = useState({
    userId: session?.user?.id,
    userName: session?.user?.name || "Anonyme", // Remplace-le par la logique d'authentification de ton application
    projectId: projectId || "",
    content: "",
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

    try {
      const response = await fetch(`/api/comments/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (response.ok) {
        // La requête a réussi
        const newComment = await response.json();
        console.log("Comment submitted:", newComment);

        // Réinitialise les champs du formulaire après la soumission
        setCommentData({
          userId: session?.user?.id,
          userName: session?.user?.name || "Anonyme", // Remplace-le par la logique d'authentification de ton application
          projectId: projectId || "",
          content: "",
        });
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
                  Your comment
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={commentData.content}
                  onChange={handleInputChange}
                  required
                  className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                  placeholder="Write a comment..."
                ></textarea>
              </div>
              <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                <button
                  type="submit"
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                >
                  Post comment
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
