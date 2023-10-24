export const CreatePost = () => {
  return (
    <div className="flex justify-center my-4 h-96">
      <form className="flex flex-col w-1/4 items-center justify-between">
        <label htmlFor="post-title" className="font-bold text-lg">
          Title
        </label>
        <input
          id="post-title"
          type="text"
          className="border-2 rounded-md my-3 w-full px-1.5 py-0.5 border-slate-900"
          placeholder="Your catchy title here..."
        />
        <label
          htmlFor="post-description"
          className="text-lg font-bold px-1.5 py-0.5"
        >
          Description
        </label>
        <textarea
          id="post-description"
          className=" border-2 border-slate-900 rounded-md my-3 h-full w-full"
          placeholder="Write your post here..."
        ></textarea>
        <input
          type="submit"
          className="rounded-md bg-blue-500 text-white w-1/2 my-3 p-1 hover:bg-blue-600"
          value="Submit"
        />
      </form>
    </div>
  );
};
