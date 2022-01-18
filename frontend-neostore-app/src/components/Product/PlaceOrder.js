import React,{useRef,useState,useEffect} from 'react'
import { Container,Table,Button ,Row,Col} from 'react-bootstrap'
import Stepper from 'react-stepper-horizontal';
import {useNavigate ,useParams} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { addToCart,getCustAddress,addToOrder } from '../../config/NodeService';
import {FiEdit} from 'react-icons/fi'
import {AiOutlineDelete} from 'react-icons/ai'
import jwt_decode from 'jwt-decode'
import Address from '../Account/Address';
import 'react-credit-cards/es/styles-compiled.css'
import Cards from 'react-credit-cards';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function PlaceOrder() {
  const [cartState,setCartState] = useState({ cvv: '', expiry: '', focus: '', name: '', number: ''})
  const [uid,setUid] = useState(null)
  const [cart, setCart] = useState([]);
  const [deliveryAddress,setDeliveryAddress] = useState()
  const [total, setTotal] = useState();
  const [gst,setGst]= useState()
  const [netTotal,setNetTotal] = useState()
  const [cartIsEmpty, setIsCartIsEmpty] = useState(true);
  const [isPaymentReceived,setIsPaymentReceived] = useState(false)
  const [activetep,setActiveStep] = useState(2)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem("token")===""){
        navigate("/")
    }
    else{
      let token=localStorage.getItem('token');
      let decode=jwt_decode(token);
      console.log(decode.uid)
      setUid(decode.uid)
      const d = JSON.parse(localStorage.getItem("delivery_Address"))
      setDeliveryAddress(d)
    }
    const getcart = JSON.parse(localStorage.getItem("cart"));
    if (getcart) {
      setCart(getcart);
      const count =  JSON.parse(localStorage.getItem("cart")).map(item => Number(item.quantity)).reduce((prev, curr) => prev + curr, 0);
      console.log("count"+count)
      dispatch({ type: "count", payload: count });
    }
    totalcalc()
  },[])

  console.log(cart)
  console.log(deliveryAddress)

  const totalcalc=()=>{
    let total=0
    const getcart = JSON.parse(localStorage.getItem("cart"));
    getcart.forEach((data)=>{
      total= total + (data.quantity*data.product_cost)
    })
    console.log(total)
    setTotal(total)
    const GST_Amount = ( total * 5 ) / 100
    console.log(GST_Amount)
    setGst(parseInt(GST_Amount))
    const orderTotal = total + GST_Amount
    setNetTotal(parseInt(orderTotal))
    console.log(orderTotal)
  }
  const placeOrder =()=>{
    setIsPaymentReceived(true)
    const data = {cart:cart,total:total,address:deliveryAddress}
    console.log(data)
    setActiveStep(3)
    addToOrder(uid,data)
    let cartArray = []
    addToCart(uid,cartArray)
    localStorage.removeItem("cart")
    localStorage.removeItem("delivery_Address")
    const count = 0
    dispatch({ type: "count", payload: count})
  }
  return (
        <>
        <div>
          <div className="mt-3 container text-center">
            <Stepper steps={ [{title: 'Cart'}, {title: 'Delivery Address'}, {title: 'Place Order'}] } activeStep={ activetep } completedStep={0,1} completeColor={"#1cac78"} completeBarColor={"#1cac78"} activeColor={"#5096FF"}/>
          </div>
          <br/>

          {isPaymentReceived?<><Container>
            <h2 className='text-center'>Thank You :) your order has been placed !</h2>
            <Row>
          <Col xs={12} md={8}>
          <Table className="my-3 mt-5" responsive="sm" striped borderless hover>
            <thead>
              <tr className='text-center'>
                {/* <th>#</th> */}
                <th colSpan="2">Product Detail</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((cart,i)=>(
                <tr key={i}>
                  {/* <td>{i+1}</td> */}
                  <td><img src={cart.product_image} width="70" height="70"></img></td>
                  <td>{cart.product_name}<br/>by <b>{cart.product_producer}</b></td>
                  <td> ₹ {cart.product_cost}</td>
                  <td>{cart.quantity}</td>
                  <td>₹ {cart.product_cost*cart.quantity}</td>
                </tr>
              ))}
              <tr>
                <td></td>
                {/* <td colSpan="5"><h2>Total:  ₹{total}</h2></td> */}
                {/* <td colSpan="2"><Button variant="dark" size="lg" onClick={checkout}>Checkout</Button></td> */}
              </tr>
            </tbody>
          </Table>
          </Col>
          <Col xs={12} md={4}>
            <Container style={{border:"1px solid black", borderRadius:"20px", padding:"15px"}} className="my-2 mt-5">
              <h3 className='text-center'>Total</h3>
              <Table responsive="sm">
                <tbody>
                  <tr className='text-center'>
                    <td><b>Subtotal</b></td>
                    <td><b>{total}</b></td>
                  </tr>
                  <tr className='text-center'>
                    <td><b>GST(5%)</b></td>
                    <td><b>{gst}</b></td>
                  </tr>
                  <tr className='text-center'>
                    <td><b>Order Total</b></td>
                    <td><b>{netTotal}</b></td>
                  </tr>
                </tbody>
              </Table>
              <div className='d-grid gap-2'>
                {/* <Button variant='primary' size="lg" onClick={()=>checkout()}>Proceed to Buy</Button> */}
              </div>
              <br/>
              </Container>
              <br/>
          </Col>
          </Row>
          </Container></>:<>
          <div className='text-center' size={"lg"}>
          <h1><Button onClick={placeOrder} variant="success">Make Payment</Button></h1>
          <h1 className='text-center text-warning'>Please Pay using Credit or Debit Card Only !</h1>
          </div></>}
        </div>
        </>
    )
}

export default PlaceOrder
