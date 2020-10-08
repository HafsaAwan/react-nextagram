import React, {useState,useEffect} from 'react';
import axios from 'axios';
import LoadingIndicator from '../components/LoadingIndicator'
import DisplayComments from './DisplayComments';
import {
  Card, Button, CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody
} from 'reactstrap';
const UserImages = ({userId}) => {
    
    //console.log(userId)
    const [userImages, setUserImages] = useState([]);
    const [isloading, setIsLoading] = useState(true);

    useEffect(() => {
        //perform a GET request
        axios.get(`https://insta.nextacademy.com/api/v2/images?userId=${userId}`)
        .then(result => {
          // If successful, we do stuffs with 'result'
          //console.log(result)
          setUserImages(result.data)
          setIsLoading(false)

        })
        .catch(error => {
          // If unsuccessful, we notify users what went wrong
          console.log('ERROR: ', error)
        })
    
      }, [userId])

      if(isloading){
        return <LoadingIndicator width="100px" height="100px" color="blue" /> 
      }
      //console.log(userImages)
      return (
        
          <div className="d-flex flex-wrap">
            {userImages.map((eachImg,index) => {
                
                return (
                    <Card>
                      <CardImg top width="100%" src={eachImg.url} alt="Card image cap" />
                      <CardBody>
                        
                        <CardText><DisplayComments imageId={eachImg.id}/></CardText>
                        
                      </CardBody>
                    </Card> 
                )
                 
            })}
          </div> 
        
      );

}
export default UserImages;
{/* <div>
  <img className="shadow p-2 mb-3 bg-white rounded mx-auto d-block" key={`${userId}-images${index}`} src={eachImg.url} style={{width:"30vw",height:"35vh"}} alt="user images"/>
  
  <DisplayComments imageId={eachImg.id}/>
</div> */}