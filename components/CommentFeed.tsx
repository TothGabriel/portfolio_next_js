import CommentCard from "@components/CommentCard";
import { useState, useEffect } from "react";

const CommentFeed = () => {
  // const { data: session } = useSession();
  // const [isAdmin, setIsAdmin] = useState(false);

  const [allComments, setAllComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await fetch("/api/comments");
      const data = await response.json();
      setAllComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <section className="w-full flex justify-center py-5">
      <div className="container">
        <div className="flex flex-wrap">
          {allComments.map((comment) => (
            <CommentCard key={comment._id} comment={comment} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommentFeed;
