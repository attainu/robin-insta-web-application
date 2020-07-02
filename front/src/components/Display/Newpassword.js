import React,{useState,useContext,} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css' //this website help in frontend


const Signin = ()=>{
    const history = useHistory()
    const [password,setPassword] = useState("")
    
    const PostData =()=>{
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push('/signin') //if user sucessfully signin it will navigate in home screen
           }

          //console.log(data)
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className="mycard">
            <div className="card auth-card">
                <h2>Instagram</h2>
                
                <input
                type="password"
                placeholder="enter a new password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />

                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={()=>PostData()}
                >
                    Login
                </button>
                <h5>
                    <Link to="/signup"><h6>Don't have an account? </h6></Link>
                </h5>
                
                
            </div>
        </div>
    )
}
export default Signin





