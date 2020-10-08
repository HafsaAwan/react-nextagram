import React, {useState,useEffect} from 'react';
import axios from 'axios';
//import LoadingIndicator from '../components/LoadingIndicator'
import UserImages from '../containers/UserImages';

import {useParams} from "react-router-dom";

const UserProfilePage = () => {
    let user = useParams();
    
    //console.log(user.id)

    const [users, setUsers] = useState({});

    useEffect(() => {
        //perform a GET request
        axios.get(`https://insta.nextacademy.com/api/v1/users/${user.id}`)
        .then(result => {
          // If successful, we do stuffs with 'result'
          //console.log(result)
          setUsers(result.data)

        })
        .catch(error => {
          // If unsuccessful, we notify users what went wrong
          console.log('ERROR: ', error)
        })
    
      }, [user.id])

      //console.log(users)
      return (
        <>
            <div style={{margin: "15px"}}>
                <h3>@{users.username}</h3>
                <img src={users.profileImage} className="rounded-circle" width="250" alt=""/>
            </div>  
            <div className="container-fluid d-flex flex-wrap">
              <UserImages userId ={users.id}/>
            </div>
        </>    
        
      );
    

  }
  
  export default UserProfilePage