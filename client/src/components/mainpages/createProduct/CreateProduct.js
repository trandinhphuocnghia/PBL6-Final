import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import {useHistory, useParams} from 'react-router-dom'

const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: '',
    dimensions: '',
    period:'',
    material:'',
    condition:'',
    category: '',
    _id: ''
}

function CreateProduct() {
    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [Nproductid,setNproductid] = useState('')
    const [loading, setLoading] = useState(false)
    const [mainimg, setMainimg] = useState(false)
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    const history = useHistory()
    const param = useParams()

    const [products] = state.productsAPI.products
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.productsAPI.callback

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            products.forEach(product => {
                if(product._id === param.id) {
                    setProduct(product)
                    setMainimg(product.mainimg)
                }
            })
        }else{
            setOnEdit(false)
            setProduct(initialState)
           setMainimg(false)
        }
    }, [param.id, products])

    
    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            const file = e.target.files[0]
            
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
            setLoading(false)
            setMainimg(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const styleUpload = {
        display: mainimg ? "block" : "none"
    }
    const handleDestroy = async () => {
        try {
            if(!isAdmin) return alert("You're not an admin")
            setLoading(true)
            await axios.post('/api/destroy', {public_id: mainimg.public_id}, {
                headers: {Authorization: token}
            })
            setLoading(false)
            setMainimg(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    

    const handleChangeInput = e =>{
        const {name, value} = e.target
      //  console.log(value)
        setProduct({...product, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
           if(!mainimg) return alert("No Image Upload")
          //  console.log(images)
            if(onEdit){
                await axios.put(`/api/products/${product._id}`, {...product,mainimg}, {
                    headers: {Authorization: token}
                })
            setCallback(!callback)
            setNproductid(product.product_id)
            history.push(`/product`)
            
            }else{
                await axios.post('/api/products', {...product,mainimg}, {
                    headers: {Authorization: token}
                })
            setCallback(!callback)
            setNproductid(product.product_id)   
            history.push(`/uploadimg/${product.product_id}`) 
            }
            
            
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    /*const styleUpload = {
        display: images ? "block" : "none"
    }*/
    return (
      
        <>
        {
        onEdit ? <h1 className="step">Updates your product</h1> :
        <h1 className="step">Step 1: Informations</h1>
        }
        <div className="create_product">
        
            <form className="formcreate" onSubmit={handleSubmit}>
            
            <div className="upload">
            
                <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                {
                    loading ? <div id="file_img"><Loading /></div>

                    :<div id="file_img" style={styleUpload}>
                        <img src={mainimg ? mainimg.url : ''} alt=""/>
                        <span onClick={handleDestroy}>X</span>
                    </div>
                }
                
            </div>                

                <div className="row">
                    <label htmlFor="product_id">Product ID</label>
                    <input type="text" name="product_id" id="product_id" required
                    value={product.product_id} onChange={handleChangeInput} disabled={onEdit} />
                </div>

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required
                    value={product.title} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" required
                    value={product.price} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                    value={product.description} rows="5" onChange={handleChangeInput} />
                </div>

                <div className="row specifi">
                    <label htmlFor="content">Specifications</label>
    
                    <input type="text" name="dimensions" id="dimensions" required value={product.dimensions} onChange={handleChangeInput} placeholder="dimensions"></input>
                    <input type="text" name="period" id="period" required value={product.period} onChange={handleChangeInput} placeholder="period"></input>
                    <input type="text" name="material" id="material" required value={product.material} onChange={handleChangeInput} placeholder="material"></input>
                    <input type="text" name="condition" id="condition" required value={product.condition} onChange={handleChangeInput} placeholder="condition"></input>
                </div>

                <div className="row">
                    <label htmlFor="categories">Categories: </label>
                    <select name="category" value={product.category} onChange={handleChangeInput} >
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button className="btncreate" type="submit">{onEdit? "Update" : "Create"}</button>
            </form>
        </div>
        </>
    )
}

export default CreateProduct
