import React, {useState, useContext, useEffect} from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'
import Loading from '../utils/loading/Loading'
import { useHistory, useLocation, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import warning from '../../../img/warning.svg'
import checkic from '../../../img/check.svg'

function UploadImg() {
    const state = useContext(GlobalState)
    const [images, setImages] = useState([])
    const [isAdmin] = state.userAPI.isAdmin
    
    const [token] = state.token
    const [loading, setLoading] = useState(false)
    const { search } = useLocation()
    const params = useParams()
    const history = useHistory()
    const [check,setCheck] = useState(false)
   
    const [imagemores, setImagemore] = useState([])
    
    const styleUpload = {
        display: images ? "block" : "none"
    }

    const getimage = async () => {
        const query = new URLSearchParams(search)
      //  console.log(query.get("id"))
        const res = await axios.get(`/api/getimg/${query.get("id")}`)
       console.log(res.data.data)
        setImagemore(res.data.data)
    }
    console.log(imagemores)
   /* const handleDestroy = async () => {
        try {
            if(!isAdmin) return alert("You're not an admin")
            setLoading(true)
            await axios.post('/api/destroy', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }*/
    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
           
           /* const file = e.target.files[0]
                if(!file) return alert("File not exist.")

            if(file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            setLoading(false)*/
        //setImages(res.data)
            const files = e.target.files
          //  console.log(files)
            var i=0;
            let formData = new FormData()
            
            for (i; i<files.length;i++){
                formData.append('files', files[i])
            }
            setLoading(true)
            const res = await axios.post(`/api/uploadmany/${params.id}`, formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
           
            setLoading(false)
            setCheck(true)
            if(res.data.data){
            getimage()
            }
           // setImages(res.data.data[0])
            //console.log(res.data.data)
           
            
             //history.push('/product')
          /*  for ( i; i<files.length;i++){
            console.log(i)    
            if(!files[i]) return alert("File not exist.")

            if(files[i].size > 1024 * 1024) // 1mb
                return alert(files[i].name+" "+"Size too large!")

                console.log(files[i].type)
            if(files[i].type !== 'image/jpeg' && files[i].type !== 'image/png') // 1mb
                return alert(i+" "+"File format is incorrect.")

            let formData = new FormData()
            formData.append('file', files[i])

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            setLoading(false)
            setImages(res.data)
           console.log(res.data.url)
        }*/
        } catch (err) {
           // alert(err.response.data.msg)
        }
    }
   
 
   
    return(
        <>
        <div className="containter">
                <div className="uploadContainer">
                    <div className="fun">
                    <h1 className="step">Step 2: For more images</h1>
                    </div>

                    <div className="upload">
                        <input type="file" name="files" id="files" onChange={handleUpload} multiple />


                    </div>
                </div>
                <div>
                   
                </div>
                </div>
                        {
            check === true ? 
            <div className="alertcontainer">
            <div className="alert">
            <img className="iconup" src={checkic}/>
            <h1>Successful create new product</h1>
            </div>
            <div className="alertbtn">
            <Link className="btn1" to="/product">Product</Link>
            <Link className="btn1 color" to="/create_product">Create new one</Link>
            </div>
            </div>
            :
            <div className="alert warning">
            <img className="iconup" src={warning}/>
            <h1>Please select more images</h1>
            </div>
            }
        </>
    )
}

export default UploadImg;


