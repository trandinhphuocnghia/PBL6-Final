import {useState, useEffect} from 'react'
import axios from 'axios'
import { store } from 'react-notifications-component';

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [wishlist,setWishlist] = useState([])
    const [history, setHistory] = useState([])

    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                   setCart(res.data.cart)
                    setWishlist(res.data.wishlist)

                } catch (err) {
                   // alert(err.response.data.msg)
                }
            }

            getUser()
            
        }
    },[token])

    

    const addCart = async (product) => {
        if(!isLogged) 
        {
            store.addNotification({
                title: "Please Login!!",
                message: "Please login to add your cart!",
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 2500,
                  onScreen: true
                },
                
              });
        }
        else{
        

        const check = cart.every(item =>{
            return item._id !== product._id
        })

        if(check){
            setCart([...cart, {...product, quantity: 1}])

          await axios.patch('/user/addcart', {cart: [...cart, {...product, quantity: 1}]}, {
                headers: {Authorization: token}
            })

            store.addNotification({
                title: "SuccessFul added to cart!",
                message: "Please check your cart!",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 2500,
                  onScreen: true
                }
              });
           
        }else{
            store.addNotification({
                title: "This product just in your cart!",
                message: "Please check your cart!",
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 2500,
                  onScreen: true
                },
                
              });
        }
    
   
    }

    }

    const addWishList = async (product) =>{
        if(!isLogged) 
         {
        store.addNotification({
            title: "Please Login!!",
            message: "Login to like this!",
            type: "danger",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 2500,
              onScreen: true
            },
            
          });}
        else{
        const check = wishlist.every(item =>{
            return item._id !== product._id
        })
        
        if(check){
            setWishlist([...wishlist, {...product, quantity: 1}])

            await axios.patch('/user/addwishlist', {wishlist: [...wishlist, {...product, quantity: 1}]}, {
                headers: {Authorization: token}
            })


            store.addNotification({
                title: "You like it!",
                message: "This product is in your wishlist!",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 2500,
                  onScreen: true
                }
              });
           

        }else{
            store.addNotification({
                title: "This product just in your wishlist!",
                message: "Please check its!",
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 2500,
                  onScreen: true
                },
                
              });
        }}
    }



    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        wishlist: [wishlist,setWishlist],
        addCart: addCart,
        addWishList: addWishList,
        history: [history, setHistory]
    }
}

export default UserAPI
 