import React,{useState,useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Container,Col,Row,Accordion, Button, Card, ListGroup} from 'react-bootstrap'
import { commonProduct} from '../../config/NodeService'
import StarRatings from 'react-star-ratings';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from "react-redux";
import {FaStar,FaArrowAltCircleUp,FaArrowCircleDown} from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './pro.css'

function AllProducts(props) {
    const { search } = props

    const [fetchAllProd,setFetchAllProd] = useState([])
    const [catData,setCatData] = useState([])

    const [categorySelected,setCategorySelected] = useState("")
    const [colorSelected,setColorSelected] = useState("")

    const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE = 9;
    const offset = currentPage * PER_PAGE;

    const pageCount = Math.ceil(catData.length / PER_PAGE);
    const dispatch = useDispatch();
    const [arrlen,setArraylen] = useState(0)
    // let [cart,setCart]= useState(JSON.parse(localStorage.getItem('mycart')))

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
        const currentPageData = fetchAllProd.slice(offset, offset + PER_PAGE);
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

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
        window.scrollTo(0, 0)
    }
    const getAllProd = () =>{
        setCatData(fetchAllProd)
        navigate("/commonproduct")
    }
    const filterItem = (category) =>{
        console.log(category)
        setCategorySelected(category)
        if(colorSelected === ""){
            const updatedItems = fetchAllProd.filter((currElem)=>{
                return currElem.category_id.category_name === category;
            });
            console.log(catData)
            setCatData(updatedItems)
            console.log(catData)
        }
        else{
            const updatedItems = fetchAllProd.filter((currElem)=>{
                return (currElem.category_id.category_name == category &&
                    currElem.color_id.color_name == colorSelected);
            })
            setCatData(updatedItems)
        }
    }

    const colorFilter = (color) =>{
        setColorSelected(color)
        if (categorySelected === "") {
            const updatedColorItems = fetchAllProd.filter((currColElem)=>{
            return currColElem.color_id.color_name === color;
        })
        console.log(catData)
        setCatData(updatedColorItems)
        }
        else{
            const updatedItems = fetchAllProd.filter((currColElem) => {
                return (currColElem.color_id.color_name === color &&
                    currColElem.category_id.category_name === categorySelected)
            });
            console.log(updatedItems)
            setCatData(updatedItems);
        }
    }

    const sortbyRating =()=>{
        console.log("rating")
        const pdata = fetchAllProd.sort(
            (a, b) => parseFloat(b.product_rating) - parseFloat(a.product_rating)
        );
        console.log(pdata)
        setCatData(pdata);
        navigate("/commonproduct")
    }
    const sortbyIncreasingPrice =()=>{
        console.log("Increasing order sort")
        const pdata = fetchAllProd.sort(
            (a, b) => parseInt(b.product_cost) - parseInt(a.product_cost)
        );
        console.log(pdata)
        setCatData(pdata);
        navigate("/commonproduct")
    }
    const sortbyDecreasingPrice =()=>{
        console.log("Decreasing order sort")
        const pdata = fetchAllProd.sort(
            (b, a) => parseInt(b.product_cost)- parseInt(a.product_cost)
        );
        console.log(pdata)
        setCatData(pdata);
        navigate("/commonproduct")
    }
    // console.log(currentPageData)
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
            {/* <Container fluid style={{backgroundImage:`url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.hdqwalls.com%2Fwallpapers%2Ftexture-dark-gradient-5k-px.jpg&f=1&nofb=1")`,backgroundSize: "cover",backgroundPosition:"center",paddingTop:"3em",paddingBottom:"3em"}}> */}

            <h1 className='text-center text-danger'>All Products</h1>
            <hr/>
            <Container>
                <Row>
                <div>
                    <span style={{display:"inline-flex", float:"right", marginRight:"10px"}}>
                        <p style={{marginRight:"20px"}}>Sort By :&nbsp;<FaStar onClick={()=>sortbyRating()}/></p>
                        <p style={{marginRight:"20px"}}> ₹ :&nbsp;<span><FaArrowAltCircleUp onClick={()=>sortbyIncreasingPrice()}/></span></p>
                        <p style={{marginRight:"20px"}}> ₹ :&nbsp;<span><FaArrowCircleDown onClick={()=>sortbyDecreasingPrice()}/></span></p>
                    </span>
                </div>
                <Col xs={4} md={2}>
                <ListGroup className='accordion_body'>
                    <ListGroup.Item action onClick={getAllProd} >All Product</ListGroup.Item>
                </ListGroup>
                <br/>
                <Accordion defaultActiveKey={['0']} alwaysopen="true" className='accordion_body'>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Categories</Accordion.Header>
                        <Accordion.Body>
                        <ListGroup>
                            <ListGroup.Item variant='info' action onClick={()=>filterItem("bed")}>Bed</ListGroup.Item>
                            <ListGroup.Item variant='info' action onClick={()=>filterItem("dining table")}>Dining Table</ListGroup.Item>
                            <ListGroup.Item variant='info' action onClick={()=>filterItem("sofa")}>Sofa</ListGroup.Item>
                            <ListGroup.Item variant='info' action onClick={()=>filterItem("wardrobes")}>Wardrobes</ListGroup.Item>
                        </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <br/>
                <Accordion defaultActiveKey={['0']} alwaysopen="true" className='accordion_body'>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Color</Accordion.Header>
                        <Accordion.Body>
                        <ListGroup>
                            <ListGroup.Item variant='light' action onClick={()=>colorFilter("black")}>Black</ListGroup.Item>
                            <ListGroup.Item variant='light' action onClick={()=>colorFilter("black grey")}>Black grey</ListGroup.Item>
                            <ListGroup.Item variant='light' action onClick={()=>colorFilter("Brown")}>Brown</ListGroup.Item>
                            <ListGroup.Item variant='light' action onClick={()=>colorFilter("blue")}>Blue</ListGroup.Item>
                            <ListGroup.Item variant='light' action onClick={()=>colorFilter("dark brown")}>Dark Brown</ListGroup.Item>
                            <ListGroup.Item variant='light' action onClick={()=>colorFilter("red")}>Red</ListGroup.Item>
                            <ListGroup.Item variant='light' action onClick={()=>colorFilter("white")}>White</ListGroup.Item>
                        </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                </Col>
                <Col xs={12} md={10} lg={10}>
                <Row xs={1} md={2} lg={3} className="g-4 my-1">
                {catData.filter(ele => {
                    if(ele.product_name.toLowerCase().includes(search.toLowerCase())) return ele
                    return null
                }).slice(offset, offset + PER_PAGE).map((ele,id)=>(
                    <Col key={id}>
                    <Card key={id}>
                        <Link to={`/product/${ele._id}`} key={id}>
                            <Card.Img variant="top" src={ele.product_image[0]} style={{height:"250px"}}/>
                        </Link>
                        <Card.Body>
                        <Card.Title style={{height:"70px"}}>{ele.product_name}</Card.Title>
                            <div style={{float:"left",display:"block"}}>
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
                <ReactPaginate
                    previousLabel={"Prev"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"paginationActive"}
                    pageRangeDisplayed={4}
                />
                </Col>
                </Row>
            </Container>
            <hr/>
            <br/>
            {/* </Container> */}
        </>
    )
}

export default AllProducts




 {/* <Container className='mx-auto my-3 justify-content-md-center justify-content-lg-center'> */}
                    {/* <Row xs={2} md={2} lg={3} className="g-2 my-10">
                    {catData.slice(offset, offset + PER_PAGE).map((ele,id)=>(
                        <Card key={id} style={{margin:"0px"}}>
                        <Link to={`/product/${ele._id}`} className='pro_link' key={id}>
                        <Card.Img variant="top" src={ele.product_image[0]} style={{width:"335px",height:"320px"}} /></Link>
                        <Card.Body>
                            <Card.Title style={{height:"70px"}}>{ele.product_name}</Card.Title>
                            <hr/>
                            <Card.Text>
                                <b>₹ {ele.product_cost}/-</b>
                            </Card.Text>
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
                    ))}
                    </Row> */}
                {/* </Container> */}
 /*      let prodObj = {
        _id : prod._id,
        product_name : prod.product_name,
        product_producer : prod.product_producer,
        product_cost : prod.product_cost,
        product_image : prod.product_image[0],
        product_stock : prod.product_stock,
        quantity : quant.quantity
        }
        console.log(prodObj)
        console.log(cart)
        console.log(prod)
        if(localStorage.getItem("cart")){
            let arr=JSON.parse(localStorage.getItem('cart'))
        } */
        /* const getcart = JSON.parse(localStorage.getItem("cart"));
        if (getcart) {
            setCart(getcart);
            const count =  JSON.parse(localStorage.getItem("cart")).map((item) => Number(item.quantity)).reduce((prev, curr) => prev + curr, 0);
            console.log("count" + count);
            dispatch({ type: "count", payload: count });
        } */
        /* console.log(prod,quant)
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
                return (d.quantity=d.quantity+1,prod_status = product_stock-1,
                    quantity=d.quantity)
                }
                return arr
                })
                localStorage.setItem('cart',JSON.stringify(arr))
                alert('Quantity Added !')
            }
            else{
            arr.push({_id,quantity,product_name,product_image,product_cost})
            localStorage.setItem('cart',JSON.stringify(arr))
            alert('Product Added to Cart !')
            }
        }
        else{
            let arr=[{_id,quantity,product_name,product_image,product_cost}]
            arr.push()
            localStorage.setItem('cart',JSON.stringify(arr))
            alert('Product Added to Cart !')
        }
        window.location.replace("/commonproduct") */


      /*   const addToCart =(prod,quant)=>{
            let prodObj = {
                _id : prod._id,
                product_name : prod.product_name,
                product_producer : prod.product_producer,
                product_cost : prod.product_cost,
                product_image : prod.product_image[0],
                product_stock : prod.product_stock,
                quantity : quant.quantity
            }
            console.log(prodObj)
            console.log(cart)
            console.log(prod)
            if(localStorage.getItem("cart"))
            {
                let arr=JSON.parse(localStorage.getItem('cart'))
                let found = arr.some( cart => cart['id'] === prodObj._id )
                if (found==true)
                {
                  alert("Product Already added");
                  if(JSON.parse(localStorage.getItem("cart")))
                  {
                    const count =  JSON.parse(localStorage.getItem("cart")).map((item) => Number(item.quantity))
                    .reduce((prev, curr) => prev + curr, 0);
                    dispatch({ type: "count", payload: count });
                  }
                }
                else
                {
                    arr.push(prodObj);
                    localStorage.setItem("cart", JSON.stringify(arr));
                    const count =  JSON.parse(localStorage.getItem("cart")).map((item) => Number(item.quantity))
                    .reduce((prev, curr) => prev + curr, 0);
                    dispatch({ type: "count", payload: count });
                    alert("Product added to Cart");
                }
            }
            else
            {
                let array = [];
    
                array.push(prodObj);
                localStorage.setItem("cart", JSON.stringify(array));
                if (JSON.parse(localStorage.getItem("cart"))) {
                    const count =  JSON.parse(localStorage.getItem("cart")).map((item) => Number(item.quantity))
                    .reduce((prev, curr) => prev + curr, 0);
                    console.log("count" + count);
                    dispatch({ type: "count", payload: count });
                }
                alert("Product added to Cart");
            }
        }; */