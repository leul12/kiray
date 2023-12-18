'use client'
import axios from 'axios'
import { useCallback ,useState} from 'react';
import { AiFillGithub } from 'react-icons/ai';
import {FcGoogle} from "react-icons/fc"
import{FieldValues,SubmitHandler,useForm} from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { error } from 'console';
import Modal from './modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
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
            console.log(error);
        })
        .finally(() =>{
            setIsLoading(false);
        })
    }
    const bodyContent =(
        <div className="flex flex-col gap-4">
            <Heading title='welcome' subtitle='you'/>
            <Input 
            id='email'
            label='Email'
            disabled={isloading}
            register={register}
            errors={errors}
            required
            />
        </div>
    )
    return <Modal
    disabled={isloading}
    isOpen={registermodal.isOpen}
    title='Register'
    actionLabel='Continue'
    onClose={RegisterModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    />;
}
export default RegisterModal;