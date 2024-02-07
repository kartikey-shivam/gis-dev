import { Button } from "@mui/material";

function Home(params) {
    return(
        <div className="h-screen w-full flex flex-col justify-center items-center">
            <div className="p-20 border-2 border-gray border-solid rounded-full mb-20">
                logo
            </div>
            <div className="text-4xl p-3  text-center font-bold sm:text-5xl">Come Home<br /> With Catch</div>
            <Button className='verify-btn w-1/2 md:w-1/6' variant="contained" href="/quote">Get Started</Button>
       
        </div>
    );
}
export default Home;