import { Button } from '@mui/material';
import MuiPhoneNumber from 'material-ui-phone-number-2'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import TranslateIcon from '@mui/icons-material/Translate';
import AnchorIcon from '@mui/icons-material/Anchor';
import React, { useState } from 'react';
import {Input} from "@mui/material";
import jsonData from './../data.json'
function LoginPage() {
    const [phoneNumber,setPhoneNumber] = React.useState();
    const [password,setPassword] = React.useState();
    const [id,setId] = React.useState();
  
    function handleOnChange(value) {
        if(value.length == 15){
            setPhoneNumber( value);
        }
      }
      function handlePassword(value){
        setPassword(value)
        // console.log(passsword);
      }
      function  onLogin  () {
        const json = jsonData.data
        json.map((ele)=>{
            if (ele.phoneNumber == phoneNumber && ele.password == password) {
                setId(ele.id)
            }
        })
        if(id == null){
            window.alert('Wrong Credential')
        }else {
            window.location.href = '/map'
        }
      }
 

    return (
        <div className='h-screen w-full flex flex-col justify-center items-center'>
            <div>
                <PhoneIphoneIcon className='icon-6' fontSize="large" />
                <HorizontalRuleIcon className='icon-6' fontSize='large' />
                <TranslateIcon className='icon-6 fade-icon' fontSize='large'/>
                <HorizontalRuleIcon className='icon-6 fade-icon' fontSize='large' />
                <AnchorIcon className='icon-6 fade-icon' fontSize='large' />

                
            </div>
            <div className='w-full p-4 flex flex-col justify-center md:w-3/5 p-8'>
                    <h2 className='text-3xl p-3 font-bold sm:text-4xl'>Hi! To begin please enter your mobile number and password.</h2>
                   <div className='p-4'>
                    <MuiPhoneNumber  defaultCountry={'in'} onChange={handleOnChange} />
                    </div> 
                    <div className="ml-8 p-4" >
                        <Input
                                // className={isDarkMode ? 'dark' : ''}
                                type="password"
                               
                                aria-label="Demo input"
                                // value={passsword}
                                onChange={((e)=>{handlePassword(e.target.value)})}
                                placeholder="Password" />
                       
                        </div>
                    <div className='pl-4 md:pl-8'>
                    <Button className='verify-btn w-1/2 md:w-1/4' variant="contained"  onClick={onLogin}>Login</Button>
                    </div>

            </div>
        </div>
    );
}

export default LoginPage;