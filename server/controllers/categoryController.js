import slugify from 'slugify';
import CategoryModel from '../models/CategoryModel.js'

//create category controller

export const createCategoryController=async(req,res)=>{

    try {
        const {name}=req.body;
        if(!name){
            return res.status(401).send({
                success:false,
                message:"name is requires"
            })



        }

        //existing

        const existingCategory=await CategoryModel.findOne({name}); 

        if(existingCategory){
            return res.status(401).send({
                success:false,
                message:"category already exits"
            })
        }

        const category= await new CategoryModel({name,slug:slugify(name)}).save();

        res.status(201).send({
            success:true,
            message:"new category added",
           category
        })
    } catch (error) {
        console.log(error)
     res.status(500).send({
            success:false,
            error,
            message:"error in category"
        })
    }

}


// updateCategoryController


export const updateCategoryController=async (req,res)=>{
    try {
        const {name}=req.body
        const id=req.params.id
        console.log("this is id"+id)
        const category=await CategoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,   
            category,
            message:"category updated successfuly"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status:false,
            error,
            message:"error while updationg categoryt"
        })
    }
}


//show All Categories


export const categoryController=async(req,res)=>{
try {
    const category=await CategoryModel.find({})
    const categories=category.map((e)=>e.name);
    
    res.status(200).send({
        success:true,
        category,


    })

} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:"unable to show all categories"
    })
}

}


//single category


export const singleCategoryController=async(req,res)=>{
    try {

        
        const category=await CategoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            category,
            mesaage:"got single category"
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"cant get single category"
        })
       
    }
}


//delete category

export const deleteSingleCategory= async (req,res)=>{
    try {
        const {id}=req.params.id;
        await CategoryModel.deleteOne({id});
        res.status(200).send({
            success:true,
            id,
            message:"deleted above category"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error in deleting category"
        })
    }
}
