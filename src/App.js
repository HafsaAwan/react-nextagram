import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import NavBarDisplay from './components/NavBarDisplay';
import LoadingIndicator from './components/LoadingIndicator';
import HomePage from './pages/HomePage';
import UserProfilePage from './pages/UserProfilePage';
import { Switch, Route} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import { Modal } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import MyProfilePage from './pages/MyProfilePage';
import UploadPage from './pages/UploadPage';
import DisplayComments from './containers/DisplayComments'

function App() {
  /** 
   * The default boolean for loggedIn state would be
   * determined by whether JWT exists in localStorage
  */
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('jwt') !== null
  )
  
  const [users, setUsers] = useState([]);
  const [ isloading, setIsLoading] = useState(true);
  
  //for modal states
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  //for switching between login and signup form
  const [isLoginForm, setLoginForm] = useState(true);
  

  useEffect(() => {
    //perform a GET request
    axios.get('https://insta.nextacademy.com/api/v1/users')
    .then(result => {
      // If successful, we do stuffs with 'result'
      console.log(result.data)
      setUsers(result.data)
      setIsLoading(false)
    })
    .catch(error => {
      // If unsuccessful, we notify users what went wrong
      console.log(error)
      console.log('ERROR: ', error)
    })

  }, [])

  if(isloading){
    return <LoadingIndicator width="150px" height="150px" color="green" /> 
  }

  return (
    <>
      <ToastContainer />       
      <NavBarDisplay toggleModal={toggleModal} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Switch>
        <Route exact path="/" render = {(props) => <HomePage{...props} users={users}/>}/>
          
        <Route path="/users/:id" component={UserProfilePage} /> 

        <Route exact path="/profile" component={MyProfilePage} />
        <Route exact path="/upload" component={UploadPage} />
        {/* <Route exact path="/images/:imageId/comments" component={DisplayComments} /> */}
      </Switch>

      <Modal isOpen={modal} toggle={toggleModal} >
      
      {
        (isLoginForm) ? 
        <LoginForm setLoginForm={setLoginForm} toggleModal={toggleModal} setLoggedIn={setLoggedIn}/> : 
        <SignUpForm setLoginForm={setLoginForm} toggleModal={toggleModal}/>
      }
     
      </Modal>
      

    </>
  );
}

export default App;
