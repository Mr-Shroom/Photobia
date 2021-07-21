import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'

const Login = ()=>{
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"invalid email",classes:"#ec407a pink lighten-1"})
            return
        }
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
          if(data.error){
             M.toast({html: data.error,classes:"#ec407a pink lighten-1"})
          }  
          else{
              localStorage.setItem("jwt",data.token)
              localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
              M.toast({html:"signedin successful",classes:"#00796b teal darken-2"})
                history.push('/')
          }
        }).catch(err=>{
            console.log(err)
        })
    }
    return(
    <div className="mycard">
        <div class="card auth-card input-field">
          <h2>Photobia</h2>
          <input
          type="text"
          placeholder="email"
          value={email}
          onChange = {(e)=>setEmail(e.target.value)}
          />
          <input
          type="password"
          placeholder="password"
          value={password}
          onChange = {(e)=>setPassword(e.target.value)}
          />
          <button className="btn waves-effect waves-light #9575cd deep-purple lighten-1"
          onClick={()=>PostData()}
          >
              Login
           </button>
           
           <h6>
            Don't have an account?<Link to='/signup'>Signup</Link>
           </h6> 
        </div>
        
    </div>
    )
}

export default Login