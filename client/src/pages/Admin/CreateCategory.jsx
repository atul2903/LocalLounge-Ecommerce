import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from 'antd';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name,setName]=useState('')
  const [visible,setvisible]=useState(false)
  const [selected,setSelected]=useState(null)
  const [updateName,setUpdateName]=useState("")
  //handle form


  const handleSubmit =async(e)=>{
    e.preventDefault()
    try {
      const {data}= await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`,{name})
      if(data?.success){
        toast.success(`${data.category.name} is created`)
        getAllCategory()
      }
      else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error("something wrong in i/p form")

    }
  }

  //update form

  const handleUpdate=async(e)=>{
    e.preventDefault();
    try {
      const {data}=await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,{name:updateName})
      if(data.success){
        toast.success(`${updateName} is updated`)
        setSelected(null)
        setUpdateName('')
        setvisible(false)
        getAllCategory()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("error in updating the category name")
    }
    
}

//delete form

const handleDelete=async(e)=>{
  
  try {
    const {data}=await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-catgory/${e._id}`)
    if(data.success){
      toast.success(`${e.name} is deleted`)
      getAllCategory()
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    console.log(error)
    toast.error("error in deleting the category name")
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

  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
              <div className="p-3 w-50"><CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/></div>
            <div>
              <table className="table " >
                <thead>
                  <tr >
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {categories?.map((e) => {
                      return (
                       
                        <tr >
                          <td key={e._id} className="w-75 p-3">{e.name} </td>
                          <td>
                            <button className="btn btn-primary ms-2"  onClick={()=>{setvisible(true);setUpdateName(e.name);setSelected(e)}}>Edit</button>
                            <button className="btn btn-danger ms-2" onClick={()=>handleDelete(e)}>Delete</button>
                          </td>
                          </tr>
                       
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
            <Modal onCancel={()=>setvisible(false)} footer={null} visible={visible}>
              <CategoryForm value={updateName}  setValue={setUpdateName} handleSubmit={handleUpdate}/>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
