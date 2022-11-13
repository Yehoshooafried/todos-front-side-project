import React, { Component, useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Login(props) {


  //states
  const [errorMessege, setErrorMessege] = useState('')
  const [userNameInput, setUserNameInput] = useState('')
  const [paswordInput, setPaswordInput] = useState('')


  const navigate = useNavigate()

  //run the the fetch 
  useMemo(() => props.getData(), [])

  //validation function
  function validation(e) {
    e.preventDefault()
    console.log(props.dataOfUsers);
    const user = props.dataOfUsers.filter((obj) => obj.username === userNameInput)
    console.log(userNameInput);
    console.log(props.dataOfUsers);
    console.log(user);

    // 1.check if user exists
    if (user.length > 0) {
      const password = user[0].address.geo.lng.slice(-4)

      // 2.check Paswword
      if (password === paswordInput) {
        let userForLS = JSON.stringify(user)

        // 3.store user in LS
        localStorage.setItem('userData', userForLS);
        
        // 4.nevigate
        navigate('/home')
      } else {
        alert('invalid username/ password')
        navigate('/');
      }
    } else {
      alert('invalid username/ password')
      navigate('/');
    }
  }
  return (
    <div style={{'text-align': 'center'}}>
      <form action="">
        <div  className="form-group row">
          <label className="col-sm-2 col-form-label" >username</label>
          <div className="col-sm-2 col-form-label">
            <input className="form-control" type="text"  onChange={(e) => setUserNameInput(e.target.value)} value={userNameInput} /> <br /><br />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label" >password</label>
          <div  className="col-sm-2 col-form-label">
            <input className="form-control" type="text" onChange={(e) => setPaswordInput(e.target.value)} value={paswordInput} /> <br />
          </div>
        </div>
        <button  className="btn btn-primary" onClick={validation}>login</button>
        <h1>{errorMessege}</h1>
      </form>
    </div>);
}
export default Login;