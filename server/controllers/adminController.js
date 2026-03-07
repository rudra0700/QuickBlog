import jwt from "jsonwebtoken";

export const adminController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.send({ success: false, message: "Credential Invalid" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.send({ success: true, token });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};
