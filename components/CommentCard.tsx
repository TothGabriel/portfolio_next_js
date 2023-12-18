// CommentCard.jsx
import Image from "next/image";
import { useState, useEffect } from "react";

const CommentCard = ({ comment, setUpdate, session, isAdmin }) => {
  const [user, setUser] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/users/${comment.user_id}`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(comment.content);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`/api/comments/${comment._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });

      if (response.ok) {
        setIsEditing(false);
        setUpdate(true); // Mettez à jour directement
        // setUpdate((prevUpdate) => !prevUpdate);
      } else {
        console.error("Error updating comment:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/comments/${comment._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUpdate(true); // Mettez à jour directement
        // setUpdate((prevUpdate) => !prevUpdate);
      } else {
        console.error("Error deleting comment:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <article className="w-full mb-4 border-b-2 border-b-slate-200 dark:border-b-slate-600">
      <div className="flex items-center mb-5">
        <Image
          width={40}
          height={40}
          className="me-4 rounded-full"
          src={user.image}
          alt=""
        />
        <div className="font-medium dark:text-white">
          <p>
            {user.username}
            <time
              dateTime={comment.created_at}
              className="block text-sm text-gray-500 dark:text-gray-400"
            >
              {comment.created_at}
            </time>
          </p>
        </div>
      </div>
      {isEditing ? (
        <>
          <textarea
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className="flex">
            <button
              className="mr-2 font-inter text-sm green_gradient cursor-pointer"
              onClick={handleSaveEdit}
            >
              Enregistrer
            </button>
            <button
              className="font-inter text-sm red_gradient cursor-pointer"
              onClick={handleCancelEdit}
            >
              Annuler
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="mb-2 text-gray-500 dark:text-gray-400">{comment.content}</p>
          <div className="flex">
            {comment.user_id === user?._id && (
              <>
                <p
                  className="mr-2 font-inter text-sm green_gradient cursor-pointer"
                  onClick={handleEdit}
                >
                  Modifier
                </p>
                <p
                  className="font-inter text-sm red_gradient cursor-pointer"
                  onClick={handleDelete}
                >
                  Supprimer
                </p>
              </>
            )}
          </div>
        </>
      )}
    </article>
  );
};

export default CommentCard;
