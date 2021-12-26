import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { GlobalState } from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import { useHistory, useParams } from 'react-router-dom'

const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: '',
    dimensions: '',
    origin: '',
    material: '',
    age: '',
    category: '',
    _id: ''
}

function CreateProduct() {
    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [lastid,setLastid] = useState('')
    const [Nproductid, setNproductid] = useState('')
    const [loading, setLoading] = useState(false)
    const [mainimg, setMainimg] = useState(false)
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [id, setId] = useState()
    const history = useHistory()
    const param = useParams()

    const [products] = state.productsAPI.products
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.productsAPI.callback

    const getTheLastId = async () =>{
        const res = await axios.get(`api/products/lastid`)
        setLastid(res.data.lastid)
    }
    useEffect(() => {
        if (param.id) {
            setOnEdit(true)
            products.forEach(product => {
                if (product._id === param.id) {
                    setProduct(product)
                    setMainimg(product.mainimg)
                }
            })
        } else {
            setOnEdit(false)
            setProduct(initialState)
            setMainimg(false)
            getTheLastId()
        }
    }, [param.id, products])

    //console.log(lastid)
    console.log(product._id)
    const handleUpload = async e => {
        e.preventDefault()
        try {
            if (!isAdmin) return alert("You're not an admin")
            const file = e.target.files[0]

            if (!file) return alert("File not exist.")

            if (file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if (file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: token }
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
            if (!isAdmin) return alert("You're not an admin")
            setLoading(true)
            await axios.post('/api/destroy', { public_id: mainimg.public_id }, {
                headers: { Authorization: token }
            })
            setLoading(false)
            setMainimg(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }



    const handleChangeInput = e => {
        const { name, value } = e.target
        //  console.log(value)
        setProduct({ ...product, [name]: value })
        console.log(product)
    }

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            if (!isAdmin) return alert("You're not an admin")
            if (!mainimg) return alert("No Image Upload")
            //  console.log(images)
            if (onEdit) {
                await axios.put(`/api/products/${product._id}`, { ...product, mainimg }, {
                    headers: { Authorization: token }
                })
                setCallback(!callback)
                setNproductid(product.product_id)
                history.push(`/product`)

            } else {
                console.log(product.public_id)

                const res = await axios.post('/api/products', { ...product, product_id: (parseInt(lastid) + 1) + "", mainimg }, {
                    headers: { Authorization: token }
                })
                setCallback(!callback)
                setNproductid(product.product_id)
               console.log(res.data)
                history.push(`/uploadimg/${ (parseInt(lastid) + 1)}?id=${res.data._id}`)
            }


        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    //console.log(product)
    /*const styleUpload = {
        display: images ? "block" : "none"
    }*/
    return (

        <div className="containerimg">

            {
                onEdit ? <h1 className="step">Updates your product</h1> :
                    <h1 className="step colorh1">Step 1: Informations</h1>
            }
            <div className="create_product">

                <form className="formcreate" onSubmit={handleSubmit}>

                    <div className="upload">

                        <input type="file" name="file" id="file_up" onChange={handleUpload} />
                        {
                            loading ? <div id="file_img"><Loading /></div>

                                : <div id="file_img" style={styleUpload}>
                                    <img src={mainimg ? mainimg.url : ''} alt="" />
                                    <span onClick={handleDestroy}>X</span>
                                </div>
                        }

                    </div>

                    <div className="row">
                        <label htmlFor="product_id">Product ID</label>
                        {onEdit ?
                            <input type="text" name="product_id" id="product_id" required
                                value={product.product_id} onChange={handleChangeInput} disabled={onEdit} />
                            :
                            <input type="text" name="product_id" id="product_id" required
                                value={(parseInt(lastid) + 1) + ""} onChange={handleChangeInput} disabled={!onEdit} />
                        }
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
                        <input type="text" name="origin" id="origin" required value={product.origin} onChange={handleChangeInput} placeholder="original"></input>
                        <input type="text" name="material" id="material" required value={product.material} onChange={handleChangeInput} placeholder="material"></input>
                        <input type="text" name="age" id="age" required value={product.age} onChange={handleChangeInput} placeholder="age"></input>
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

                    <button className="btncreate" type="submit">{onEdit ? "Update" : "Create"}</button>
                </form>
            </div>
        </div>
    )
}

export default CreateProduct
