import { useEffect, useState } from "react"
import axios from "axios";


function Home(props){

    const [mode, setMode] = useState("Login")

    function handleRegister(event){
        event.preventDefault();
        let username = document.getElementById('reg_username').value
        let password = document.getElementById('reg_password').value

        let formdata = new FormData()
        formdata.append("username", username)
        formdata.append("password", password)

        axios.post('http://localhost:8000/user/create/',  formdata)
            .then(response => {
                console.log(response.data.message)
            })
            .catch(error => {
                console.error('Error posting data:', error)
        })

        setMode("Login")
    };

    const [users, setUsers] = useState([])
    function fetchUserData(){
        axios.get('http://127.0.0.1:8000/user/')
            .then(response => {
                setUsers(response.data)
                console.log(users)
            })
            .catch(error => {
                console.error('Error fetching data:', error)
        })
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    function checkUserCredentials(username, password) {
        for (let user of users) {
            if (user.username === username && user.password === password) {
                sessionStorage.setItem("user_id", user.id);
                return true;
            }
        }
        return false;
    }
    

    function handleLogin(event){
        event.preventDefault();
        let username = document.getElementById('log_username').value
        let password = document.getElementById('log_password').value

        if (checkUserCredentials(username, password)) {
            props.logged()
        } else {
            alert("Username and password do not match.");
        }
    }

    return (
        <>
            {mode == "Login" ? 
                <div className="login_box">
                    <form action="" onSubmit={handleLogin}>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="log_username" name="username" required />
                        <label htmlFor="password">Password</label>
                        <input type="password" id="log_password" name="password" required />
                        <p onClick={() => setMode("Signup")}>Don't have an account?</p>
                        <button type="submit">Login</button>
                    </form>
                </div>
                :
                <div className="signup_box">
                    <form action=""  onSubmit={handleRegister}>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="reg_username" name="username" required />
                        <label htmlFor="password">Password</label>
                        <input type="password"  id="reg_password" name="password" required />
                        <label htmlFor="cpassword">Confirm Password</label>
                        <input type="password" id="reg_cpassword" name="cpassword" required />
                        <p onClick={() => setMode("Login")}>Already have an account?</p>
                        <button type="submit">Signup</button>
                    </form>
                </div>
            }
            
        </>
    )
}

export default Home