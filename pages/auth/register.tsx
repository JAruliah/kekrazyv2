import React, { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const register = () => {
  const router = useRouter();
  const [ registerForm, setRegisterForm ] = useState({
    firstName:"",
    lastName:"",
    email:"",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [ errorMessage, setErrorMessage ] = useState("");
  const [ loading , setLoading ] = useState(false);

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // check if passwords match
    if(registerForm.password == registerForm.confirmPassword){
      try{
        setLoading(true);
        const response = await axios.post('/api/auth/register', registerForm);
        if(response.data.error == false){
          setErrorMessage('');
          // sign user in if the register was success and redirect to home page
          await signIn("credentials", { username: registerForm.username, password: registerForm.password , redirect:false});
          router.push('/');
        }else{
          setErrorMessage('oops something went wrong');
        }
        setLoading(false);
      }catch(err:any){
        setErrorMessage(err.response.data.message);
        setLoading(false);
      }
    }else{
      setErrorMessage("Passwords Don't match");
    }
  }
  
  return(
    <form onSubmit={(e) => handleSubmit(e)}>
      <h3>Register</h3>
      {errorMessage.length > 0 ? 
        <div className="alert alert-warning mt-2" style={{marginBottom:"0"}} role="alert">
          {errorMessage}
        </div>
      :null}
      <label>First Name</label>
      <input className="form-control" value={registerForm.firstName} onChange={(e) => setRegisterForm({...registerForm, firstName: e.target.value})} required={true}/>

      <label>Last Name</label>
      <input className="form-control" value={registerForm.lastName} onChange={(e) => setRegisterForm({...registerForm, lastName: e.target.value})} required={true}/>

      <label>Email</label>
      <input className="form-control" type="email" value={registerForm.email} onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})} required={true}/>

      <label>Username</label>
      <input className="form-control" value={registerForm.username} onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})} required={true}/>

      <label>Password</label>
      <input className="form-control" type="password" value={registerForm.password} onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})} required={true}/>

      <label>Confirm Password</label>
      <input className="form-control" type="password" value={registerForm.confirmPassword} onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})} required={true}/>

      <button className="btn btn-primary mt-2" type="submit" disabled={loading}>Register</button>

    </form>
  );
}

export default register;