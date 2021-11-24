import Axios from "axios";
import React, { useEffect, useState } from "react";
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'


function UpdateImg() {
    const params = useParams()
    const [image,setImage] = useState([])
    useEffect(() => {
        if(params.id){

         
            const getimage = async () => {
                const res = await Axios.get(`/api/getimgupdate/${params.id}`)
               
                setImage(res.data.data)
            }
            getimage()
        }
    },[params.id])

    return (
        <>
        {
            image.map(img=>(
                <img src={img.url}/>
            ))
        }
        </>
    )

}

export default UpdateImg