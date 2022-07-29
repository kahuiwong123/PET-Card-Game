import {Link} from 'react-router-dom'

const Footer = ()  =>{
    return(
        <footer className="w-screen">
            <div id="footer-container" className="fixed bottom-0 w-screen bg-neutral-500 ">
                <Link to="/">
                    <div id="footer-objects" className="flex flex-row justify-between  mx-5 mb-.5 text-neutral-900/75 font-semibold">
                        <div id="find-us" > 
                            <h1>Find Us</h1>
                        </div>
                        <div id="footer-title">
                            <a>&copy; Platinum Edge Tutoring</a>
                        </div>
                        <div id="terms-privacy">
                            <ul className="flex">
                                <li><a>Terms</a></li>
                                <li>&nbsp;|&nbsp;</li>
                                <li><a>Privacy</a></li>
                            </ul>
                        </div>
                    </div>
                </Link>
            </div>
        </footer>
    )
}

export default Footer;