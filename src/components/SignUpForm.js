import React, { useState } from 'react';
import axios from 'axios'
import { Form, FormGroup, FormFeedback, Label, Input, FormText } from 'reactstrap';
import { Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const SignUpForm = ({setLoginForm, toggleModal}) => {
    const history = useHistory();
    //FORM VALIDATIONS
    const [delay, setDelay] = useState(null);
    const [usernameValid, setUsernameValid] = useState(null);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const checkUsername = newUsername => {
        // this should only trigger after you stop typing for 500ms
        console.log("Making API call to check username!");
        axios
        .get(
            `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`
        )
        .then(response => {
            console.log(response.data);
            if (response.data.valid) {
            setUsernameValid(true);
            } else {
            setUsernameValid(false);
            }
        });
    };

    const handleInput = e => {
        // clears queue so that the old keystrokes don't trigger axios call
        if(e.target.name === "username"){
            clearTimeout(delay);
            const newUsername = e.target.value;
            setUsername(newUsername);

            // put each new keystroke into the queue
            const newDelay = setTimeout(() => {
            checkUsername(newUsername);
            }, 500);

            setDelay(newDelay);    
        }
        if(e.target.name === "email"){
            setEmail(e.target.value)
        }
        if(e.target.name === "password"){
            setPassword(e.target.value)
        }
    };
    
    const getInputProp = () => {
        if (!username.length) {
          return null;
        }
    
        if (username.length <= 6) {
          return { invalid: true };
        }
    
        if (usernameValid) {
          return { valid: true };
        } else {
          return { invalid: true };
        }
    };
    
    const getFormFeedback = () => {
        if (!username.length) {
            return null;
        }

        if (username.length <= 6) {
            return <FormFeedback invalid>Must be at least 6 characters</FormFeedback>;
        }

        if (usernameValid) {
            return <FormFeedback valid>Sweet! That name is available</FormFeedback>;
        } else {
            return <FormFeedback invalid>Sorry! Username is taken</FormFeedback>;
        }
    };

    // Sign Up API
    const saveUserData = () => {
        
        axios({
            method: 'POST',
            url: 'https://insta.nextacademy.com/api/v1/users/',
            data: {
            username: username,
            email: email,
            password: password
            }
            })
            .then(response => {
                console.log(response)
                let user= response.data.user
                toggleModal()
                setPassword("")
                setUsername("")
                setEmail("")
                history.push(`/users/${user.id}`)

                toast.success("Signed Up successfully!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                  });
            })
            
            .catch(error => {
                console.error(error.response) // so that we know what went wrong if the request failed
        })
    }
    return (
    <>
        <ModalHeader toggle={toggleModal}>Sign Up</ModalHeader>
        <ModalBody>                 
            <Form>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleInput}
                        {...getInputProp()}
                    />
                    {getFormFeedback()}
                    <FormText>Enter a username between 6 and 20 characters</FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                        type="email" 
                        name="email" 
                        value={email}
                        onChange={handleInput} 
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input 
                        type="password" 
                        name="password"
                        value={password}
                        onChange={handleInput} 
                    />
                </FormGroup>
            </Form>
            <p>Already a member? <span onClick={()=> setLoginForm(true)} style={{color:"blue",cursor:"pointer"}}>Log in here</span></p>
        </ModalBody>
        <ModalFooter>
            {/* can change the button to input submit field, check jwleong code */}
            <Button color="primary" disabled={!usernameValid} onClick={()=>saveUserData()}>Sign Up</Button>{' '}
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
    </>
    );

}

export default SignUpForm;