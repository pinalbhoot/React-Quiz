import { useQuiz } from "../Context/QuizContext";

function FinishScreen()
{
    const{points,maxPossibalPoints,highscore,dispatch}=useQuiz();
    const percentage =  (points/maxPossibalPoints)*100;
    let emoji;
    if(percentage === 100) emoji ="🥇";
    if(percentage >= 80 && percentage <100) emoji= "🎉";
    if(percentage>=50 && percentage<80) emoji= "🙃";
    if(percentage >= 0 && percentage<50)emoji="🤨";
    if(percentage === 0)emoji="🤦‍♂️";
    return(
        <div>

        <p className="result">
            <span>{emoji}</span>  you Scored <strong>{points}</strong> out of {" "}
          {maxPossibalPoints} ({Math.ceil(percentage )} % )
        </p>
        <p className="highscore">
            (HighScore : {highscore} points)
        </p>
        <button className="btn btn-ui" onClick={()=> dispatch({type :"restart"})}>
                Restart Quiz
            </button>
        </div>

    )
}
export default FinishScreen;