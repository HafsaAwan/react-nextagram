import React, {useState} from 'react';

const UploadPage = () => {

    const [imageFile, setImageFile] = useState(null)

    const handleFile = () => {
        setPreviewImage(URL.createObjectURL(e.target.files[0]))
        setImageFile(e.target.files[0]) 
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return(
        <>
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
            <Button type="submit" color="primary">
                Upload
            </Button>
        </Form>
        </>
    )
}

export default UploadPage;