
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import TranslateIcon from '@mui/icons-material/Translate';
import AnchorIcon from '@mui/icons-material/Anchor';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button } from '@mui/material';
function Confirmation(params) {
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
                <HorizontalRuleIcon className='icon-6' fontSize='large' />
                <div className="relative">
                <AnchorIcon className='icon-6 ' fontSize='large' />
                <CheckCircleIcon className=" check-icon-anchor" />
                </div>
        </div>
        <div className='w-1/2 h-2/3'>
            <h2 className='text-3xl p-3 text-center font-bold sm:text-4xl'>Confirm Information</h2>
            <div className='w-full h-2/3 flex flex-col items-center justify-around'>
               <div className=' w-full flex justify-between items-center'>
                <PhoneIphoneIcon className='icon-4' />
                <h3 className='text-3xl'>+91 8368615650</h3>
               </div>
               <div className=' w-full flex justify-between items-center'>
                <TranslateIcon className='icon-4' />
                <h3 className='text-3xl'>English</h3>
               </div>
               <div className=' w-full flex justify-between items-center'>
                <AnchorIcon className='icon-4' />
                <h3 className='text-3xl'>Mumbai Port, Maharastra</h3>
               </div>

            </div>
          
            </div>
            <div className='w-1/2 flex justify-between'>
                <Button  className='verify-btn w-1/2 md:w-1/5' variant="contained">Back</Button>
                <Button className='confirm-btn w-1/2 md:w-1/5' variant="contained">Confirm</Button>

                </div>
       <div>

       </div>
    </div>
    );
}
export default Confirmation;