import express from 'express';
import {    addBlog,
            getAllBlogs,
            getBlogById,
            deleteBlog,
            togglePublish,
            generateContent,
} from '../controllers/blogController.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const blogRouter = express.Router();
blogRouter.get('/', getAllBlogs);
blogRouter.get('/admin',verifyToken, getAllBlogs);
blogRouter.post('/',verifyToken, upload.single("file"), addBlog);
blogRouter.get('/:id', getBlogById);
blogRouter.delete('/:id',verifyToken, deleteBlog);
blogRouter.post('/toggle', verifyToken, togglePublish);
blogRouter.post('/generate',verifyToken,generateContent)

export default blogRouter;