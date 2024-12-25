import { useQuiz } from "../Context/QuizContext";
import Option from "./options";

function Question()
{ 
    const{questions,index}=useQuiz();
    const question = questions.at(index);
    // console.log(question)
    return(
        <div>
            <h4>{question.question}</h4>
            <Option question={question} />
        </div>
    )
}
export default Question;