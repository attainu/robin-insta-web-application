import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css' //this website help in frontend

//fetching network request from server to client
const SignIn = ()=>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)

    useEffect(()=>{
        if(url){
            uploadFileds()
        }

    },[url])
    

    //making function of upload profile pic that will be completely optional field
    const uploadPic = ()=>{
        const data = new FormData  //in order to upload file we need to formdata
        data.append("file",image)
        data.append("upload_preset","instagram")
        data.append("cloudinary_name","ds9gf8buk")
        fetch("https://api.cloudinary.com/v1_1/ds9gf8buk/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        //error handling
        .catch(err=>{
            console.log(err)
        })
    }

    const uploadFileds = ()=>{
        //email validation
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push('/signin')
           }
        }).catch(err=>{
            console.log(err)
        })
    }


    const PostData =()=>{
        if(image){
            uploadPic()
        }else{
            uploadFileds()
        }     
    }

    return (
        <div className="mycard">
            <div className="card auth-card">
                <h2>Instagram</h2>
                <input
                type="text"
                placeholder="name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />

                <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}

                />
                <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                
                <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                <span><h6>Upload Profile Picture</h6></span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />

                </div>
                <div className="file-path-wrapper">
                    <input  className="file-path validate" type="text" />

                </div>

            </div>

                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={()=>PostData()}>
                    SignUP
                </button>
                <h5>
                    <Link to="/signin"><h6>Have an account?</h6> </Link>
                </h5>
                
            </div>
        </div>
    )
}
export default SignIn





