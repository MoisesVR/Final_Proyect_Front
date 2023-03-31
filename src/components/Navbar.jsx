import { Nav, Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
/* import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'; */

function CollapsibleNavbar() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand to="">Gimnasio Hermoso</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link >
                            <Link to="/">Inicio</Link>
                        </Nav.Link>
                        <Nav.Link >
                            <Link to="/planes">Planes</Link>
                        </Nav.Link>
                        <Nav.Link >
                            <Link to="/servicios">Servicios</Link>
                        </Nav.Link>
                        <Nav.Link >
                            <Link to="/clases">Clases</Link>
                        </Nav.Link>
                    </Nav>
                    {!localStorage.getItem("token") ?
                        <div>
                            <Nav>
                                <Nav.Link to={`/registrar`}>
                                    <Link to="/registrar">Registrar</Link>
                                </Nav.Link>
                                <Nav.Link eventKey={2} to={`/iniciarSesion`}>
                                    <Link to="/iniciarSesion">Iniciar Sesion</Link>
                                </Nav.Link>
                            </Nav>
                        </div> :
                        <div>
                            <Button variant="warning" onClick={logout}>Salir</Button>
                            {/* <button onClick={logout}>Salir</button> */}
                        </div>}

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CollapsibleNavbar;
