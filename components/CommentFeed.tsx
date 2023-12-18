// CommentFeed.jsx
import CommentCard from "@components/CommentCard";
import CommentForm from "@components/CommentForm";
import { useState, useEffect } from "react";

const CommentFeed = ({ session, isAdmin, comments: initialComments }) => {
  const [comments, setComments] = useState([]);
  const [update, setUpdate] = useState(false); // État d'update

  const fetchComments = async () => {
    try {
      const response = await fetch("/api/comments");
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    if (!initialComments || initialComments.length === 0 || update) {
      fetchComments();
      setUpdate(false); // Réinitialiser l'état après la mise à jour
    } else {
      setComments(initialComments);
    }
  }, [initialComments, update]);

  return (
    <>
      <section className="w-full flex justify-center py-5">
        <div className="container">
          <div className="flex flex-wrap">
            {comments.map((comment) => (
              <CommentCard
                key={comment._id}
                comment={comment}
                session={session}
                isAdmin={isAdmin}
                setUpdate={setUpdate}
              />
            ))}
          </div>
        </div>
      </section>
      {/* <CommentForm setUpdate={setUpdate} /> */}
      {session?.user?.id ? (
        <>
          <CommentForm session={session} setUpdate={setUpdate} />
        </>
      ) : (
        <>
        <div>test</div>
          {/* {providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => {
                  signIn(provider.id);
                }}
                className="btn btn-1 me-3"
              >
                Se connecter
              </button>
            ))} */}
        </>
      )}
    </>
  );
};

export default CommentFeed;
