import React, { useState } from 'react';
import { Button, ModalHeader, ModalBody } from 'reactstrap';
import icon from '../upload_icon.png'
import { Form, FormGroup, Input, FormText } from 'reactstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const UploadPage = ({toggle}) => {
    const [previewImage, setPreviewImage] = useState(null)
    const [message, setMessage] = useState('')
    const history = useHistory();

    const [imageFile, setImageFile] = useState(null)

    const handleFile = (e) => {
       setPreviewImage(URL.createObjectURL(e.target.files[0]))
        setImageFile(e.target.files[0]) 
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let JWT = localStorage.getItem("jwt");
        // Formdata object to hold the image file to send to the server
        let formData = new FormData();
        // Append the key:value pair to the formData object
        formData.append("image", imageFile);

        axios.post("https://insta.nextacademy.com/api/v1/images/", formData, {
            headers: { Authorization: `Bearer ${JWT}` }
            })
            .then(response => {
            if (response.data.success) {
                setMessage("Image Uploaded Successfully!")
                setPreviewImage(null)
                setImageFile(null)
                toggle()
                history.push("/profile")
            }
            })
            .catch(error => {
            console.log(error.response);
            });
    }

    return(
        <div>

                <ModalHeader toggle={toggle}>Upload Image</ModalHeader>
                <ModalBody className="d-flex flex-column align-items-center">
                    <div className="card col-6 align-items-center">
                        {previewImage ? (
                            <img
                            src={previewImage}
                            width="80%"
                            height="80%"
                            alt=""/>
                            ) : (
                            <h3  className="text-center">
                            {message ? message : <img src={icon} width="50%" alt="" />}
                            </h3>
                            
                        )}
                    </div>
                    <div className="col-6 mt-5">
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Input
                                    type="file"
                                    name="image-file"
                                    onChange={handleFile}
                                />
                                <FormText color="muted">
                                    Make sure the image being uploaded is a supported format.
                                </FormText>
                            </FormGroup>
                            <hr/>
                            <Button type="submit" color="primary" >
                                Upload Image
                            </Button>
                        </Form>
                    </div>
                    
                    
                </ModalBody>
            
        </div>

        
    )
}

export default UploadPage;


