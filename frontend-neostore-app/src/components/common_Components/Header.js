import React,{useState,useEffect,useRef} from 'react';
import {Button, Container, Form, FormControl, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import { FaSearch,FaShoppingCart,FaUserCircle} from 'react-icons/fa';
import { useNavigate ,Link,NavLink} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { addToCart } from '../../config/NodeService';
import jwt_decode from 'jwt-decode'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Header(props) {
    const { query } = props

    const status = localStorage.getItem("token")
    const [user,setUser] = useState()
    const [uid,setUid] = useState(null)
    const [cart, setCart] = useState([]);

    const count = useSelector(state=>state.count)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /*setInterval was used in order to refresh the page constantly
    in order to have the "logout" button show immediately in place of
    "login", as soon as user logs out.*/

    useEffect(() => {
        setInterval(() => {
            setUser(localStorage.getItem("status"))
        },[1000])
        if(JSON.parse(localStorage.getItem('cart'))){
            let array=JSON.parse(localStorage.getItem('cart'))
            const count = array.map((item) => Number(item.quantity)).reduce((prev, curr) => prev + curr, 0);
            console.log("count"+count)
            dispatch({ type: "count", payload: count })
        }
        else{
            dispatch({ type: "count", payload: 0 })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const logout = () => {
        localStorage.removeItem("status");
        let token=localStorage.getItem('token');
        let decode=jwt_decode(token);
        console.log(decode.uid)
        setUid(decode.uid)
        let cartArray = JSON.parse(localStorage.getItem("cart"));
        console.log(cartArray)
        //add to db
        if(JSON.parse(localStorage.getItem("cart"))!==null){
            addToCart(decode.uid,cartArray)
            .then(res=>{
            if(res.data.success===true){
                console.log(res.data.success)
                toast(res.data.message)
            }
            if(res.data.success===false){
                console.log(res.data)
                toast(`${res.data.message}`)
            }
        })
        }
        localStorage.removeItem("token");
        localStorage.removeItem("password");
        localStorage.removeItem("user")
        localStorage.removeItem("email")
        localStorage.removeItem("cart")
        localStorage.removeItem("cartCount")
        localStorage.removeItem("delivery_Address")
        let array=JSON.parse(localStorage.getItem('cart'))
        const count = 0
        dispatch({ type: "count", payload: count})
        toast("User Logged Out Successfully")
        navigate("/")
    }
    const goCart =()=>{
        navigate("/cart")
    }
    const gotoSearch=()=>{
        navigate("/search")
    }
    if (!user) {
        return (
        <>
            <Navbar collapseOnSelect expand="lg" style={{background:"black"}} variant="dark">
            <Container>
            <Navbar.Brand><Link to="/" style={{textDecoration:"none",color:"white"}}>Neo<span className='text-danger'>STORE</span></Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto"  style={{marginLeft:"35vh"}} >
                <NavLink to="/" style={{textDecoration:"none",color:"white",marginLeft:"20px"}}>Home</NavLink>
                <NavLink to="/commonproduct" style={{textDecoration:"none",color:"white",marginLeft:"20px"}}>Products</NavLink>
                {/* <NavLink to="/order" style={{textDecoration:"none",color:"white",marginLeft:"20px"}}>Order</NavLink> */}
                </Nav>
                <Nav>
                {/* <Button variant="outline-success" style={{marginLeft:"10px"}} size='sm' onClick={gotoSearch}><FaSearch/></Button> */}

                <Form className="d-flex">
                    <FormControl type="text"
                    onChange={event => query(event.target.value)} placeholder="Search" name="search" className="me-2" aria-label="Search"/>
                </Form>
                <Button style={{marginLeft:"10px"}} variant='outline-success' size='sm' onClick={()=>goCart()}><FaShoppingCart /> Cart &nbsp; {count} </Button>
                <Button variant='outline-danger'style={{marginLeft:"10px"}} size='sm' >
                    <NavDropdown title={<FaUserCircle/>} id="collasible-nav-dropdown" >
                        <NavLink style={{textDecoration:"none",color:"black",marginLeft:"20px"}} to="/login">Login</NavLink><br/>
                        <NavLink style={{textDecoration:"none",color:"black",marginLeft:"20px"}} to="/register">Register</NavLink>
                    </NavDropdown>
                </Button>
               </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
        )
    }
    if (user) {
        return (
            <>
          <Navbar collapseOnSelect expand="lg" style={{background:"black"}} variant="dark">
            <Container>
            <Navbar.Brand><Link to="/" style={{textDecoration:"none",color:"white"}}>Neo<span className='text-danger'>STORE</span></Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto"  style={{marginLeft:"35vh"}} >
                <NavLink to="/" style={{textDecoration:"none",color:"white",marginLeft:"20px"}} >Home
                </NavLink>
                {/* <Link to="/" style={{color:"#f9f9f9"}}>Home</Link> */}
                <Link to="/commonproduct" style={{textDecoration:"none",color:"white",marginLeft:"20px"}}>Products</Link>
                <Link to="/order" style={{textDecoration:"none",color:"white",marginLeft:"20px"}}>Order</Link>
                </Nav>
                <Nav>
                {/* <Button variant="outline-success" style={{marginLeft:"10px"}} size='sm' onClick={gotoSearch}><FaSearch/></Button> */}

                <Form className="d-flex">
                <FormControl type="text"
                   onChange={event => query(event.target.value)} placeholder="Search" name="search" className="me-2" aria-label="Search"/>  </Form>
                <Button style={{marginLeft:"10px"}} variant='outline-success' size='sm' onClick={()=>goCart()}><FaShoppingCart /> Cart &nbsp; {count}</Button>
                <Button variant='outline-danger'style={{marginLeft:"10px"}} size='sm' >
                    <NavDropdown title={<FaUserCircle/>} id="collasible-nav-dropdown" >

                        <NavDropdown.Item className='btn' onClick={logout}>Logout</NavDropdown.Item>
                        <NavLink style={{textDecoration:"none",color:"black",marginLeft:"15px"}} to="/profile">Profile</NavLink>
                    </NavDropdown>
                </Button>
               </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
        )
    }
}

export default Header