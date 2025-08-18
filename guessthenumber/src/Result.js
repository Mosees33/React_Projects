function Result({secretNumber,Term}){
   
    let result;

    if(Term){
        if(Term > secretNumber){
        result = "Higher";
        }else if(Term < secretNumber){
        result = "Lower";
        }else if(Term == secretNumber){
        result = "Yipee! correct"
        }else{
        result = "Enter valid Input";
        }
    }

    return <h3>You guessed : {result}</h3>
}

export default Result;