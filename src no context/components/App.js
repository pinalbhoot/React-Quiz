import { useEffect, useReducer } from 'react';


import Header from './Header';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Main from './Main';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Footer from './Footer';
import Timer from './Timer';

const Secounf_Per_question =30;

const initialState={
  questions:[],
  status :"loading",
  index:0,
  answer:null,
  points:0,
  highscore:0,
  secoundsRemaining:null,
};

 function reducer(state,action)
 { 
   switch(action.type)
   {
     case "dataRecevied":
       return {...state,
         questions: action.payload,
         status:"ready"};
     case "dataFailed":
        return{...state,status:"error"};
      case "start":
        return{...state,status:"active", secoundsRemaining:state.questions.length * Secounf_Per_question,};
      case "newAnswer":   
          const question =state.questions.at(state.index);
          return{...state,
          answer:action.payload,
           points:action.payload === question.correctOption ? state.points + question.points :state.points, 
          };
      case "nextQuestion":
        return{
          ...state,
          index:state.index+1,
          answer:null,
        };
     case "finish":
          return{...state,status:"finished",highscore:state.points > state.highscore ? state.points : state.highscrore};
     case "restart":
      return{...initialState,questions:state.questions,status:"ready"};
      case "tick":
         return{...state,
           secoundsRemaining:state.secoundsRemaining-1,
           status:state.secoundsRemaining === 0  ? "finished": state.status,
          };
   
     default :
        throw new Error("Error in data fatching ");
   }

 } 

function App() {
  
  const[{questions,status,index,answer,points,highscore,secoundsRemaining},dispatch]=useReducer(reducer,initialState);

  const numQuestions = questions.length;
  const maxPossibalPoints = questions.reduce((prev,cur) => prev+cur.points,0);
   
 
  useEffect( function()
  {
    fetch('http://localhost:9000/questions')
    .then((res)=>res.json())
     .then((data)=> dispatch({type:"dataRecevied", payload:data}))
    .catch((err)=> dispatch({ type:"dataFailed"}));
  },[]);

  return (
    <div>
      <Header/>    
    <Main>
        {status === "loading" && <Loader/>}
        {status === "error" && <Error/>}
        {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch} /> }
        {status ==="active" &&(
        <>
          <Progress  index={index} numQuestions={numQuestions} points={points}  maxPossibalPoints={maxPossibalPoints} answer={answer}/>
           <Question question={questions[index]} dispatch={dispatch} answer={answer}/>           
            <Footer>
            <Timer dispatch={dispatch} secoundsRemaining={secoundsRemaining}/>
            <NextButton  dispatch={dispatch} answer={answer} numQuestions={numQuestions} index={index} />
            </Footer>
          
        </>   
        )}
        {status === "finished" && (
        <FinishScreen points={points}   
        maxPossibalPoints={maxPossibalPoints}      
          highscore={highscore}
          dispatch={dispatch}
          />)
        }
    </Main>

    </div>
   );
}

export default App;
