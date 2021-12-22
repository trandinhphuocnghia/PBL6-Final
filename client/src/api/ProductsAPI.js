import {useState, useEffect} from 'react'
import axios from 'axios'



function ProductsAPI() {
    const [products, setProducts] = useState([])
    const [productTitle, setProductTitle] = useState([])
    const [callback, setCallback] = useState(false)
    //product search list
    const [listsearch,setListSearch] = useState([])
    const [category, setCategory] = useState('')
    const [images,setImages] = useState([])
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [newsearch,setNewSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)
    const [isChangeSearch,setIsChangeSearch] = useState(false)
    
    //get all products 
    const getProducts = async () => {
        //console.log(search)
        const res = await axios.get(`/api/products?limit=${page*9}&${category}&${sort}&title[regex]=${search}`)
        setProducts(res.data.products)
        setResult(res.data.result) 
    }
    //get product to add tolist recomended search lol
    const getList = async () => {
        //console.log(search)
        const res = await axios.get(`/api/products?limit=${page*9}&${category}&${sort}&title[regex]=${newsearch}`)
        setListSearch(res.data.products)
        //setProducts(res.data.products)
       // setResult(res.data.result) 
    }

    //get last id.
    
    useEffect(() =>{
        //first render
        getProducts()
       if(isChangeSearch){
            getList()
        }
       
    },[callback, category,isChangeSearch,newsearch,search,sort, page])
   // console.log(isChangeSearch)
  //  console.log(products)
    console.log(listsearch)
    //console.log(lastid)
    return {
        products: [products, setProducts],
        listsearch: [listsearch,setListSearch],
        callback: [callback, setCallback],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        newsearch : [newsearch,setNewSearch] ,
        isChangeSearch: [isChangeSearch,setIsChangeSearch],
        page: [page, setPage],
        result: [result, setResult],
        getProducts
        
    }
}

export default ProductsAPI
