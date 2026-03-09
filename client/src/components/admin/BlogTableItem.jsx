import toast from "react-hot-toast";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../hooks/useAppContext";

const BlogTableItem = ({ blog, fetchBlog, index }) => {
  const { title, createdAt } = blog;
  const blogDate = new Date(createdAt);

  const { axios } = useAppContext();

  const deleteBlogById = async () => {
    const confirm = window.confirm("Are you sure want to delete this blog?");
    if (!confirm) return;
    try {
      const { data } = await axios.delete("/api/blog/delete", { id: blog._id });
      if (data?.success) {
        toast.success(data.message);
        await fetchBlog();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.patch("/api/blog/toggle-publish", {
        id: blog._id,
      });
      if (data?.success) {
        toast.success(data.message);
        await fetchBlog();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <tr>
      <th className="px-2 py-4">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{blogDate.toDateString()}</td>
      <td className="px-2 py-4 max-sm:hidden">
        <p
          className={`${blog.isPublished ? "text-green-600" : "text-orange-700"}`}
        >
          {blog.isPublished ? "Published" : "Unpublished"}
        </p>
      </td>
      <td className="px-2 py-4 flex text-xs gap-3">
        <button
          onClick={togglePublish}
          className="border px-2 py-0.5 mt-1 rounded cursor-pointer"
        >
          {blog?.isPublished ? "Unpublish" : "Publish"}
        </button>
        <img
          onClick={deleteBlogById}
          src={assets.cross_icon}
          alt="crossIcon"
          className="w-8 hover:scale-110 transition-all cursor-pointer"
        />
      </td>
    </tr>
  );
};

export default BlogTableItem;
