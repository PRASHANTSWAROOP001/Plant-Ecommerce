import CommonForm from "@/components/common/CommonForm";
import { useToast } from "@/hooks/use-toast";
import { useSelector, useDispatch } from "react-redux";
import { addProductFormElements } from "@/config";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet";
import ImageUpload from "./ImageUpload";
import {
  addProduct,
  fetchAllProducts,
  deleteProduct,
  editProduct,
} from "@/store/adminProductReducer";
import AdminProductTile from "@/components/adminComponents/adminProductTile";

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

  const { productList } = useSelector((state) => state.adminProduct);

  const dispatch = useDispatch();

  const { toast } = useToast();

  function onSubmit(e) {
    e.preventDefault();

    currentEditedId != null
      ? dispatch(editProduct({ id: currentEditedId, formData })).then(
          (data) => {
            if (data?.payload?.success == true) {
              toast({
                title: "Product Updated Successfully",
              });
              setOpenCreateProductDialog(false);
              dispatch(fetchAllProducts());
            }
          }
        )
      : dispatch(
          addProduct({
            ...formData,
            price: Number(formData.price),
            sellPrice: Number(formData.sellPrice),
            stock: Number(formData.stock),
            imageUrl: uploadedImageUrl,
          })
        ).then((data) => {
          //console.log(data)

          if (data?.payload?.success) {
            toast({
              title: "Product Added Successfull",
            });

            setFormData(initialState);
            setImageFile(null);

            dispatch(fetchAllProducts());
          } else {
            toast({
              title: "Error While Adding Product",
            });
          }
        });
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleDelete = (getCurrentId) => {
    //console.log(getCurrentId);

    dispatch(deleteProduct(getCurrentId)).then((data) => {
      //console.log(data);

      if (data?.payload?.success == true) {
        dispatch(fetchAllProducts());
        toast({
          title: "Product Deleted Successfully.",
        });
      }
    });
  };

  return (
    <>
      <div className="mb-5 flex justify-end w-full">
        <Button onClick={() => setOpenCreateProductDialog(true)}>
          {" "}
          Add Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                setFormData={setFormData}
                handleDelete={handleDelete}
                setOpenCreateProductDialog={setOpenCreateProductDialog}
                key={productItem?._id}
              ></AdminProductTile>
            ))
          : null}
      </div>

      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
          setCurrentEditedId(null);
          setFormData(initialState);
        }}
      >
        <SheetContent className="overflow-y-auto max-h-screen">
          <SheetHeader>
            <SheetTitle className="pb-2 text-center">
              {currentEditedId != null ? "Edit Product" : "Add Product"}
            </SheetTitle>
          </SheetHeader>

          <ImageUpload
            setImageFile={setImageFile}
            imageFile={imageFile}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            setUploadedImageUrl={setUploadedImageUrl}
            uploadedImageUrl={uploadedImageUrl}
          ></ImageUpload>

          <div>
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              buttonText={
                currentEditedId != null ? "Edit Product" : "Add Product"
              }
              onSubmit={onSubmit}
              formControls={addProductFormElements}
            ></CommonForm>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default AdminProduct;
