import axios, { Axios } from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Login(props){
    const navigate = useNavigate()
    const [inputs, setInputs] =useState({
        email: "",
        password: ""
    })

    const [errs, setErrs] = useState({})

    useEffect(() =>{
        
    }, [])
    function handleInput(e){
        const name = e.target.name
        const value = e.target.value

        setInputs(state =>({
            ...state, [name]:value
        }))
    }

    function handleLogin(e){
        e.preventDefault();

        const errorsSubmit = {};
        let flag = true;

        if (inputs.email === "") {
            errorsSubmit.email = "Vui lòng nhập Email";
            flag = false;
        }

        if (inputs.password === "") {
            errorsSubmit.password = "Vui lòng nhập Password";
            flag = false;
        }

        setErrs(errorsSubmit);

        if (!flag) {
            console.log("Dữ liệu chưa hợp lệ!");
        }else{
            const data = {
                email: inputs.email,
                password: inputs.password,
                level: 0
            };
            axios.post("http://127.0.0.1:8000/api/login", data)
            .then((res) =>{
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('Auth', JSON.stringify(res.data.Auth))
                alert("Đăng nhập thành công!");
            })
            .catch(err => console.log(err))
        }
    }
    return (
        <section id="form">
            <div className="col-sm-4 col-sm-offset-1">
                <div className="login-form">
                    <h2>Login to your account</h2>

                    <form onSubmit={handleLogin}>

                        <input type="email" name="email" value={inputs.email} onChange={handleInput} placeholder="Email Address"/>
                        {errs.email && <p>{errs.email}</p>}

                        <input type="password" name="password" value={inputs.password} onChange={handleInput} placeholder="Password"/>

                        {errs.password && <p>{errs.password}</p>}

                        <button type="submit" className="btn btn-default">
                            Login
                        </button>

                    </form>
                </div>
            </div>
        </section>
    );
}
export default Login