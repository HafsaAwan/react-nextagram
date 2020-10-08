import React, {useState} from 'react';

const LivePreview = () => {

    const [previewImage, setPreviewImage] = useState(null)
    const [message, setMessage] = useState('')

    return(
        <div className="card">
            {previewImage ? (
                <img
                src={previewImage}
                width="50%"
                height="50%"
                />
                ) : (
                <h3  className="text-center">
                {message ? message : "Live Preview"}
                </h3>
            )}
        </div>
    )
}

export default LivePreview;