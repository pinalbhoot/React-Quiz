import { useQuiz } from "../Context/QuizContext";

function StartScreen()
{
  const{numQuestions,dispatch}=useQuiz();
  return(
    <div className="start">
        <h2>Welcome To the React Quiz</h2>
        <h3> {numQuestions} Questions  To test your Mastery in React</h3>
        <button className= "btn btn-ui" onClick={()=> dispatch({type: "start"})}> Let's Start</button>
    </div>
  )
}
export default StartScreen;