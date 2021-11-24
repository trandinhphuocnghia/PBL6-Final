import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import heart from '../../../img/heart2.svg'
import Axios from 'axios'


function DetailProduct() {
    const params = useParams()
    const state = useContext(GlobalState)
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


		let buttonRight = document.getElementById('slideRight');
		let buttonLeft = document.getElementById('slideLeft');

		

		

    //


    if(detailProduct.length === 0) return null;

    return (
        <>
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

            <div>
            <div className="Title">
            <h1 className="titledetail2">
                You might also be interested in...
            </h1>
            </div>
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
    )
}

export default DetailProduct
