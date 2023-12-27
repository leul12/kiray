'use Client';

import useCountries from '../../hooks/useCountries';
import Select from 'react-select';

export type CountrySelectValue = {
    flag:string;
    label:string;
    latlng:number[];
    region:string;
    value:string;
}

interface CountrySelectProps{
    value?:CountrySelectValue;
    onChange:(value:CountrySelectValue)=> void;
}

const CountrySelect:React.FC<CountrySelectProps> = ({
    value,onChange
})=>{
    const {getAll} = useCountries();
    return(
    <div>
    <Select
        placeholder='Anywhere'
        isClearable
        options={getAll()}
        value={value}
        onChange={(value)=> onChange(value as CountrySelectValue)}
        formatOptionLabel={(Option:any) =>(
            <div className='felx felx-row items-center gap-3'> 
                <div>
                    {Option.flag}
                </div>
                <div> 
                {Option.label},
                <span className='text-neutral-800 ml-1'>
                {Option.region}
                </span>
            </div>
            </div>
        )}
        classNames={{
            control:() => 'p-3 border-2',
            input:() => 'text-lg',
            option:()=>'text-lg'
        }}
        theme={(theme)=>({
            ...theme,
            borderRadius:6,
            colors:{
                ...theme.colors,
                primary:'black',
                primary25:'#ffe4e6'
            }
        })}
        />
        </div>
    );
};
export default CountrySelect;