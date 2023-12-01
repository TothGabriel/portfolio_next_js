import Image from 'next/image'
import {useState, useEffect} from 'react';

const CommentCard = ({comment}) => {

  const [user, setUser] = useState([]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/users/${comment.user_id}`);
      const data = await response.json();
      setUser(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <article className="w-full mb-4 border-b-2 border-b-slate-200 dark:border-b-slate-600">
      <div className="flex items-center mb-5">
        <Image width={40} height={40} className="me-4 rounded-full" src={user.image} alt=""/>
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
      <p className="mb-2 text-gray-500 dark:text-gray-400">
        {comment.content}
      </p>
    </article>
    // <hr>
  );
};

export default CommentCard;
