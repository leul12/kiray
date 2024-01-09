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
    return (
       <CldUploadWidget onUpload={handleUpload} uploadPreset="ptd1czao" options={{maxFiles:1}}>
       {({open})=>{
           return(
               <div 
                    onClick={()=>open ?.() }
                    className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-10 border-neutral-300 flex felx-col jusitfy-center items-center gap-4 text-neutral-600" >
                <TbPhotoPlus size={50}/>
                <div className="font-semibold text-lg">
                        Click to Upload
                </div>
                {
                    value && (
                        <div >
                            <Image
                            alt="Upload pictures"
                            fill
                            style={{objectFit:'cover'}}
                            src={value}
                            />
                        </div>
                    )
                }
               </div>
           )
       }}
       </CldUploadWidget>
    );
}

export default ImageUpload;