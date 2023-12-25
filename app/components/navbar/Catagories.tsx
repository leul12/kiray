'use client'
import Container from "../Container"
import {TbBeach} from 'react-icons/tb'
import {GiWindmill} from 'react-icons/gi'
import CategoryBox from '../CategoryBox'
import {MdOutlineVilla} from'react-icons/md'
export const categories = [
    {
        label: 'Beach',
        icon:TbBeach,
        description: 'This Property has water body View'
    },
    {
        label: 'Windmills',
        icon:GiWindmill,
        description: 'This Property has Windmill!'
    },
    {
        label: 'Modern',
        icon:MdOutlineVilla,
        description: 'This Property is Modern!'
    },

]
const Catagories=  () =>{
    return(
        <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
          {categories.map((item) => (
            <CategoryBox
              key={item.label}
              label={item.label}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </div>
      </Container>
    );
};

export default Catagories;