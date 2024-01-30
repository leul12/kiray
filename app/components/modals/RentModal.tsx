'use client';
import useRentalModal from "@/app/hooks/useRentModal";
import Modal from "./modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Catagories";
import CategoryInput from "../inputs/CategoryInput";
import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS{
    CATEGORY= 0,
    LOCATION =1,
    INFO =2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}
const RentModal = ()=>{
    const router =useRouter();
    const RentModal =useRentalModal();
    const [step,setStep] = useState(STEPS.CATEGORY);
    const [isLoading,setIsLoading]=useState(false);
    const{
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors,
        },
        reset
    }= useForm<FieldValues>({
        defaultValues:{
            category:'',
            location: null,
            guestCount: 1,
            roomCount:1,
            bathroomCount:1,
            imageSrc:'',
            price:1,
            title:'',
            description:''
        }
    });

    const category = watch('category');    
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');    
    const bathroomCount = watch('bathroomCount')
    const imageSrc = watch('imageSrc')

    const Map = useMemo(()=>dynamic(() => import('../map'),{
        ssr:false
    }),[location]);

    const setCustomValue = (id:string, value:any)=>{
        setValue(id,value,{
            shouldDirty:true,
            shouldTouch:true,
            shouldValidate:true
        })
    }
    const onBack = ()=>{
        setStep((value)=>value-1)
    };
    const onNext = () =>{
        setStep((value) =>value+1);
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        if(step !== STEPS.PRICE){
            return onNext();
        }

        setIsLoading(true);

        axios.post('/api/listings', data)
        .then(()=>{
            toast.success('Listing Created !');
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            RentModal.onClose();
        })
        .catch(() =>{
            toast.error('Something went wrong');
        }).finally(()=>{
            setIsLoading(false);
        })
    }
    const actionLabel = useMemo(()=>{
        if(step == STEPS.PRICE){
            return 'create';
        }
        return 'Next';
    },[step]);
    const secondaryActionLabel = useMemo(()=>{
        if(step == STEPS.CATEGORY){
            return undefined;
        }
        return 'Back';
    },[step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
            title="Which of these best describes your place?"
            subtitle="Pick a catagorey"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item)=>(
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                        onClick={(category) => setCustomValue('category',category)}
                        selected= {category===item.label}
                        label={item.label}
                        icon={item.icon}
                        />
                    </div>
                ) )}
            </div>
        </div>
    )
    if(step==STEPS.LOCATION){
        bodyContent =(
            <div className="flex flex-col gap-8">
                <Heading
                title="Where is Your Place located?"
                subtitle="Help Guests Find You!"
                />
                <CountrySelect
                value={location}
                    onChange={(value)=>setCustomValue('location',value)}
                />
                <Map
                center={location?.latlng}
                />
            </div>
        );
    }

    if (step == STEPS.INFO){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                title="Share some basics about your place"
                subtitle="What amenities do you have?"
                />
                <Counter
                title="Guests"
                subtitle="How many guest will you allow?"
                value={guestCount}
                onChange={(vlaue)=>setCustomValue('guestCount',vlaue)}
                />
                <hr/>
                <Counter
                title="Rooms"
                subtitle="How many rooms do you have?"
                value={roomCount}
                onChange={(vlaue)=>setCustomValue('roomCount',vlaue)}
                />
                <hr/>
                <Counter
                title="Bathrooms"
                subtitle="How many bathrooms do you have?"
                value={bathroomCount}
                onChange={(vlaue)=>setCustomValue('bathroomCount',vlaue)}
                />
            </div>         
        )
    }

    if (step == STEPS.IMAGES){
        bodyContent=(
            <div className="flex flex-col gap-8 justify-center ">
                <Heading
                    title="Add a photo of your place"
                    subtitle="Show guests what your place looks like!"
                />
                <ImageUpload 
                    value={imageSrc}
                    onChange={(value)=> setCustomValue('imageSrc',value)}
                />
            </div>
        )
    }
    if (step == STEPS.DESCRIPTION){
        bodyContent =(
            <div className="flex flex-col gap-8">
                <Heading
                    title="How Would you describe your Property "
                    subtitle="Try to make it short and precise"
                />
                <Input
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr/>
                <Input
                    id="description"
                    label="Descripition"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }
    if (step == STEPS.PRICE){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                    title="Let's Set your price"
                    subtitle="How much do you Charge per Night?"
                />

                <Input
                    id="price"
                    label="Price"
                    formatPRice 
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }
    return (
        <Modal
        isOpen ={RentModal.isOpen}
        onClose={RentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step==STEPS.CATEGORY? undefined :onBack}
        body={bodyContent}
        title="Kiray Your Home"
        />
    );
}

export default RentModal;