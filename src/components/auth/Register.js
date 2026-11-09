
import { useState } from "react";
import axios from 'axios';

function Register(props) {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone: "",
        address: "",
        id_country: "",
        avatar: null,
        file: null,
    });

    const [errs, setErrs] = useState({});

    function handleInput(e) {
        const name = e.target.name;
        const value = e.target.value;

        setInputs((state) => ({
            ...state,
            [name]: value,
        }));
    }

    function handleFile(e) {
        const file = e.target.files[0];

        if (!file) {
            return;
        }

        const errorsSubmit = {};
        let flag = true;

        const nameFile = file.name;
        const typeFile = nameFile.split(".").pop().toLowerCase();
        const type = ["png", "jpg", "jpeg"];

        if (!type.includes(typeFile)) {
            errorsSubmit.avatar = "Chỉ được chọn file PNG, JPG, JPEG";
            flag = false;
        }

        if (file.size > 1024 * 1024) {
            errorsSubmit.avatar = "Dung lượng ảnh không được vượt quá 1MB";
            flag = false;
        }

        if (!flag) {
            setErrs(state => ({
                ...state,
                ...errorsSubmit
            }));

            setInputs(state => ({
                ...state,
                avatar: null,
                file: null
            }));

            return;
        }

        let reader = new FileReader();

        reader.onload = (e) => {
            setInputs((state) => ({
                ...state,
                avatar: e.target.result,
                file: file,
            }));

            setErrs(state => ({
                ...state,
                avatar: ""
            }));
        };

        reader.readAsDataURL(file);
    }

    function handleRegister(e) {
        e.preventDefault();

        const errorsSubmit = {};
        let flag = true;

        if (inputs.name === "") {
            errorsSubmit.name = "Vui lòng nhập UserName";
            flag = false;
        }

        if (inputs.email === "") {
            errorsSubmit.email = "Vui lòng nhập Email";
            flag = false;
        }

        if (inputs.password === "") {
            errorsSubmit.password = "Vui lòng nhập Password";
            flag = false;
        }

        if (inputs.password_confirmation === "") {
            errorsSubmit.password_confirmation = "Vui lòng nhập lại Password";
            flag = false;
        } else if (inputs.password !== inputs.password_confirmation) {
            errorsSubmit.password_confirmation = "Password không trùng khớp";
            flag = false;
        }

        if (inputs.phone === "") {
            errorsSubmit.phone = "Vui lòng nhập Phone";
            flag = false;
        }

        if (inputs.address === "") {
            errorsSubmit.address = "Vui lòng nhập Address";
            flag = false;
        }

        if (!inputs.avatar || !inputs.file) {
            errorsSubmit.avatar = "Vui lòng chọn Avatar";
            flag = false;
        }

        setErrs(errorsSubmit);

        if (!flag) {
            return;
        } else {
           const data = {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password,
                phone: inputs.phone,
                address: inputs.address,
                id_country: inputs.id_country,
                avatar: inputs.avatar
            };
            axios.post("http://127.0.0.1:8000/api/register", data)
            .then((res) =>{
                console.log("Kết quả API:", res.data);
                alert("Đăng ký thành công!");
            })
            .catch(err => console.log(err))
        }
    }

    return (
    <section id="form">
        <div className="col-sm-8 col-sm-offset-2">
            <div className="signup-form">
                <h2>New User Signup!</h2>

                <form onSubmit={handleRegister}>
                    <div className="row">
                        <div className="col-sm-6">
                            <input type="text" name="name" value={inputs.name} onChange={handleInput} placeholder="Full Name" />
                            {errs.name && <p>{errs.name}</p>}
                        </div>

                        <div className="col-sm-6">
                            <input type="email" name="email" value={inputs.email} onChange={handleInput} placeholder="Email Address" />
                            {errs.email && <p>{errs.email}</p>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <input type="password" name="password" value={inputs.password} onChange={handleInput} placeholder="Password" />
                            {errs.password && <p>{errs.password}</p>}
                        </div>

                        <div className="col-sm-6">
                            <input type="password" name="password_confirmation" value={inputs.password_confirmation} onChange={handleInput} placeholder="Confirm Password" />
                            {errs.password_confirmation && <p>{errs.password_confirmation}</p>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <input type="text" name="phone" value={inputs.phone} onChange={handleInput} placeholder="Phone" />
                            {errs.phone && <p>{errs.phone}</p>}
                        </div>

                        <div className="col-sm-6">
                            <input type="text" name="address" value={inputs.address} onChange={handleInput} placeholder="Address" />
                            {errs.address && <p>{errs.address}</p>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <input type="file" name="avatar" onChange={handleFile} />
                            {errs.avatar && <p>{errs.avatar}</p>}
                        </div>

                        <div className="col-sm-6">
                            <select name="id_country" value={inputs.id_country} onChange={handleInput}>
                                <option value="">-- Select Country --</option>
                            </select>
                            {errs.id_country && <p>{errs.id_country}</p>}
                        </div>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-default">
                            Signup
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
);
}

export default Register;
