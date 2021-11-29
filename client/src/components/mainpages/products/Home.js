import React, {useContext, useEffect, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import Filters from './Filters'
import LoadMore from './LoadMore'
import Img from '../../../img/banner.jpg'
import Footer from '../../footer/Footer'
import Slider from '../../Slider/Slider'
import { Link } from 'react-router-dom'
import right from '../../../img/right.svg'
import Slider2 from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "flex", background: "goldenrod",width:"50px",height:"50px",justifyContent:"center",alignItems:"center",borderRadius:'50%',marginRight:'5px' }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "flex", background: "goldenrod",width:"50px",height:"50px",justifyContent:"center",alignItems:"center",borderRadius:'50%',marginLeft:'5px',zIndex:'1111'  }}
        onClick={onClick}
      />
    );
  }
function Homes() {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const [producttt,setProducttt] = useState([])
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.productsAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)


    const handleCheck = (id) =>{
        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked 
        })
        setProducts([...products])
    }

    
    

    const deleteProduct = async(id, public_id) => {
        try {
            setLoading(true)
            const destroyImg = axios.post('/api/destroy', {public_id},{
                headers: {Authorization: token}
            })
            const deleteProduct = axios.delete(`/api/products/${id}`, {
                headers: {Authorization: token}
            })

            await destroyImg
            await deleteProduct
            setCallback(!callback)
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const checkAll = () =>{
        products.forEach(product => {
            product.checked = !isCheck
        })
        setProducts([...products])
        setIsCheck(!isCheck)
    }

    const deleteAll = () =>{
        products.forEach(product => {
            if(product.checked) deleteProduct(product._id, product.images.public_id)
        })
    }

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
  
      };




    if(loading) return <div><Loading /></div>
    return (
        <>
       
        <div className="hero-image">
           <div className="Infor">
               <div className="Intro">
                   <h1>Who are we?</h1>
                  
                   <p>Antique!! Được thành lập năm 2020,
                       với mục đích mang lại những sản phẩm có tuổi đời cao, 
                       nhưng chất lượng cũng như hiệu quả sử dụng vẫn còn.
                       Hiện nay, sản lượng sản phẩm chưa đa dạng, chúng tôi không ngừng tìm kiếm,
                       để mang lại những sản phẩm độc lạ cho các bạn.
                   </p>
                   <h3>WELLCOME to our website!</h3>
               </div>
           </div> 
            <div className="Img">
                <img src={Img}></img>
            </div>
        </div>      

        <div className="Title">
            <h1 className="titledetail">
                <p>Some new products</p>
            </h1>
        </div>

       

        
        
        <Slider2 {...settings}>
            {
                products.map(product => {
                    return <ProductItem key={product._id} product={product}
                    isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} />
                })
            } 
        </Slider2>


        <div className="Title">
        <Link className="mproducts" to="/product"><p>For more products</p>
        <img src={right}></img>
        </Link>
        </div>
        
        {products.length === 0 && <Loading />}
        <div className="Title">
            <h1 className="titledetail">
                Our Store
            </h1>
        </div>
        <Slider/>
        <div className="phonecall">
            <p>To make an enquiry call <span>+0848071200</span></p>
        </div>
        <Footer />
        </>
    )
}

export default Homes
