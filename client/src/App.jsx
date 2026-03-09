import { Route, Routes } from "react-router";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import Layout from "./pages/admin/Layout";
import AddBlog from "./pages/admin/AddBlog";
import Comments from "./pages/admin/Comments";
import ListBlog from "./pages/admin/ListBlog";
import Dashboard from "./pages/admin/Dashboard";
import Login from "./components/admin/Login";
import "quill/dist/quill.snow.css";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./hooks/useAppContext";

const App = () => {
  const { token } = useAppContext();
  return (
    <div>
      
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/admin" element={token ? <Layout /> : <Login />}>
            <Route index element={<Dashboard />} />
            <Route path="addblog" element={<AddBlog />} />
            <Route path="comments" element={<Comments />} />
            <Route path="listblog" element={<ListBlog />} />
          </Route>
        </Routes>
    </div>
  );
};

export default App;
