import express from 'express';
import mongoose from 'mongoose';

const app = express();

console.log(process.env);

mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log('Connected to MongoDB!'));

app.listen(process.env.PORT, () => {
  console.log('Example app listening on port 3000!');
});
