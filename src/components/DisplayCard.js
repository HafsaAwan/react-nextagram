import React from 'react';
import UserImages from '../containers/UserImages';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Button
  } from 'reactstrap';

const DisplayCard = ({userInfo}) => {
    
    return (
        <div className ="row d-flex flex-wrap" style={{backgroundColor:"lightgray", marginTop:"10px"}}>
            <div className ="col-3">

                <Card className ="d-flex align-items-center" style={{width:"25vw",margin:"0px", borderStyle:"none", backgroundColor:"lightgray", textAlign:"center"}}>

                    <CardImg className="rounded-circle"top width="100%" src={userInfo.profileImage} alt="Card image cap" style={{width:"80%", border:"4px solid white", marginTop:"15px"}} />
                    <CardBody >
                    <CardTitle>{userInfo.username}</CardTitle>
                    
                    <CardText>ID: {userInfo.id}</CardText>
                    <Button color="primary">See More</Button>
                    </CardBody>

                </Card>

            </div>
            
            <div className ="col-9 d-flex flex-wrap" style={{paddingLeft:"10px"}}>
                <UserImages userId ={userInfo.id}/>
            </div>
            
        </div>
    );
     
      
      

}
export default DisplayCard;