import { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../hooks/useAppContext";
import toast from "react-hot-toast";
import { parse } from "marked";
import { useLocation } from "react-router";

const AddBlog = () => {
  const location = useLocation();
  const editingBlog = location?.state?.blog;
  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("StartUp");
  const [isPublished, setIsPublished] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const generateContent = async () => {
    if (!title) return toast.error("Please Enter a Title");
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/blog/generate", {
        prompt: title,
      });
      if (data?.success) {
        quillRef.current.root.innerHTML = parse(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsAdding(true);

      const blogData = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
      };

      if (editingBlog) {
        //  UPDATE
        const { data } = await axios.patch("/api/blog/update-blog", {
          id: editingBlog._id,
          ...blogData,
        });

        if (data?.success) toast.success("Blog Updated");
      } else {
        // ADD
        const formData = new FormData();
        formData.append("blog", JSON.stringify(blogData));
        formData.append("image", image);
        const { data } = await axios.post("/api/blog/add", formData);

        if (data?.success) {
          toast.success(data.message);
          setImage(false);
          setTitle("");
          setSubTitle("");
          quillRef.current.root.innerHTML = "";
          setCategory("StartUp");
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    // initiate quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  useEffect(() => {
    if (editingBlog) {
      setTitle(editingBlog.title);
      setSubTitle(editingBlog.subTitle);
      setCategory(editingBlog.category);
      setIsPublished(editingBlog.isPublished);

      if (quillRef.current) {
        quillRef.current.root.innerHTML = editingBlog.description;
      }
    }
  }, [editingBlog]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-whtie w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        <p>Upload Thumbnail</p>
        <label htmlFor="image">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : editingBlog
                  ? editingBlog.image
                  : assets.upload_area
            }
            alt="uploadArea"
            className="mt-2 h-16 rounded cursor-pointer"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required={!editingBlog}
          />
        </label>
        <p>Blog Title</p>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
        />

        <p>Sub Title</p>
        <input
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
        />

        <p>Blog Description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef}></div>
          {isLoading && (
            <div className="absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center mt-2 bg-black/10">
              <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin"></div>
            </div>
          )}
          <button
            disabled={isLoading}
            className={`absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer ${isLoading ?? "bg-red-600"}`}
            onClick={generateContent}
            type="button"
          >
            Generate With AI
          </button>
        </div>
        <p className="mt-4">Blog Category</p>
        <select
           value={category}
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          className="mt-2 px-3 py-2 border border-gray-300 text-gray-500 outline-none rounded"
        >
          <option value="">Select Category</option>
          {blogCategories.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>

        <div className="flex gap-2 mt-4">
          <p>Publish now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className="scale-125 cursor-pointer"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>
        <button
          disabled={isAdding}
          className="mt-8 w-40 h-10 bg-blue-600 text-white rounded cursor-pointer text-sm"
        >
          {isAdding
            ? "processing..."
            : editingBlog
              ? "Update Blog"
              : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
