import {app} from './app.js';
import { connectDB } from './src/db/index.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await connectDB();

    if (process.env.NODE_ENV !== "production") {
      app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
      });
    }
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
  }
};

startServer();

export default app; 

 
// import {app} from './app.js'
// import { connectDB } from './src/db/index.js'; 
// import dotenv from 'dotenv';

// dotenv.config();
// const PORT = process.env.PORT || 8080;
// connectDB()
//     .then(()=>{
//         app.listen(PORT,()=>{
//             console.log("Server listening to PORT ",PORT);
//         })
//     })
//     .catch((error)=>{
//         console.log(`MongoDB connection error: ${error}`)
//     })