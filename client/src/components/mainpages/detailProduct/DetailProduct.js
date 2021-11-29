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
function DetailProduct() {
    const params = useParams()
   
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const [products] = state.productsAPI.products
    const addwishlist = state.userAPI.addWishList
    const addCart = state.userAPI.addCart
    const [detailProduct, setDetailProduct] = useState([])
    const [image,setImage] = useState([])
    useEffect(() =>{
        if(params.id){

            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            })
            const getimage = async () => {
                const res = await Axios.get(`/api/getimg/${params.id}`)
               
                setImage(res.data.data)
            }
            getimage()
        }
       
    },[params.id, products])

    //console.log(image)
    //
    let thumbnails = document.getElementsByClassName('thumbnail')

		let activeImages = document.getElementsByClassName('active')

		for (var i=0; i < thumbnails.length; i++){

			thumbnails[i].addEventListener('click', function(){
				console.log(activeImages)
				
				if (activeImages.length > 0){
					activeImages[0].classList.remove('active')
				}
				

				this.classList.add('active')
				document.getElementById('featured').src = this.src
			})
		}

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
                <div className="detailimg">
                
                
                 <img className="mainimg" id="featured" src={detailProduct.images[0].url} alt="" width="1000" />

                  <div className="slide-wrapper">
                 
                    <div className="slider">
                      {
                          image.map(image => (
                            <img className="thumbnail" src={image.url} alt="" width="1000" />
                          ))
                      }
                    </div> 
                    
                  </div>  
                
                
                    
                    
                    

                
                </div>
                
              
                
                
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
                            Out of stock
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
                    <span>period</span>
                    <p>{detailProduct.period}</p>
                    <span>material</span>
                    <p>{detailProduct.material}</p>
                    <span>condition</span>
                    <p>{detailProduct.condition}</p>
                    </div>
                    </div>
                    
                    
                </div>
            </div>

             {   
             !isAdmin ?    
            <div className="cmgift">
                        <p>custom it to your chirsmas gift </p>
                        <img src={gift}></img>
             </div>
             : ''
            }

             {
            !isAdmin ?
        <div className="chirsmast">
            <img src={gift2}/>
        </div>
        :''
        }
            
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
            </div>

            <div className="phonecall">
            <p>To make an enquiry call <span>+0848071200</span></p>
        </div>
        </>
        :
        ''
        }
        </>
    )

    //
    //zoom effect
     

    }

export default DetailProduct
