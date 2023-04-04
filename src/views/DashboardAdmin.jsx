import { useContext, useState, useEffect } from "react";
import { Card, Nav, Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/context";

const DashboardAdmin = () => {

    const navigate = useNavigate();

    /* const [user, setUser] = useContext(UserContext) */
    /* const [userDelete, setUserDelete] = useState([]); */
    const [usuarios, setUsuarioss] = useState([]);
    const [planes, setPlanes] = useState([]);
    const [clases, setClases] = useState([]);

    const verified = () => {
        if (localStorage.getItem("token") === null) {
            navigate("/");
        }
    }

    const getUsuarioData = async () => {
        const urlServer = "https://backendproyect-5ybw4.ondigitalocean.app";
        const endpoint = "/dashboard/usuarios";
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get(urlServer + endpoint, {
                headers: { Authorization: "Bearer " + token },
            });
            setUsuarioss(response.data.users);
        } catch ({ response: { data: message } }) {
            alert(message + " 🙁");
            console.log(message);
        }
    };

    const deleteUsuario = async (id) => {
        const urlServer = "https://backendproyect-5ybw4.ondigitalocean.app";
        const endpoint = `/dashboard/usuarios/${id}`;
        const token = localStorage.getItem("token");
        try {
            const response = await axios.delete(urlServer + endpoint, {
                headers: { Authorization: "Bearer " + token },
            });
        } catch (error) {
            alert(error)
        }
    }

    const getPlanesData = async () => {
        const urlServer = "https://backendproyect-5ybw4.ondigitalocean.app";
        const endpoint = "/dashboard/planes";
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get(urlServer + endpoint, {
                headers: { Authorization: "Bearer" + token },
            });
            setPlanes(response.data.plans)
        } catch (error) {
            alert(error);
        }
    }

    const deletePlan = async (id) => {
        console.log("id plan", id)
        const urlServer = "https://backendproyect-5ybw4.ondigitalocean.app";
        const endpoint = `/dashboard/planes/${id}`;
        const token = localStorage.getItem("token");
        try {
            const response = await axios.delete(urlServer + endpoint, {
                headers: { Authorization: "Bearer "+ token},
            });
            console.log("response", response)
        } catch (error) {
            
        }
    }

    const getClasesData = async () => {
        const urlServer = "https://backendproyect-5ybw4.ondigitalocean.app";
        const endpoint = "/dashboard/clases";
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get(urlServer + endpoint, {
                headers: { Authorization: "Bearer" + token },
            });
            setClases(response.data.clases)
        } catch (error) {
            alert(error)
        }
    }

    function setterURL() {
        if (window.location.hash === "#Usuarios") {
            setUrl("#Usuarios");
        } else if (window.location.hash === "#Planes") {
            setUrl("#Planes");
        } else if (window.location.hash === "#Clases") {
            setUrl("#Clases");
        }
    }

    useEffect(() => {
        setterURL();
        getPlanesData();
        getUsuarioData();
        /*         getClasesData(); */
        verified();
    }, []);

    const [url, setUrl] = useState(window.location.hash);

    function setterUrlUsuarios() {
        getUsuarioData()
        setUrl("#Usuarios")
    }
    function setterUrlPlanes() {
        getPlanesData();
        setUrl("#Planes")
    }

    function setterUrlClases() {
        setUrl("#Clases")
        getClasesData();
    }

    function deleteUser(id) {
        /* deleteUsuario(id); */
    }

    function userid(id) {
    }

    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            {url === "#Usuarios" ?
                <div>
                    <div>
                        <Card style={{ width: "100%" }}>
                            <Card.Header>
                                <Nav variant="tabs" defaultActiveKey="/dashboard#Usuarios">
                                    <Nav.Item>
                                        <Nav.Link>
                                            <Link>Usuarios</Link>
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body>
                                <Table striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Nombre</th>
                                            <th>Correo</th>
                                            <th>Direccion</th>
                                            <th>Forma Pago</th>
                                            <th>Tipo Usuario</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usuarios.map((usuario, id) => {
                                            if (usuario.id_user_type === 1) {

                                            } else {

                                                return (
                                                    <tr key={id}>
                                                        <td>{usuario.id}</td>
                                                        <td>{usuario.name}</td>
                                                        <td>{usuario.email}</td>
                                                        <td>{usuario.address}</td>
                                                        <td>{usuario.payment_type}</td>
                                                        <td>{usuario.id_user_type}</td>
                                                        <td><Button onClick={(e) => { deleteUsuario(usuario.id) }} className="btn-danger">Eliminar</Button></td>
                                                    </tr>
                                                )
                                            }
                                        }
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </div>
                </div> : url === "#Planes" ?
                    <div>
                        <Card style={{ width: "100%" }}>
                            <Card.Header>
                                <Nav variant="tabs" defaultActiveKey="/dashboard#Planes">
                                    <Nav.Item>
                                        <Nav.Link>
                                            <Link to="/dashboard#Planes">Planes</Link>
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body>
                                <Table striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Nombre</th>
                                            <th>Descripcion</th>
                                            <th>Costo</th>
                                            <th>Duracion</th>
                                            <th> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {planes.map((plan, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{plan.id}</td>
                                                    <td>{plan.name}</td>
                                                    <td>{plan.description}</td>
                                                    <td>{plan.cost}</td>
                                                    <td>{plan.duration}</td>
                                                    <td><Button onClick={(e) => { deletePlan(plan.id) }} className="btn-danger"> Eliminar </Button></td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </div> : url === "#Clases" ? <div>
                        <Card style={{ width: "100%" }}>
                            <Card.Header>
                                <Nav variant="tabs" defaultActiveKey="/dashboard#Clases">
                                    <Nav.Item>
                                        <Nav.Link>
                                            <Link to="/dashboard#Clases">Clases</Link>
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body>
                                <Table striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Nombre</th>
                                            <th>Descripcion</th>
                                            <th>Cupo</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clases.map((clase, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{clase.id}</td>
                                                    <td>{clase.name}</td>
                                                    <td>{clase.description}</td>
                                                    <td>{clase.cupo}</td>
                                                    <td><Button className="btn-danger"> Eliminar </Button></td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </div> : null}

            <Nav variant="tabs" defaultActiveKey={window.location.pathname + window.location.hash} className="flex-column" style={{ height: "10%" }}>
                <Nav.Item>
                    <Nav.Link onClick={setterUrlUsuarios} >
                        <Link to="/dashboard#Usuarios">Usuarios</Link>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={setterUrlPlanes} >
                        <Link to="/dashboard#Planes">Planes</Link>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={setterUrlClases} >
                        <Link to="/dashboard#Clases">Clases</Link>
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </div >
    );
}

export default DashboardAdmin;