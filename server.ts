import app from "./app";
import mongoose from "mongoose";

const PORT = Number(process.env.PORT) || 3000;

mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("Connected to MongoDB!"));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on port ${PORT}`);
});
