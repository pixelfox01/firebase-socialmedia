import {
  addDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";
import { IPost } from "./home";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { useEffect, useState } from "react";

interface PostProps {
  post: IPost;
  deletePost: (post: IPost) => void;
}

interface ILike {
  userId: string;
}

export const Post = (props: PostProps) => {
  const { post, deletePost } = props;
  const [user] = useAuthState(auth);
  const [likes, setLikes] = useState<ILike[] | null>(null);

  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const userHasLiked = likes?.find((like) => like.userId === user?.uid);

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({
        userId: doc.data().userId,
      })) as ILike[]
    );
  };

  const addLike = async () => {
    await addDoc(likesRef, { userId: user?.uid, postId: post.id });
    if (user) {
      setLikes((prev) =>
        prev ? [...prev, { userId: user?.uid }] : [{ userId: user?.uid }]
      );
    }
  };

  const removeLike = async () => {
    const likeToRemoveQuery = query(
      likesRef,
      where("userId", "==", user?.uid),
      where("postId", "==", post.id)
    );

    const data = await getDocs(likeToRemoveQuery);
    const likeToRemoveId = data.docs[0].id;

    const likeToRemove = doc(db, "likes", likeToRemoveId);

    await deleteDoc(likeToRemove);

    if (user) {
      setLikes(
        (prev) => prev?.filter((like) => like.userId !== user?.uid) || null
      );
    }
  };

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div className="border border-slate-600 w-1/2 my-4 rounded-md p-4 min-w-[20rem]">
      {post.userId === user?.uid && (
        <div className="flex justify-end">
          <button onClick={() => deletePost({ ...post })}>&#10006;</button>
        </div>
      )}
      <h1 className="font-bold mb-4">{post.title}</h1>
      <p>{post.description}</p>
      <div className="flex justify-end mt-4">
        <p className="mx-4">- {post.username}</p>
      </div>
      <div className="mt-2">
        {!userHasLiked ? (
          <button
            className="rounded-2xl border border-slate-700 w-16 hover:bg-blue-600"
            onClick={addLike}
          >
            &#9825;
          </button>
        ) : (
          <button
            className="rounded-2xl border border-slate-700 w-16 hover:bg-blue-600 bg-blue-300"
            onClick={removeLike}
          >
            &#9829;
          </button>
        )}
        {likes && <p>{likes.length}</p>}
      </div>
    </div>
  );
};
