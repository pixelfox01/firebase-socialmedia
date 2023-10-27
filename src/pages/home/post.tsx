import { IPost } from "./home";

interface PostProps {
  post: IPost;
}

export const Post = (props: PostProps) => {
  return (
    <div className="border border-slate-600 w-1/2 my-4 rounded-md py-4">
      <h1 className="font-bold mb-4">{props.post.title}</h1>
      <p>{props.post.description}</p>
      <div className="flex justify-end mt-4">
        <p className="mx-4">- {props.post.username}</p>
      </div>
    </div>
  );
};
