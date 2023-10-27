import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { Post } from "./post";

export interface IPost {
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
            {postsList?.map((post) => <Post post={post} />)}
          </div>
        </div>
      )}
    </div>
  );
};
