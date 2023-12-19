'use client'
import axios from 'axios'
import { useCallback ,useState} from 'react';
import { FaSquareFacebook } from "react-icons/fa6";

import {FcGoogle} from "react-icons/fc"
import{FieldValues,SubmitHandler,useForm} from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../btns';
const RegisterModal = () =>{
    const registermodal = useRegisterModal();
    const [isloading, setIsLoading] = useState (false);
    const{
        register,
        handleSubmit,
        formState:{
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues:{
            Name:'',
            Email:'',
            Password:''
        }
    });
    const onSubmit :SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true);
        axios .post('/api/register',data)
        .then(()=>{
            registermodal.onClose();
        })
        .catch((error)=>{
            toast.error("Something went wrong");
        })
        .finally(() =>{
            setIsLoading(false);
        })
    }
    const bodyContent =(
        <div className="flex flex-col gap-4">
            <Heading title='Welcome To Kiray ' subtitle='Create an account'/>
            <Input 
            id='email'
            label='Email'
            disabled={isloading}
            register={register}
            errors={errors}
            required
            />
            <Input 
            id='name'
            label='Name'
            disabled={isloading}
            register={register}
            errors={errors}
            required
            />
            <Input 
            id='password'
            type='password'
            label='Password'
            disabled={isloading}
            register={register}
            errors={errors}
            required
            />
        </div>
    );
    const footerContent= (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button
            outline 
            label='Continue with Google'
            icon ={FcGoogle}
            onclick={()=>{}}
            />
            <Button
            outline 
            label='Continue With Facebook'
            icon ={FaSquareFacebook}
            onclick={()=>{}}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>  Already have an Account? </div>
                    <div onClick={registermodal.onClose} className='text-neutral-800 cursor-pointer hover:underline'>Login</div>
                </div>

            </div>
        </div>
    )
    return (<Modal
    disabled={isloading}
    isOpen={registermodal.isOpen}
    title='Register'
    actionLabel='Continue'
    onClose={registermodal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />);
}
export default RegisterModal;