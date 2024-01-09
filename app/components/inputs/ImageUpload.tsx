'use client';
import { Value } from "@prisma/client/runtime/library";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import Result from "postcss/lib/result";
import React, { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global{
    var cloudinary:any;
}

interface ImageUploadProps{
    onChange:(Value:string)=> void;
    value: string;
}
const ImageUpload:React.FC<ImageUploadProps>=({
    onChange,value
})=>{
    const handleUpload = useCallback((result: any) =>{
        onChange(result.info.secure_url);
},[onchange]);
    return(
       <CldUploadWidget
       
       />
    );
}

export default ImageUpload;