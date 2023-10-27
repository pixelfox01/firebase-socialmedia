import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface IPost {
  id: string;
  title: string;
  description: string;
  userId: string;
  username: string;
}

export const Home = () => {
  const [user] = useAuthState(auth);
  const [postsList, setPostsList] = useState<IPost[] | null>(null);
  const postsRef = collection(db, "posts");

  const getPosts = async () => {
    try {
      const data = await getDocs(postsRef);
      setPostsList(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IPost[]
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="flex justify-center">
      {user !== null && (
        <div>
          <h1 className="text-3xl m-4 font-bold">
            Welcome {user?.displayName}
          </h1>
          <div className="flex flex-col items-center">
            {postsList?.map((post) => (
              <div key={post.id} className="border-2 rounded-md my-3 w-1/2">
                <h2 className="text-2xl font-bold">{post.title}</h2>
                <p className="text-lg">{post.description}</p>
                <p className="text-sm">Posted by {post.username}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
