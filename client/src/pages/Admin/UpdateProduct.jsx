
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Select} from 'antd';
import { Option } from 'antd/es/mentions'
import { useNavigate, useParams } from 'react-router-dom'
const UpdateProduct = () => {

    const [categories,setCategories]=useState([])
    const [photo,setPhoto]=useState("")
    const [name,setName]=useState("")
    const [description,setDescription]=useState("")
    const [price,setPrice]=useState("")
    const [id,setId]=useState("")
    const [quantity,setQuantity]=useState("")
    const [shipping,setShipping]=useState("")
    const [category,setCategory]=useState("")
  
  //params

  const params=useParams()
    //navigation
  
    const navigate= useNavigate();
  
    //update product function

    const getSingleProduct=async(req,res)=>{
        try {
            const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/single-product/${params.slug}`)
          
            
            setName(data.product.name)
            setId(data.product._id)
            setDescription(data.product.description)
            setPrice(data.product.price)
            setQuantity(data.product.quantity)
            setCategory(data.product.category._id)
          
            setShipping(data.product.shipping)
           
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getSingleProduct()
        //eslint-disable-next-line
    },[])
  //update product function
  const handleSubmit=async(e)=>{
    e.preventDefault();
   
    const productData= new FormData()
    productData.append('name',name)
    productData.append('description',description)
    productData.append('price',price)
    productData.append('quantity',quantity)
    photo && productData.append('photo',photo)
    productData.append('category',category)
  try {
    
    const {data}=await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`, productData)
    
    if(data?.success){
      toast.success("product updated successfullyy")
      navigate('/dashboard/admin/products')
    }
    else{
      toast.error(data.message)
    }
  } catch (error) {
    console.log(error)
    toast.error("gya bhai!! ")
  }
  }
  
//delete

const handleDelete=async(req,res)=>{
    try {
        let ans=window.confirm("are you sure want to delete this product")
        if(ans){
        const {data}=await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`)
        toast.success("prodcut deleted")
        navigate('/dashboard/admin/products')}
    } catch (error) {
        console.log(error)
        toast.error("cant delete")
    }
}

    //get all categories
  
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/category/get-category`
        );
        if (data?.success) {
          setCategories(data.category);
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      }
    };
    
    useEffect(()=>{
      getAllCategory()
    },[])
  return (   
    <Layout>
    <div className="container-fluid m-3 p-3">
<div className="row">
   <div className="col-md-3">
       <AdminMenu/>
       </div>
       <div className="col-md-9">
           <h1>Update Product</h1>
           <div className="m-1 w-75">
             <Select bordered={false} placeholder="Select a Category" size='large' showSearch className='form-select mb-3' value={category} onChange={(value)=>{setCategory(value)}}>
           {categories?.map(c=>(
             <Option key={c._id} value={c._id}>{c.name}</Option>
           ))}

             </Select>
             <div className="mb-3">
               <label className='btn btn-outline-secondary col-md-12'>
                 {photo?photo.name:"Upload photo"}
                 <input type='file' name='photo' id='image/*' onChange={(e)=>setPhoto(e.target.files[0])} hidden/>
               </label>
             </div>
             <div className="mb-3">
               {photo?(
                 <div className="text-center">
                   <img src={URL.createObjectURL(photo)} alt="product_photo" height={'200px'}  className='img img-responsive'/>
                 </div>
               ):(<div className='text-center'>  <img  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`} alt="product_photo" height={"200px"} className="img img-responsive" /> </div>)}
             </div>
             <div className="mb-3">
               <input type="text" value={name} placeholder='write a name' className='form-control' onChange={(e)=>setName(e.target.value)}/>
             </div>
             <div className="mb-3">
               <input type="text" value={description} placeholder='write the description' className='form-control' onChange={(e)=>setDescription(e.target.value)}/>
             </div>
             <div className="mb-3">
               <input type="text" value={price} placeholder='Enter price amonunt ' className='form-control' onChange={(e)=>setPrice(e.target.value)}/>
             </div>
             <div className="mb-3">
               <input type="number" value={quantity} placeholder='write a quantity' className='form-control' onChange={(e)=>setQuantity(e.target.value)}/>
             </div>
             <div className="mb-3">
             <Select bordered={false} placeholder="Select Shipping" size='large' value={shipping?"Yes":"No"} showSearch className='form-select mb-3' onChange={(value)=>{setShipping(value)}}>
           
             <Option key="1" value="yes">yes</Option>
             <Option key="0" value="no">no</Option>
           

             </Select>
             </div>
             <div className="mb-3">
               <button className='btn btn-primary' onClick={handleSubmit}>Update Product</button>
             </div>
             <div className="mb-3">
               <button className='btn btn-danger' onClick={handleDelete}>Delete Product</button>
             </div>
           </div>
       </div>
</div>
</div>
</Layout>
  )  
}

export default UpdateProduct    