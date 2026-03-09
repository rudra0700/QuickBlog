import { useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router";

import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");

  const value = {
    axios,
    navigate,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
  };

  const fetchBlogs = async () => {
    try {
      const {data} = await axios.get("/api/blog/all");
     
      data?.success
        ? setBlogs(data?.blogs)
        : toast(data.message);
    } catch (error) {
      toast.error(error.message);
    }
    console.log("testing");
  };

  console.log(blogs);


  useEffect(() => {
    fetchBlogs();
    const token = localStorage.getItem("token");
    if(token){
        setToken(token);
        axios.defaults.headers.common["Authorization"] = `${token}`
    }
  }, []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
