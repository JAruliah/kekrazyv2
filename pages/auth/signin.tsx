import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const signin = ({ }) => {
  const router = useRouter();
  const [ loginForm, setLoginForm ] = useState({
    username:"",
    password: ""
  });
  const [ errorMessage, setErrorMessage ] = useState("");

  const validateSignin = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if there are inputs then attemp the sign in 
    try{
      const signInResponse = await signIn("credentials", { username: loginForm.username, password: loginForm.password , redirect:false});
      if(signInResponse?.error == null){
        console.log('made it')
        setErrorMessage('');
        router.push('/');
      }else{
        setErrorMessage('Please ensure your credentials are correct');
      }
    }catch(err){
      setErrorMessage('oops something went wrong');
    }
  }
  return (
    <>
      <h3>Sign in</h3>
      {errorMessage.length > 0 ?
        <div className="alert alert-warning mt-2" style={{marginBottom:"0"}} role="alert">
          {errorMessage}
        </div>
        :null}
      <form onSubmit={(e) => validateSignin(e)}>
        <label>Username</label>
        <input name="username" type="text" className="form-control" value={loginForm.username} onChange={(e) => setLoginForm({...loginForm, username: e.target.value})} required={true}/>
        <label>Password</label>
        <input name="password" type="password" className="form-control" value={loginForm.password} onChange={(e) => setLoginForm({...loginForm, password: e.target.value})} required={true}/>
        <button type="submit" className="btn btn-primary mt-2">Sign in</button>
      </form>
    </>
  )
}

export default signin;