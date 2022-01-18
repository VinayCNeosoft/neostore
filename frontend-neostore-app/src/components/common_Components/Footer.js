import React from "react";
import './footer.css'
import pdf from '../../doc/Privacy_Policy.pdf'
import { Link, useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

    const subscribe=()=>{
        navigate("/subscribe")
    }
    return (
        <div>
        <footer id="footer" className="footer-1">
            <div className="main-footer widgets-dark typo-light">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-3">
                            <div className="widget subscribe no-box">
                                <h5 className="widget-title">About Company<span></span></h5>
                                <p>NeoSoft Technologies is here at your quick and easy service for shopping.</p>
                                <p><b>Contact Information</b></p>
                                <p>Phone:+91 9876543210</p>
                                <p>Email:contact@neosoftmail.com</p>
                                <p>MUMBAI, INDIA</p>
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-6 col-md-3">
                            <div className="widget no-box">
                                <h5 className="widget-title">Information<span></span></h5>
                                <ul className="thumbnail-widget">
                                    <li>
                                        <div className="thumb-content"><Link to={pdf} target="_blank" rel='noreferrer'>&nbsp;Terms and Conditions</Link></div>
                                    </li>
                                    <li>
                                        <div className="thumb-content"><Link to={pdf} target="_blank" rel='noreferrer'>&nbsp;Guarantee and Return Policy</Link></div>
                                    </li>
                                    <li>
                                        <div className="thumb-content"><Link to="#.">&nbsp;Contact Us</Link></div>
                                    </li>
                                    <li>
                                        <div className="thumb-content"><a href={pdf} target="_blank" rel='noreferrer'>&nbsp;Privacy Policy</a></div>
                                    </li>
                                    <li>
                                        <div className="thumb-content"><a href="https://goo.gl/maps/uiXfxVRsgty84qMd8" target="_blank" rel='noreferrer'>&nbsp;Locate Us</a></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                            <div className="widget no-box">
                                <h5 className="widget-title">Follow up<span></span></h5>
                                <a href="https://www.facebook.com/neosofttechnologies" target="_blank" rel='noreferrer'> <i className="fa fa-facebook"> </i> </a>
                                <a href='https://in.linkedin.com/company/neosoft-technologies' target="_blank" rel='noreferrer'><i className="fa fa-linkedin"></i></a>
                                <a href="https://twitter.com/neosofttech" target="_blank" rel='noreferrer'> <i className="fa fa-twitter"> </i> </a>
                                <a href="https://www.youtube.com/channel/UCRCbn5adUPg5QFCB-Rw7L7w/featured" target="_blank" rel='noreferrer'> <i className="fa fa-youtube"> </i> </a>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                            <div className="widget no-box">
                                <h5 className="widget-title">Newsletter<span></span></h5>
                                <p>Join our mailing list and get a code for 10% off your first purchase. We promise not to spam you, and you can opt out whenever you like.</p>
                                <div className="emailfield">
                                    <input className="input" type="text" name="email" placeholder="email"/>
                                    <input className="input" name="uri" type="hidden" value="arabiantheme"/>
                                    <input className="input" name="loc" type="hidden" value="en_US"/>
                                    <input className="submitbutton ripplelink" type="submit" onClick={subscribe} value="Subscribe"/>
                                    <form/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-copyright">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <p>Copyright © 2021 Neosoft Technologies | All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        </div>
    )
}

export default Footer
