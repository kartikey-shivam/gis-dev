import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import TranslateIcon from '@mui/icons-material/Translate';
import AnchorIcon from '@mui/icons-material/Anchor';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {data} from "../data.json"
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
function LanguageSelect() {
    const [language,setLanguage] =useState('')
    useEffect(()=>{
        setLanguage(data[0].language)
    },[])
  
    function onSelect(value){
        setLanguage(value)
    }
    function onNext(){
        if(language == ''){
            window.alert('please select language')
        }else{
            window.location.href='/register/port'
        }
    }
    return(
        <div className='h-screen w-full flex flex-col justify-center items-center'>
        <div className='flex'>
        <div className="relative">
                <PhoneIphoneIcon className='icon-6'  />
                <CheckCircleIcon className="check-icon" />
                  </div>
            <HorizontalRuleIcon className='icon-6' fontSize='large' />
            <TranslateIcon className='icon-6' fontSize='large'/>
            <HorizontalRuleIcon className='icon-6 fade-icon' fontSize='large' />
            <AnchorIcon className='icon-6 fade-icon' fontSize='large' />

            
        </div>
        <div className='w-full p-4 flex flex-col justify-center md:w-3/5 p-8'>
                <h2 className='text-3xl text-center p-3 font-bold sm:text-4xl'> {language ? (`Your Selected Language is ${language}`):('Pick your Language')}</h2>
               <div className='p-4'>
                </div> 
                <div className=' grid grid-cols-4 gap-0 md:pl-8'>
                <div className='lang-btn' variant="contained" onClick={(e)=>{onSelect('English')}}>English</div>
                <div className='lang-btn' variant="contained" onClick={(e)=>{onSelect('Hindi')}} >Hindi</div>
                <div className='lang-btn' variant="contained" onClick={(e)=>{onSelect('Marathi')}}>Marathi</div>
                <div className='lang-btn' variant="contained" onClick={(e)=>{onSelect('English')}} >English</div>
                <div className='lang-btn' variant="contained" onClick={(e)=>{onSelect('English')}} >English</div>
                <div className='lang-btn' variant="contained" onClick={(e)=>{onSelect('English')}} >English</div>
                <div className='lang-btn' variant="contained" onClick={(e)=>{onSelect('English')}} >English</div>
                <div className='lang-btn' variant="contained" onClick={(e)=>{onSelect('English')}} >English</div>
                </div>
                <h5 className='text-3xl p-4 text-gray-600 text-center'>Insert Local Greeting</h5>
                <div className='flex justify-between'>
                <Button className='verify-btn w-1/2 md:w-1/5' variant="contained">Back</Button>
                <Button className='verify-btn w-1/2 md:w-1/5' variant="contained" onClick={()=>{onNext()}}>Next</Button>

                </div>
        </div>
    </div>
    );
}
export default LanguageSelect;