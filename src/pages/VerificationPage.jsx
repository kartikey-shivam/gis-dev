import styled from "@emotion/styled";
import { Button } from "@mui/material";
import {Input as MuiInput} from "@mui/material";
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import TranslateIcon from '@mui/icons-material/Translate';
import AnchorIcon from '@mui/icons-material/Anchor';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const Input = styled(MuiInput)(({ theme }) => ({
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
    "& input[type=number]": {
      MozAppearance: "textfield",
    },
  }));
function VerificationPage(params) {
    return(
            <div className='h-screen w-full flex flex-col justify-center items-center'>
                <div className="flex">
                  <div className="relative">
                <PhoneIphoneIcon className='icon-6'  />
                {/* <CheckCircleIcon className="check-icon" /> */}
                  </div>
                <HorizontalRuleIcon className='icon-6' />
                <TranslateIcon className='icon-6 fade-icon'/>
                <HorizontalRuleIcon className='icon-6 fade-icon' />
                <AnchorIcon className='icon-6 fade-icon' />

                
            </div>
                <div className='w-full p-4 flex flex-col justify-center md:w-3/5 p-8'>
                        <h2 className='text-3xl p-3 font-bold sm:text-4xl'>please enter the 6 digit code sent to +91 9380291877</h2>
                        <div className="p-4" >
                        <Input
                                // className={isDarkMode ? 'dark' : ''}
                                type="number"
                                slotProps={{
                                    input: {
                                    className:
                                        'w-full text-sm font-sans font-normal leading-5 px-0 py-2 rounded-lg  shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0',
                                    },
                                }}
                                aria-label="Demo input"
                                placeholder="XXX-XXX" />
                       
                        <Button className='verify-btn w-1/2 md:w-1/5' variant="contained">Verify</Button>
                        </div>
                        <div className="text-center p-4 flex flex-col items-center pt-10">
                            <Button className="resend-btn w-1/5" variant="outlined"> Resend Code</Button>
                            <Button className="change-number-btn w-1/3" variant="outlined">Change Number</Button>
                        </div>

                </div>
            </div>
    );
   
}

export default VerificationPage;