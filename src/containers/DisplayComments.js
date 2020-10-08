import React, {useState ,useEffect} from 'react';
import axios from 'axios';

const DisplayComments = ({imageId}) => {
    
    const [comments, setComments] = useState([])
    const token = localStorage.getItem('jwt')

    
    useEffect(() => {
        //perform a GET request
        axios.get(`https://insta.nextacademy.com/api/v1/images/${imageId}/comments`, {
            headers: {
                'Authorization':  `Bearer ${token}`
            }
        })
        .then((result) => {
            console.log(result)
            setComments(result.data)
        })
        .catch((error) => {
            console.error(error)
        })
    
    }, [imageId,token])

    return (
        <>
        <div>
            {comments.map(item => <p>{item.content}</p>)}
        </div>
        </>
    )


}

export default DisplayComments;