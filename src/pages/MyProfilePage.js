import React, { useState }  from 'react'
import UserImages from '../containers/UserImages';
import UploadPage from './UploadPage';
import { Button, Modal} from 'reactstrap';


const MyProfilePage = () => {
    
    
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    //when retrieve from localstorage, convert string to object 
    let user = JSON.parse(localStorage.getItem("user"))
    
    return (
        <div>
            <div className="jumbotron">
                <h1 className="display-4">Hello, {user.username}!</h1>
                <p className="lead">Welcome to your image gallery.</p>
                <hr className="my-4"/>

                <Button color="primary" onClick={toggle}>Upload Image</Button>
                <Modal isOpen={modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
                toggle={toggle} >
      
                    <UploadPage toggle={toggle}/>
                
                </Modal>
                
            </div>
            <div className="container-fluid d-flex flex-wrap">
              <UserImages userId ={user.id}/>
            </div>
        </div>
        

    )
}
export default MyProfilePage;
