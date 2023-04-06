import { Navbar, Nav, Container } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import Logo from '../images/21.jpg';


const NavBar = () => {

    return (
        <>
            <header>
                <Navbar className="navBg" variant="dark" expand="lg">
                    <Container >
                        <Navbar.Brand as={Link} to="/" >
                            <img
                                src={Logo}
                                height="50"
                                width="80"
                                className="d-inline alighn-top"
                                alt="Logo"
                            />{" "}
                            Multi Wallet Control
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/SendRawTransactions">Send Raw Transactions</Nav.Link>
                                <Nav.Link as={Link} to="/SmartContractExecute">Smart Contract Execute</Nav.Link>
                                <Nav.Link as={Link} to="/Contact">Contact</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            <main >
                <Outlet></Outlet>
            </main>
            <footer >
            </footer>
        </>
    )
}
export default NavBar;