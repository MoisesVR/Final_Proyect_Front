import { Nav, Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
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
                <Navbar.Brand href="">Gimnasio Hermoso</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href={`/`}>Inicio</Nav.Link>
                        <Nav.Link href={`/planes`}>Planes</Nav.Link>
                        <Nav.Link href={`/servicios`}>Servicios</Nav.Link>
                        <Nav.Link href={`/clases`}>Clases</Nav.Link>
                    </Nav>
                    {!localStorage.getItem("token") ?
                        <div>
                            <Nav>
                                <Nav.Link href={`/registrar`}>Registrar</Nav.Link>
                                <Nav.Link eventKey={2} href={`/iniciarSesion`}>
                                    Iniciar Sesión
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
