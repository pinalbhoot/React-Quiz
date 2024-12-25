 import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

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

function reducer(state,action){ 
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

function QuizProvider({children})
{
    const[{questions,status,index,answer,points,highscore,secoundsRemaining}
        ,dispatch]=useReducer(reducer,initialState);

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
    <QuizContext.Provider 
        value={{
        questions,
        status,
        index,answer,points,highscore,secoundsRemaining,numQuestions,maxPossibalPoints,dispatch
    }}> 
     {children}
    </QuizContext.Provider>
  )
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside of the QuizProvider");
  return context;
}

export {QuizProvider,useQuiz};