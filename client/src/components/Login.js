import React, { useState } from "react";
import api from '../utils/api';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route


  const [isLoading, setIsLoading] = useState(false)

  const [error, setError] = useState()

  const [data, setData] = useState({
      username: '',
      password: ''
  })

  const handleChange = e => {
      setData({
          ...data,
          [e.target.name] : e.target.value 
      })
  }

  const handleSubmit = e => {
      e.preventDefault()

      setIsLoading(true)

      api()
          .post("/api/login", data)
          .then(res => {
              console.log(res.data.payload)
              localStorage.setItem('token', res.data.payload)

              setTimeout(function(){ 
                  
                  setIsLoading(false)
                  props.history.push('/bubble-page')

                  }, 3000);
              

              



          })
          .catch(err => {
              // setError(err.response.data.message)
              console.log(err)
          })

  }

  return (
    <>
      {isLoading && <div>Loading... </div>}

      <div style={{textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', marginTop:'30px', height:'150px'}}>

          <h1>Login</h1>

          <form onSubmit={handleSubmit} style={{background:'#f1f1f1', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-around', padding:'30px 0px', width:'175px'}}>
              {error && <div className="error">{error}</div>}

              <input type='text' name='username' placeholder='Username' value={data.username} onChange={handleChange} />
              <input type='password' name='password' placeholder='Password' value={data.password} onChange={handleChange} />

              <button type='submit'>Sign In</button>
          </form>
      </div>
    </>
  );
};

export default Login;
