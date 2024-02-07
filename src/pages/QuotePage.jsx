import { Button } from "@mui/material";

function QuotePage(params) {
    return(
        <div className="h-screen w-full flex flex-col justify-around items-center">
        <div className="p-10 border-2 border-gray border-solid rounded-full mb-5">
            logo
        </div>
        <div className="text-4xl p-3 h-2/3  text-center font-bold sm:text-5xl">Where Your <br /><br /> Wisdom Meet<br /><br /> Our Technology</div>
        <Button className='verify-btn w-1/2 md:w-1/6' variant="contained" href="/register">Next</Button>
   
    </div>
    );
}
export default QuotePage;