import React, {useState} from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const LoginForm = ({setLoginForm, toggleModal, setLoggedIn}) => {
    
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    

    
    const handleInput = e => {
        if(e.target.name === "username"){
            setUsername(e.target.value); 
        }
        if(e.target.name === "password"){
            setPassword(e.target.value)
        }
    }

    const handleLogin = () => {
        axios({
            method: 'post',
            url: 'https://insta.nextacademy.com/api/v1/login',
            data: {
              username: username,
              password: password
            }
          })
        .then(result => {
            console.log(result)
            localStorage.setItem('jwt', result.data.auth_token)
            setLoggedIn(true)
            toggleModal()
            
            

            toast.success('🦄 Successfully signed in!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
            //when save to localstorage, convert object to string - to access user in other component
            localStorage.setItem("user", JSON.stringify(result.data.user))
            history.push("/profile")
        })
        .catch(error => {
            // If unsuccessful, we notify users what went wrong
            console.log('ERROR: ', error)
            toast.error('🦄 Sign in error. Please try again', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }


    return (
    <>
        <ModalHeader toggle={toggleModal}>Login</ModalHeader>
        <ModalBody>                 
            <Form>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="text" name="username" value={username} onChange={handleInput} />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" value={password} onChange={handleInput} />
                </FormGroup>
            </Form>
            <p>New member? <span onClick={()=> setLoginForm(false)} style={{color:"blue",cursor:"pointer"}}>Sign up Here!</span></p>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={handleLogin}>Login</Button>{' '}
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
    </>

    );

}

export default LoginForm;