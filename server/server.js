import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";

await connectDB();
const app = express();

// MiddleWares
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send({ message: "Quick Blog is live now" });
});


app.listen(PORT, () =>{
    console.log(`Server is running on ${PORT}`);
    
})