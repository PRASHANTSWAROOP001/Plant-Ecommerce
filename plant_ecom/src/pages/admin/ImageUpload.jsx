import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";

import React, { useRef, useEffect } from "react";

import { Button } from "@/components/ui/button";

import axios from "../../api/configedAxios";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
  currentEditedId,
  isEditMode
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    console.log(event.target.files, "event.target.files");
    const selectedFile = event.target.files?.[0];
    console.log(selectedFile);

    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();

    const droppedFile = e.dataTransfer.files?.[0];

    if (droppedFile) {
      setImageFile(droppedFile);
    }
  }

  function handleRemoveImage() {
    setImageFile(null);
    console.log(inputRef.current.value);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    const data = new FormData();
    data.append("my_file", imageFile); // Ensure key name matches the server
  
    try {
      setImageLoadingState(true)
      const response = await axios.post(
        "/api/admin/upload-image",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response, "response");
      if (response.data.success) {
        setUploadedImageUrl(response.data?.imageUrl);
      } else {
        console.error("Image upload failed.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    finally{
      setImageLoadingState(false)
    }
  }
  

  useEffect(() => {
    if (imageFile !== null) {
      uploadImageToCloudinary();
    }
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto pb-4 ">
      <Label className="text-lg font-semibold mb-2 block"> Upload Image </Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg p-4"
      >
        <Input
          id="imageUpload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="imageUpload"
            className={`flex flex-col items-center justify-center h-32 cursor-pointer `}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />

            <span>Drag and Drop Or Click To Upload</span>
          </Label>
        ) : (
          imageLoadingState ? <Skeleton className='h-10 bg-gray-200'/> :
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-primary mr-2 " />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              onClick={handleRemoveImage}
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <XIcon className="w-4 h-4"></XIcon>
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
