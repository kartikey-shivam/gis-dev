import React, { useEffect } from 'react';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import TranslateIcon from '@mui/icons-material/Translate';
import AnchorIcon from '@mui/icons-material/Anchor';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import {data} from '../data.json'
function SelectPort(params) {
    const [state, setState] = React.useState('');
    const [port, setPort] = React.useState('');
    useEffect(()=>{
        console.log(data[0])
        setPort(data[0].port)
        setState(data[0].state)
    },[])
    function onPrevious(){
        // console.log('click')
        window.location.herf='/register/language'
    }
    function onNext(){
        if(state == '' &&  port == ''){
            window.alert('please select language')
        }else{
            window.location.href='/map'
        }
    }
    const handleChangeState = (event) => {
      setState(event.target.value);
    };
    const handleChangePort = (event) => {
        setPort(event.target.value);
      };
    return(
        <div className='h-screen w-full flex flex-col justify-around items-center'>
            <div className="flex">
                    <div className="relative">
                        <PhoneIphoneIcon className='icon-6'  />
                        <CheckCircleIcon className="check-icon" />
                    </div>
                    <HorizontalRuleIcon className='icon-6' fontSize='large' />
                    <div className="relative">
                    <TranslateIcon className='icon-6' fontSize='large'/>
                        <CheckCircleIcon className="check-icon" />
                    </div>
                    <HorizontalRuleIcon className='icon-6 fade-icon' fontSize='large' />
                    <AnchorIcon className='icon-6 fade-icon' fontSize='large' />
            </div>
            <div className='w-1/2 h-2/3'>
            <h2 className='text-3xl p-3 sm:text-4xl'>Where do you fish?</h2>
            <div className='w-full h-2/3 flex flex-col items-center justify-around'>
                <FormControl className='w-1/2'>
                    <InputLabel id="demo-simple-select-label">State</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={state}
                        label="State"
                        onChange={handleChangeState}
                    >
                        <MenuItem value='Haryana'>Haryana</MenuItem>
                        <MenuItem value='Maharastra'>Maharastra</MenuItem>
                        <MenuItem value='Delhi'>Delhi</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className='w-1/2'>
                    <InputLabel id="demo-simple-select-label">Port</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={port}
                        label="Port"
                        onChange={handleChangePort}
                    >
                        <MenuItem value='Port1'>Port1</MenuItem>
                        <MenuItem value='Port2'>Port2</MenuItem>
                        <MenuItem value='Port3'>Port3</MenuItem>
                    </Select>
                </FormControl>

            </div>
          
            </div>
            <div className='w-1/2 flex justify-between'>
                <Button  className='verify-btn w-1/2 md:w-1/5' variant="contained" onClick={()=>{onPrevious()}}>Back</Button>
                <Button className='verify-btn w-1/2 md:w-1/5' variant="contained" onClick={()=>{onNext()}}>Next</Button>

                </div>
        </div>
    );
}
export default SelectPort;