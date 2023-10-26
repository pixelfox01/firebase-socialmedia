import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface FormData {
  title: string;
  description: string;
}

export const PostForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("Title is required!").min(5).max(100),
    description: yup
      .string()
      .required("Description cannot be empty!")
      .min(10)
      .max(500),
  });

  const { register, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");

  const onCreatePost = async (data: FormData) => {
    try {
      await addDoc(postsRef, {
        userId: user?.uid,
        username: user?.displayName,
        ...data,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="flex flex-col w-1/4 items-center justify-between h-full"
      onSubmit={handleSubmit((data: FormData) => onCreatePost(data))}
    >
      <label htmlFor="post-title" className="font-bold text-lg">
        Title
      </label>
      <input
        id="post-title"
        type="text"
        className="border-2 rounded-md my-3 w-full px-1.5 py-0.5 border-slate-900"
        placeholder="Your catchy title here..."
        {...register("title")}
      />
      <label
        htmlFor="post-description"
        className="text-lg font-bold px-1.5 py-0.5"
      >
        Description
      </label>
      <textarea
        id="post-description"
        className="resize-none px-1.5 py-0.5 border-2 border-slate-900 rounded-md my-3 h-full w-full"
        placeholder="Write your post here..."
        {...register("description")}
      ></textarea>
      <input
        type="submit"
        className="rounded-md bg-blue-500 text-white w-1/2 my-3 p-1 hover:bg-blue-600 cursor-pointer"
        value="Submit"
      />
    </form>
  );
};
