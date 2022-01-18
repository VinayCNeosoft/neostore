import React,{useState,useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Container,Col,Row,Button, Card, } from 'react-bootstrap'
import { commonProduct} from '../../config/NodeService'
import StarRatings from 'react-star-ratings';
import { useDispatch } from "react-redux";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Search() {
    const [fetchAllProd,setFetchAllProd] = useState([])
    const [catData,setCatData] = useState([])
    const dispatch = useDispatch();
    const [arrlen,setArraylen] = useState(0)
    const [query, setQuery] = useState("")

    const navigate = useNavigate()
    useEffect(()=>{
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
    },[])

    const getData=()=>{
        commonProduct()
        .then(res=>{
            if(res.data.success===true){
                console.log(res.data.allProd)
                setFetchAllProd(res.data.allProd)
                const pdata =  res.data.allProd.sort(
                    (a, b) => parseFloat(b.product_rating) - parseFloat(a.product_rating)
                );
                setCatData(pdata)
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
                // dispatch({type:'COUNT',payload:1})
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
            toast('Product Added to Cart !')
            // dispatch({type:'COUNT',payload:1})
            let array=JSON.parse(localStorage.getItem('cart'))
                const count = array
                    .map((item) => Number(item.quantity))
                    .reduce((prev, curr) => prev + curr, 0);
                console.log("count"+count)
                dispatch({ type: "count", payload: count })
        }
    };

    return (
        <>
            <Container>
                    <input placeholder="Enter Post Title" onChange={event => setQuery(event.target.value)}/>
            </Container>
            <Container>
            <Row xs={1} md={2} lg={4} className="g-4 my-2">
        {catData.filter(ele => {
            if (query === '') {
            return ele;
            } else if (ele.product_name.toLowerCase().includes(query.toLowerCase())) {
            return ele;
            }
        }).map((ele,id)=>(
                <Col md={3}>
                    <Card key={id}>
                        <Link to={`/product/${ele._id}`} key={id}>
                            <Card.Img variant="top" src={ele.product_image[0]} style={{height:"250px"}}/>
                        </Link>
                        <Card.Body>
                        <Card.Title style={{height:"70px"}}>{ele.product_name}</Card.Title>
                            <div style={{float:"right",display:"block"}}>
                                <Card.Text>
                                    <b>₹ {ele.product_cost}/-</b>
                                </Card.Text>
                            </div>
                        <br/>
                        <div className='text-center'>
                                <Button variant="danger" style={{width:"auto"}} onClick={()=>addToCart(ele,{quantity:1})}>Add to Cart</Button>
                                <Container>
                                <br/>
                                <StarRatings
                                    rating={ele.product_rating}
                                    starRatedColor="orange"
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension="30px"
                                />
                                </Container>
                            </div>
                        </Card.Body>
                    </Card>
                    </Col>
                ))}
                </Row>
                </Container>
        </>
    )
}

export default Search
