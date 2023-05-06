import React, {useState, useEffect} from "react";
import { useParams,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const url = "http://localhost:4500"


function Edit(props) {
    const params = useParams()
    const [user,setUser] = useState({
        name : "",
        email : "",
        mobile : ""
    })

    const navigate = useNavigate()

    const readSingleUser = async () => {
        await fetch(`${url}/users/${params.id}`)
        .then(res => res.json())
        .then(out => {
            setUser(out)
        }).catch(err => toast.error(err.message))  
    }

    useEffect(() => {
        readSingleUser()
    },[])

    // to set the updated value back to state
        const readValue = (e) => {
            const {name, value} = e.target;
            setUser({...user,[name]: value})
        }

    //submit handler
    const submitHandler = async(e) =>{
        e.preventDefault();
        try {
            console.log('user = ',user)
            fetch(`${url}/users/${params.id}`,{
                method:'PATCH',
                body: JSON.stringify(user),
                headers: { 'content-type': 'application/json'
            }
            }).then(res=>res.json())
            .then(out=>{
                toast.success("Successfully updated")
                navigate('/')
            })
        } catch(err) {
            toast.error(err.message)
        }

    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className="display-3 text-success">Edit = {params.id}</h3>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <form autoComplete="" onSubmit={submitHandler}>
                        <div className="form-group mt-2">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" value={user.name} onChange={readValue} className="form-control" required />
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" value={user.email} onChange={readValue} className="form-control" required />
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="mobile">Mobile</label>
                            <input type="number" name="mobile" id="mobile" value={user.mobile} onChange={readValue} className="form-control" required />
                        </div>

                        <div className="form-group mt-2">
                            <input type="submit" value="Update" className="btn btn-primary" required />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Edit