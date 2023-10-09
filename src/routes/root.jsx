import {Outlet} from "react-router-dom";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import logo from "../images/library-64.png"

export default function Root() {
    return (
        <>
            <Navbar style={{background: "lightgray"}}>
                <Nav>
                    <LinkContainer to="/">
                        <Navbar.Brand>
                            <img src={logo} width={40} height={24}/>
                        </Navbar.Brand>
                    </LinkContainer>
                    <NavDropdown title="Books" id="basic-nav-dropdown">
                        <LinkContainer to="/books">
                            <NavDropdown.Item>List Books</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/books/create">
                            <NavDropdown.Item>New Book</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                    <NavDropdown title="Albums" id="basic-nav-dropdown">
                        <LinkContainer to="/albums">
                            <NavDropdown.Item>List Albums</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/albums/create">
                            <NavDropdown.Item>New Album</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                    <NavDropdown title="Videos" id="basic-nav-dropdown">
                        <LinkContainer to="/videos">
                            <NavDropdown.Item>List Videos</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/videos/create">
                            <NavDropdown.Item>New Video</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                </Nav>
            </Navbar>
            <div id="detail"><Outlet/></div>
        </>
    );
}