'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons"
interface CAtegoryBoxProps{
    icon:IconType;
    label:string;
    description:string;
    selected?: boolean

}const CategoryBox:React.FC<CAtegoryBoxProps> =({
    icon:Icon,
    label,
    selected
})=>{
    const router = useRouter();
    const params= useSearchParams();
    return (
        <div className={`flex flex-col justify-center items-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
        ${selected ? 'border-b-neutral-800':'border-transparent'} 
        ${selected ? 'text-neutral-800':'text-neutral-500'}
        `}>
<Icon size={26}/>
            <div className="font-medium text-sm">
                {label}
            </div>
        </div>
    );
}

export default CategoryBox;