import React,{useState,useEffect} from 'react'
import {useNavigate ,useParams} from 'react-router-dom'
import { Container,Col,Row, Button,} from 'react-bootstrap'
import { getProduct } from '../../config/NodeService'
import StarRatings from 'react-star-ratings';
import {FaShareAlt} from 'react-icons/fa'
import Tabs, { TabPane } from 'rc-tabs';
import '../../../node_modules/rc-tabs/assets/index.css';
import ReactImageMagnify from 'react-image-magnify';
import Magnifier from "react-magnifier";
import './pro.css'
import { useDispatch, useSelector } from "react-redux";

function ProductDetail() {
    const [singleProd,setSingleProd] = useState([])
    const [cardImages,setImages] = useState()
    const [arrlen,setArraylen] = useState(0)

    let { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()


    useEffect(()=>{
        let t = localStorage.getItem("token")
        if(t){
            console.log("Token Found")
            if(localStorage===null){
                console.log("Cart is null")
            }
            else{
            getData()
            if(localStorage.getItem('cart')){
                let arr=JSON.parse(localStorage.getItem('cart'))
                let sum=0
                arr.map((d)=>{
                    sum=sum+d.quantity
                    localStorage.setItem("cartCount",sum)
                    return sum
                })
                // setQuant(sum)
                setArraylen(sum)
            }
        }
        }
        else{
            getData()
            if(localStorage.getItem('cart')){
                let arr=JSON.parse(localStorage.getItem('cart'))
                let sum=0
                arr.map((d)=>{
                    sum=sum+d.quantity
                    localStorage.setItem("cartCount",sum)
                    return sum
                })
                // setQuant(sum)
                setArraylen(sum)
            }
        }
    },[])

    const getData=()=>{
        console.log("card Clicked")
        getProduct(id)
        .then(res=>{
            if(res.data.success===true){
                console.log(res.data.data)
                setSingleProd(res.data.data)
                console.log(singleProd.map((ele)=>(ele.product_image[0])))
                setImages(res.data.data.map((ele,i)=>(ele.product_image[0])))
            }
            else if(res.data.success===false){
                console.log(res.data)
                alert(`${res.data.message}`)
            }
            else{
                console.log("")
            }
        })
    }
    const change = (img_src) =>{
        setImages(img_src)
    }

    function callback(e) {
        //console.log(e);
    }
    const addToCart =(prod,quant)=>{
        let _id = prod._id
        let product_name = prod.product_name
        let product_producer = prod.product_producer
        let product_cost = prod.product_cost
        let product_image = prod.product_image[0]
        let product_stock = prod.product_stock
        let quantity = quant.quantity
        let prod_status = 0
        console.log(_id,product_name,product_cost,product_image,quantity,product_producer,product_stock)
        if(localStorage.getItem('cart')!==null)
        {
            let arr=JSON.parse(localStorage.getItem('cart'))
            console.log(arr)
            if(arr.some(e=>e._id===_id)){
                arr.map((d)=>{
                    if(d._id===_id){
                    return (
                        d.quantity=d.quantity+1,prod_status = product_stock-1,quantity=d.quantity
                    )
                }
                return arr
                })
                localStorage.setItem('cart',JSON.stringify(arr))
                alert('Quantity Added !')
                let array=JSON.parse(localStorage.getItem('cart'))
                const count = array
                    .map((item) => Number(item.quantity))
                    .reduce((prev, curr) => prev + curr, 0);
                console.log("count"+count)
                dispatch({ type: "count", payload: count })
            }
            else{
                arr.push({_id,quantity,product_name,product_image,product_cost,product_producer})
                localStorage.setItem('cart',JSON.stringify(arr))
                alert('Product Added to Cart !')
                let array=JSON.parse(localStorage.getItem('cart'))
                const count = array
                    .map((item) => Number(item.quantity))
                    .reduce((prev, curr) => prev + curr, 0);
                console.log("count"+count)
                dispatch({ type: "count", payload: count })
            }
        }
        else{
            let arr=[{_id,quantity,product_name,product_image,product_cost,product_producer}]
            arr.push()
            localStorage.setItem('cart',JSON.stringify(arr))
            alert('Product Added to Cart !')
            let array=JSON.parse(localStorage.getItem('cart'))
            const count = array.map((item) => Number(item.quantity)).reduce((prev, curr) => prev + curr, 0);
            console.log("count"+count)
            dispatch({ type: "count", payload: count })
        }
    };
    return (
        <>
        <br/>
            <Container>
                    <Row>
                        {singleProd.map((item,i)=>(
                            <>
                            <Col xl={6} className='justify-content-center' key={i}>
                                <div style={{marginLeft:"auto",marginRight:"auto"}}>
                                    <Magnifier  src={cardImages} height={"400px"} width={"100%"} />
                                </div>
                                <br/>
                                <div className="side_view mx-auto" key={i}>
                                    <img src={item.product_image[0]} onClick={()=>change(item.product_image[0])} key={i} />
                                    <img src={item.product_image[1]} onClick={()=>change(item.product_image[1])} />
                                    <img src={item.product_image[2]} onClick={()=>change(item.product_image[2])}/>
                                    <img src={item.product_image[3]} onClick={()=>change(item.product_image[3])}/>
                                </div>
                                <br/>
                            </Col>
                            <Col xl={6}>
                            <h2>{item.product_name}</h2>
                            <div>
                            <span><p style={{height:"22px"}}><b>{item.product_rating} &nbsp;</b>
                            <StarRatings
                                rating={item.product_rating}
                                starRatedColor="orange"
                                numberOfStars={5}
                                name='rating'
                                starDimension="20px"
                            /></p></span></div>
                            <hr/>
                            <h3>Price : ₹ {item.product_cost}.00</h3>
                            <br/>
                            <div><b>Color :</b><div id="circle" style={{background:`${item.color_id.color_code}`, display:'inline-block', border:"solid 2px"}}></div></div>
                            <br/>
                            <div><b>Share &nbsp;</b><span><FaShareAlt/></span>
                            <div className="col-xs-12 col-sm-4 col-md-4">
                                <br/>
                                <a href="https://www.facebook.com/neosofttechnologies" style={{textDecoration:"none"}} target="_blank" rel='noreferrer'> <i className="fa fa-facebook"> </i> </a>
                                <a href='https://in.linkedin.com/company/neosoft-technologies' style={{textDecoration:"none"}} target="_blank" rel='noreferrer'><i className="fa fa-linkedin"></i></a>
                                <a href="https://twitter.com/neosofttech" style={{textDecoration:"none"}} target="_blank" rel='noreferrer'> <i className="fa fa-twitter"> </i> </a>
                                <a href="https://www.youtube.com/channel/UCRCbn5adUPg5QFCB-Rw7L7w/featured" style={{textDecoration:"none"}} target="_blank" rel='noreferrer'> <i className="fa fa-youtube"> </i> </a>
                            </div>
                            </div>
                            <br/>
                            <div>
                                <Button variant='info' onClick={()=>addToCart(item,{quantity:1})}>Add to Cart</Button>
                                <span style={{marginLeft:20}}>
                                  <Button>Rate Product</Button>
                                </span>
                            </div>
                        </Col>
                        </>
                        ))}
                    </Row>
                    <br/>
                    {singleProd.map((item,i)=>(
                        <>
                        <Tabs defaultActiveKey="1" tabPosition="top" onChange={callback} key={i}>
                            <TabPane tab="Description" key="1">
                                <p className='text-justify'>{item.product_desc}</p>
                            </TabPane>
                            <TabPane tab="Feature" tabPosition="top"  key="2">
                                <p><b>Dimension : </b>{item.product_dimension}</p>
                                <p><b>Material Used : </b>{item.product_material}</p>
                            </TabPane>
                        </Tabs>
                        </>))}
            </Container>
            <br/>
        </>
    )
}

export default ProductDetail
