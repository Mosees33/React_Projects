import { useState } from "react";

function Login(){

    const [ email,setEmail ] = useState("");
    const [ password,setPassword ] = useState("");
    const [ message,setMessage ] = useState("");


    function signInHandler(){
        setMessage("Loading...")
        if(email === "moseesmohan@gmail.com" && password === "test@123"){
            setTimeout(() => {
                setMessage("Login Succesful")
            },3000)
        }else{
            setTimeout(() => {
                setMessage("Login Failed")
            },3000)
        }
    }

    return <div>
        <h1>Login</h1>
        <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)}/><br/>
        <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/><br/>
        <button onClick={signInHandler}>Sign in</button>
        {message && <p>{message}</p>}
    </div>
}

export default Login;