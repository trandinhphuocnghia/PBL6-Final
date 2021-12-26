import React, { useContext, useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router'
import { GlobalState } from '../../GlobalState'
import PaypaylExpressBtn from 'react-paypal-express-checkout'
import PaypalButton from '../mainpages/cart/PaypalButton'
import axios from 'axios'
import CS from '../../img/chinhsach.svg'
import payment from '../../img/payment.svg'
import CS2 from '../../img/insurance2.svg'
import bag from '../../img/bag.svg'
import { Link, NavLink } from 'react-router-dom'
import left from '../../img/left.svg'
import { store } from 'react-notifications-component';
import Footer from '../footer/Footer'
const initialState = {
    shipname: '',
    shipaddress: '',
    shipcity: '',
    shipstate: '',
    shipphone: ''
}
function Checkout() {

    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [ship, setShip] = useState({ initialState })
    const { shipname, shipaddress, shipcity, shipstate, shipphone } = ship
    const [total, setTotal] = useState(0)
    const [token] = state.token

    const addToCart = async (cart) => {
        await axios.patch('/user/addcart', { cart }, {
            headers: { Authorization: token }
        })
    }
    const tranSuccess = async (payment) => {
        const { paymentID, address } = payment;
        const pay = total / 2
        await axios.post('/api/payment', { cart, paymentID, address, shipname, shipaddress, shipcity, shipstate, shipphone, pay, total }, {
            headers: { Authorization: token }
        })

        setCart([])
        addToCart([])


        store.addNotification({
            title: "SuccessFul Payment!",
            message: "Please check your history order!",
            type: "success",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 2500,
                onScreen: true
            }
        });
        window.location.href = "/history"
    }

   
    //get total of cart
    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)

            setTotal(total)
        }

        getTotal()

    }, [cart])

    const onChangeInput = e => {
        const { name, value } = e.target
        setShip({ ...ship, [name]: value })
        console.log(ship)
    }
    return (
        <div className="checkout">
            <div className="inforcheckout">
                <div className="shipping">
                    <div className="shipform">
                        <h3>Shipping Address</h3>
                        <input className="shipinfor" id="shipinfor" type="text" name="shipname" value={ship.shipname} onChange={onChangeInput} required placeholder="Reciver fullname" />


                        <input className="shipinfor" type="text" name="shipaddress" value={ship.shipaddress} onChange={onChangeInput} required placeholder="Address"></input>


                        <input className="shipinfor" type="text" name="shipcity" value={ship.city} onChange={onChangeInput} required placeholder="City"></input>


                        <input className="shipinfor" type="text" name="shipstate" value={ship.shipstate} onChange={onChangeInput} required placeholder="State"></input>


                        <input className="shipinfor" type="text" name="shipphone" value={ship.shipphone} onChange={onChangeInput} required placeholder="Reciver phonenumber"></input>
                    </div>
                </div>
                <div className="Confirm">
                    <img className="img" src={CS} />
                    <div className="text">

                        <h4><img className="icon" src={payment} /> &nbsp;&nbsp; Cách thức thanh toán</h4>
                        <p>* Quý khách vui lòng điền đầy đủ thông tin shipping method, và kiểm tra thật kĩ trước khi thanh toán.</p>
                        <p>Hiện tại, Chúng tôi hỗ trợ hình thức thanh toán online thông qua <span>Paypal.</span></p>

                    </div>
                    <div className="text">
                        <h4><img className="icon" src={CS2} /> &nbsp;&nbsp; Chính sách đổi trả</h4>
                        <p><span>Thời gian giao hàng:</span>&nbsp;Trong vòng 20 ngày kể từ ngày thanh toán. </p>
                        <p>* &nbsp;Khi nhận hàng quý khách vui lòng kiểm tra kĩ sản phẩm, về nhãn sản phẩm, màu sắc, độ bền, nếu có sai sót vui lòng gửi sản phẩm lại cho shipper, và gọi về số điện thoại: 0848071200 để được tư vấn. </p>

                    </div>

                </div>

                <div className="listcard">
                    <div className="cartshipping">
                        <div class="bagicon">
                            <img className="icon2" src={bag}></img>
                            <p className="dollar">$</p>
                        </div>
                        <div className="bill">
                            {
                                cart.map(product => (
                                    <div className="billdetail">
                                        <Link><img class="billimg" src={product.mainimg.url}/></Link>
                                        <div className="detailproductbill">
                                            <Link to={`/detail/${product._id}`}><p className="detailproductbilldt">{product.title}</p></Link>
                                            <p>SL:{product.quantity}</p>
                                        </div>
                                        <h4>${product.price * product.quantity}</h4>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="totalbill">

                            <h4>Total</h4>
                            <p>${total}</p>
                        </div>
                        <Link className="btnreturn" to="/cart"><img className="icon3" src={left}/> <span>Return to cart</span></Link>
                    </div>
                   
                    {/* <Link className="btnreturn" to="/cart"><img className="icon3" src={left} /> <span>Return to cart</span></Link> */}
                </div>
            </div>
            <div className="btncheckout">
                <h3>For Payment:</h3>
                <PaypalButton
                    total={total / 2}
                    tranSuccess={tranSuccess}
                />
                <p>* Số  tiền phải thanh toán trước : ${total / 2}</p>

                
            </div>
            
            <div className="phonecall">
                <p>To make an enquiry call <span>+0848071200</span></p>
            </div>
            <Footer/>
        </div>
    )
}

export default Checkout