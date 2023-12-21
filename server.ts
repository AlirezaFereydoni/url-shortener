import app from './app';
import mongoose from 'mongoose';

mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log('Connected to MongoDB!'));

  

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on port ${process.env.PORT || 3000}`);
});
