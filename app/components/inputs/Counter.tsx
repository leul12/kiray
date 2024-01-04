'use client'

import React, { useCallback } from "react";

interface CounterProps{
    title:string;
    subtitle:String;
    value:number;
    onChange:(value:number) => void;
}

const Counter: React.FC<CounterProps> = ({
title,subtitle,value,onChange
}) =>{
    const onAdd = useCallback(()=>{
        onChange(value + 1); 
    },[onChange, value]);
    return(
        <div></div>
    )
}

export default Counter;