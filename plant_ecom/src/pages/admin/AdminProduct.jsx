import CommonForm from "@/components/common/CommonForm";
import { useToast } from "@/hooks/use-toast";
import { useSelector, useDispatch } from "react-redux";
import { addProductFormElements } from "@/config";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet,SheetHeader, SheetTitle,SheetTrigger,SheetContent } from "@/components/ui/sheet";
import ImageUpload from "./ImageUpload";
import { addProduct } from "@/store/adminProductReducer";

const initialState = {
  imageUrl: null,
  name: "",
  scientificName: "",
  description: "",
  category: "",
  careLevel: "",
  lightRequirement: "",
  stock: "",
  price: "",
  sellPrice: "",
};

function AdminProduct() {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const dispatch = useDispatch();

  const {toast} = useToast()


  function onSubmit(e){
    e.preventDefault();
    if(uploadedImageUrl == "" || imageLoadingState){
      alert("please upload the image and get imageUrl")
    }
    else{
      dispatch(addProduct({
        ...formData,
        price: Number(formData.price),
        sellPrice: Number(formData.sellPrice),
        stock:Number(formData.stock),
        imageUrl:uploadedImageUrl
      })).then(data=>{

        if(data?.payload?.success){

          toast({
            title:"Product Added Successfull"
          })

          setFormData(initialState)
          setImageFile(null)
        }
        else{

          toast({
            title:"Error While Adding Product"
          })

        }
      })
    }


  }


  

  return (
    <>
      <div className="mb-5 flex justify-end w-full">
        <Button onClick={() => setOpenCreateProductDialog(true)}> add Product</Button>
      </div>

      <Sheet 
        open={openCreateProductDialog}
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
        }}
      >
        <SheetContent className='overflow-y-auto max-h-screen'>
          <SheetHeader >
            <SheetTitle className='pb-2 text-center'>Add Product</SheetTitle>
          </SheetHeader>

          <ImageUpload setImageFile={setImageFile} imageFile={imageFile} imageLoadingState={imageLoadingState} setImageLoadingState={setImageLoadingState} setUploadedImageUrl={setUploadedImageUrl} uploadedImageUrl={uploadedImageUrl}   ></ImageUpload>

          <div >
            <CommonForm  formData={formData} setFormData={setFormData} buttonText={"Add Product"} onSubmit={onSubmit} formControls={addProductFormElements}></CommonForm>
          </div>

          
        </SheetContent>
      </Sheet>
    </>
  );
}

export default AdminProduct;
