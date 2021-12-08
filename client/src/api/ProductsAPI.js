import {useState, useEffect} from 'react'
import axios from 'axios'


function ProductsAPI() {
    const [products, setProducts] = useState([])
    const [productTitle, setProductTitle] = useState([])
    const [callback, setCallback] = useState(false)
    const [category, setCategory] = useState('')
    const [images,setImages] = useState([])
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)
      
    const getProducts = async () => {

        const res = await axios.get(`/api/products?limit=${page*9}&${category}&${sort}&title[regex]=${search}`)
        setProducts(res.data.products)
        setResult(res.data.result)
        
    }
    
    useEffect(() =>{
        getProducts()
         
    },[callback, category, sort, search, page])


   // console.log(products[1].images)
    return {
        products: [products, setProducts],
        callback: [callback, setCallback],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult],
        getProducts
        
    }
}

export default ProductsAPI
