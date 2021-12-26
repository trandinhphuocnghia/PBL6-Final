import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
import Slider from "react-slick";
import 'react-medium-image-zoom/dist/styles.css'
import heart from '../../../img/heart2.svg'
import Axios from 'axios'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import left from '../../../img/left.svg'
import gift from '../../../img/gift.jpg'
import gift2 from '../../../img/ideas.png'
import Footer from '../../footer/Footer';

function DetailProduct() {
    const params = useParams()
   
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const [products] = state.productsAPI.products
    const [list] = state.productsAPI.listsearch
    const addwishlist = state.userAPI.addWishList
    const addCart = state.userAPI.addCart
    const [detailProduct, setDetailProduct] = useState([])
    //const [detailProduct2, setDetailProduct2] = useState([])
    const [carouselImage,setCarouselImage] = useState()
    const [image,setImage] = useState([])
    const { getProducts } = state.productsAPI
    useEffect(() =>{
        if(params.id){
            if(isAdmin){
            products.forEach(product => {
                if(product._id === params.id) {
                    setDetailProduct(product) 
                    setCarouselImage(product.images[0])
                }
            })}else{
                products.forEach(product => {
                    if(product._id === params.id) {
                        setDetailProduct(product) 
                        setCarouselImage(product.images[0])
                    }
                })
                list.forEach(product => {
                    if(product._id === params.id) {
                        setDetailProduct(product) 
                        
                        setCarouselImage(product.images[0])
                    }
                })
            }
            const getimage = async () => {
                const res = await Axios.get(`/api/getimg/${params.id}`)
                setImage(res.data.data)
            }
            getimage()
        }
        
       
    },[params.id, products])
    
    console.log(products.length)
    console.log(list)

    //console.log(image)
    //
    useEffect(() => {
        getProducts()
    },[])

    //zoom//


    if(detailProduct.length === 0) return null;

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    return (
        <>
       
                    

        {
            isAdmin ?
            <>
        <div className="fun">
        <h1 className="step">Product details</h1>
        <Link  className="fun1" to="/product">
            <img className="funmini" src={left}/>
            <p>Return</p></Link>
        </div>
            </>
            :
            ''
        }
            <div className="detail">
               { !carouselImage.url ?  <img className="mainimg" id="featured" src={detailProduct.mainimg.url} alt="" width="1000" /> : <div className="detailimg">
                
                
                 <img className="mainimg" id="featured" src={carouselImage.url} alt="" width="1000" />

                  <div className="slide-wrapper">
                 
                    <div className="slider">
                      {
                          image.map((image,index) => (
                            <img key={index} onClick={() => setCarouselImage(image)} className="thumbnail" src={image.url} alt="" width="1000" />
                          ))
                      }
                    </div> 
                  </div>  
                </div>}
                
              
                
                
                <div className="box-detail">
                    <div className="row">
                        <h2>{detailProduct.title}</h2> 
                    </div>
                    <div className="row">
                    <div className="pricebox">
                    <span>$ {detailProduct.price}</span>
                    {
                       detailProduct.sold === 0 ? 
                    <p>Sold: {detailProduct.sold}</p>
                    :   <p>
                        Sold: {detailProduct.sold}
                        </p>
                    }
                    
                    </div>
                    {
                       !isAdmin ? 
                    <div className="pricebtn">
                    <Link  className="cart"
                    onClick={() => addCart(detailProduct)}>
                        ADD TO BASKET
                    </Link>
                    <Link className="wishlistbtn"
                    onClick={() => addwishlist(detailProduct)}
                    >   <img className="wsicon" src={heart}/>
                        <p className="ws">Add to wishlist</p></Link>
                    </div>
                    :
                    ''
                    }
                    </div>
                    <div className="descriptionproduct">
                    <p className="title">Description: </p>
                    <p>{detailProduct.description}</p>
                    </div>
                    <div className="descriptionproduct">
                    <p className="title">Specifications: </p>
                    <div className="dpdata">
                    <span>dimensions</span>
                    <p>{detailProduct.dimensions}</p>
                    <span>original</span>
                    <p>{detailProduct.origin}</p>
                    <span>material</span>
                    <p>{detailProduct.material}</p>
                    <span>age suggestion</span>
                    <p>{detailProduct.age}</p>
                   
                    </div>
                    </div>
                    
                    
                </div>
            </div>

            
            { !isAdmin ?
            <>


            <div>

        
            <h1 className="titledetail2 alone">
                You might also be interested in...
            </h1>
            
                <div className="products">
                    
                      {  
                        products.map(product => {
                            return product.category === detailProduct.category && product._id !== detailProduct._id
                                ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>
                <div className="products">
                    {
                        list.map(product => {
                            return product.category === detailProduct.category && product._id !== detailProduct._id
                                ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </div>

            <div className="phonecall">
            <p>To make an enquiry call <span>+0848071200</span></p>
        </div>
        </>
        :
        ''
        }
        <Footer/>
        </>
    )

    //
    //zoom effect
     
        
    }

export default DetailProduct
