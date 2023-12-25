'use client'
import Container from "../Container"
import {TbBeach, TbMountain, TbPool} from 'react-icons/tb'
import {IoDiamond} from 'react-icons/io5';
import {GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiDesert, GiForestCamp, GiIsland, GiJungle, GiWindmill} from 'react-icons/gi'
import CategoryBox from '../CategoryBox'
import {MdOutlineVilla} from'react-icons/md'
import { usePathname, useSearchParams } from "next/navigation"
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
    {
        label: 'Country Side',
        icon:GiJungle,
        description: 'This Property isin the country side!'
    },
    {
        label: 'Pools',
        icon:TbPool,
        description: 'This Property Has a Pool !'
    },
    {
        label: 'Islands',
        icon:GiIsland,
        description: 'This Property is surrounded by water body !'
    },
    {
        label: 'Lake',
        icon:GiBoatFishing,
        description: 'This property is near a lake !'
    },
    {
        label: 'Mountain Top',
        icon:TbMountain,
        description: 'This Property is at mountain Tops !'
    },
    {
        label: 'Castles',
        icon:GiCastle,
        description: 'This Property has castles !'
    },
    {
        label: 'Camping',
        icon:GiForestCamp,
        description: 'This Property has camping activities !'
    },
    {
        label: 'Desert',
        icon:GiCactus,
        description: 'This Property is in a desert !'
    },
    
    {
        label: 'cave',
        icon:GiCaveEntrance,
        description: 'This Property is in a caves !'
    },
    {
        label: 'Barns',
        icon:GiBarn,
        description: 'This Property is in barn !'
    },
    {
        label: 'Lux',
        icon:IoDiamond,
        description: 'This Property is luxurious !'
    },
    
]
const Catagories=  () =>{
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname == '/';
    if(!isMainPage){
        return null;
    }

    return(
        <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
          {categories.map((item) => (
            <CategoryBox
              key={item.label}
              label={item.label}
              selected={category == item.label}
              icon={item.icon}
              description=""
            />
          ))}
        </div>
      </Container>
    );
};

export default Catagories;