import express from 'express';
import {requireSignIn,isAdmin} from '../middlewares/authMiddleware.js';
import { categoryController, createCategoryController, deleteSingleCategory, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js';

const router=express.Router();


//routes



//create category
router.post('/create-category', requireSignIn,isAdmin,createCategoryController)


//update category

router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)
export default router;


//show all categories


router.get('/get-category',categoryController);


//single cateogry

router.get('/single-category/:slug',singleCategoryController);


//delete category

router.delete("/delete-catgory/:id",requireSignIn,isAdmin,deleteSingleCategory);