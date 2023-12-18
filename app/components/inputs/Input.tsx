'use client';
import {BiDollar} from 'react-icons/bi'

import { UseFormRegister,FieldValues, FieldErrors } from "react-hook-form";

interface InputProps{
    id:string;
    label:string;
    type?:string;
    disabled?: boolean;
    formatPRice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>
    errors:FieldErrors
}
const Input: React.FC<InputProps>=({
    id,
    label,
    disabled,
    type ='text',
    formatPRice,
    required,
    register,
    errors
})=>
{
    return( 
        <div className="w-full relative">
            {formatPRice && (<BiDollar
            size= {24}
            className="text-neutral-700 absolute top-5 left-2"
            />
            )}
            <Input 
            id={id}
            disabled={disabled}
            {...register(id,{required})}
            placeholder=" "
            type={type}
            className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
            ${formatPRice ? 'pl-6': 'pl-4'}
            ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
            ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black-300'}
            
            `}
            />
            <label >{label}</label>
        </div>
    );
}
export default Input;