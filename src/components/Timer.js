import { useEffect } from "react";
import { useQuiz } from "../Context/QuizContext";

function Timer()
{  
    const{dispatch,secoundsRemaining}=useQuiz();
    const mins = Math.floor(secoundsRemaining/60);
    const sec = secoundsRemaining % 60;
    useEffect(
        function(){
        const id =  setInterval(
            function()
            {         
                dispatch({type:"tick"}); 
            },1000);
        return()=>clearInterval(id);
    },

    [dispatch]
    );
    return(
        <div className="timer"> 
        {mins < 10 && ""}
        {mins }: {sec < 10 && ""} {sec} </div>
    );
}
export default Timer;
