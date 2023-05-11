import React, { useState } from 'react'
import { ToastContainer,toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import { Registerapi } from '../utils/apiRoutes'
import { Link, useNavigate } from 'react-router-dom'
const Register = () => {
  const Navigate = useNavigate()
  const [values, setValues] = useState({
    username : "",
    email : "",
    password : "",
    confirPassword : "",
  })
  const handleSubmit = async (event)=>{
    event.preventDefault();
    if(validationCheck()){
      console.log("api clled")
      const {username,email,password} = values;
      const {data} = await axios.post(Registerapi,{
        username,
        email,
        password
      })
      if(data.status=== false){
        toast.error(data.msg , toastContaierOptions)
      }
      if(data.status=== true){
        localStorage.setItem('chat-app-user',JSON.stringify(data.user))
        Navigate('/')
      }
    }

  }
  const handleChange = (event)=>{
    setValues({...values,[event.target.name]:event.target.value})

  }

  const toastContaierOptions = {
    position : 'bottom-right',
    autoClose : 8000,
    pauseOnHover : true,
    draggable : true,
    theme : 'light'
  }

  const validationCheck = ()=>{
    const {username,email,password,confirmpassword} = values;
    if(password !== confirmpassword){
      toast.error('Confirm password should be same as the password',toastContaierOptions)
      return false;
    }
    else if(username.length < 3){
       toast.error('Username should have at leat 3 characters',toastContaierOptions)
      return false;
     }
    else if(password.length < 8){
      toast.error('Password should have at leat 8 characters',toastContaierOptions)
      return false;
    }else if(email=== ""){
      toast.error('email is required',toastContaierOptions)
      return false;
    }
    return true;
  }

  return (
    <div className="body-bg min-h-screen mx-2" >
    <header className="max-w-lg mx-auto">
        <a href="#">
            <h1 className="text-4xl font-bold text-white text-center">Startup</h1>
        </a>
    </header>

    <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <section>
            <h3 className="font-bold text-2xl">Welcome to Chat-APP</h3>
            <p className="text-gray-600 pt-2">Create your account.</p>
        </section>

        <section className="mt-10">
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="mb-6 pt-3 rounded bg-gray-200">
                    <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="userName">Username</label>
                    <input 
                      type="text" 
                      name='username'
                      id="userName" 
                      className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                      onChange={(e)=>{handleChange(e)}}
                    />
                </div>
                <div className="mb-6 pt-3 rounded bg-gray-200">
                    <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="Email">Email</label>
                    <input 
                        type="email" 
                        name='email'
                        id="Email" 
                        className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                        onChange={(e)=>{handleChange(e)}}
                    />
                </div>
                <div className="mb-6 pt-3 rounded bg-gray-200">
                    <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="password">Password</label>
                    <input 
                      type="password" 
                      id="password" 
                      name='password'
                      className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                      onChange={(e)=>{handleChange(e)}}
                    />
                </div>
                <div className="mb-6 pt-3 rounded bg-gray-200">
                    <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="confirmpassword">Confirm Password</label>
                    <input 
                      type="password" 
                      id="confirmpassword"
                      name='confirmpassword'
                      className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                      onChange={(e)=>{handleChange(e)}}
                    />
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Sign In</button>
                  <div className="max-w-lg mx-auto text-center mt-5">
                      <p className="text-black"> Have an account? <Link to="/login" className="font-bold hover:underline">Log In</Link>.</p>
                  </div>
            </form>
        </section>
    </main>
    <ToastContainer/>
</div>
  )
}

export default Register
