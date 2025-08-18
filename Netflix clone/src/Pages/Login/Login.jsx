import "./Login.css";
import logo from "../../assets/logo.png";
import { useState, useEffect } from "react";
import { signUp, login } from "../../firebase";
import netflix_spinner from '../../assets/netflix_spinner.gif';
import { useSearchParams } from "react-router-dom";


const Login = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    const mode = searchParams.get("mode");
    if(mode === "signup"){
      setSignState("Sign Up");
    }else{
      setSignState("Sign In")
    }
  },[searchParams]);

  const user_auth = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (signState === "Sign In") {
      await login(email, password);
    } else {
      await signUp(name, email, password);
    }
    setLoading(false)
  }

  return (loading?
    <div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className="login">
      <img src={logo} className="login-logo" alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form onSubmit={user_auth}>
          {signState === "Sign Up" ? (
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Your name"
            />
          ) : (
            <></>
          )}
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
          />
          <button type="submit">
            {signState}
          </button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Netflix?
              <span onClick={() => setSearchParams({mode : "signup"})}>Sign Up Now</span>
            </p>
          ) : (
            <p>
              Already Have account?
              <span onClick={() => setSearchParams({mode : "signin"})}>Sign In</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;