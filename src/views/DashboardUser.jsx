import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../context/context";
import { Card, Nav, Table, Button, ButtonGroup, ButtonToolbar, ToggleButton } from "react-bootstrap";

import axios from "axios";

const DashboardUser = () => {

    const navigate = useNavigate();

    const [user] = useContext(UserContext);
    const [entry, setEntry] = useState([]);
    const [clases, setClases] = useState([]);
    const [clase, setClase] = useState([]);
    const [actualUser, setActualUser] = useState([]);

    const verified = () => {
        if (localStorage.getItem("token") === null) {
            navigate("/");
        }
    }

    const getUser = async () => {
        const urlServer = "https://backendproyect-5ybw4.ondigitalocean.app/";
        const endpoint = "/dashboard_user/usuarios";
        const email = localStorage.getItem("usuario");
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(urlServer + endpoint, {
                email: email
            }, {
                headers: { Authorization: "Bearer" + token },
            })
            setActualUser(response.data.gettedUser[0].id);
        } catch (error) {
            alert(error);
        }
    }


    const getEntry = async () => {
        if (actualUser.length !== 0) {
            const urlServer = "https://backendproyect-5ybw4.ondigitalocean.app";
            const endpoint = "/dashboard_user/ingresos";
            const id = actualUser;
            const token = localStorage.getItem("token");
            try {
                const response = await axios.post(urlServer + endpoint, {
                    id: parseInt(id)
                }, {
                    headers: { Authorization: "Bearer " + token },
                })
                setEntry(response.data.entry);
            } catch (error) {
                alert(error);
            }
        }
    }

    const getClases = async () => {
        if (actualUser.length !== 0) {
            const urlServer = "https://backendproyect-5ybw4.ondigitalocean.app/";
            const token = localStorage.getItem("token");
            const id = actualUser;
            const endpoint = `/dashboard_user/clases/${id}`;
            try {
                const response = await axios.get(urlServer + endpoint, {
                    headers: { Authorization: "Bearer " + token },
                })
                setClases(response.data.reserveClass);
            } catch (error) {
                alert(error);
            }
        }
    }

    const getAllClases = async () => {
        const urlServer = "https://backendproyect-5ybw4.ondigitalocean.app/";
        const token = localStorage.getItem("token");
        const endpoint = "/dashboard_user/clases"

        try {
            const response = await axios.get(urlServer + endpoint, {
                headers: { Authorization: "Bearer " + token },
            })
            setClase(response.data.reserveClass)
        } catch (error) {

        }
    }

    const deleteReserva = async (id) => {
        const urlServer = "https://backendproyect-5ybw4.ondigitalocean.app";
        const endpoint = `/dashboard_user/ingresos/${id}`;
        const token = localStorage.getItem("token");
        try {
            const response = await axios.delete(urlServer + endpoint, {
                headers: { Authorization: "Bearer " + token },
            })
        } catch (error) {
            alert(error)
        }
    }

    const deleteReservaClase = async (id) => {
        const urlServer = "https://backendproyect-5ybw4.ondigitalocean.app";
        const endpoint = `/dashboard_user/clases/${id}`;
        const token = localStorage.getItem("token");

        try {
            const response = await axios.delete(urlServer + endpoint, {
                headers: { Authorization: "Bearer " + token },
            })
        } catch (error) {
            alert(error)
        }

    }

    const [url, setUrl] = useState(window.location.hash);

    useEffect(() => {
        getAllClases();
        getClases();
        getUser();
        verified();
        if (actualUser.length !== 0) {
            getEntry();
        }
    }, [actualUser, clases]);

    const [checkedL, setCheckedL] = useState(false);
    const [checkedM, setCheckedM] = useState(false);
    const [checkedMi, setCheckedMi] = useState(false);
    const [checkedJ, setCheckedJ] = useState(false);
    const [checked09, setChecked09] = useState(false);
    const [checked10, setChecked10] = useState(false);
    const [checked11, setChecked11] = useState(false);
    const [checked12, setChecked12] = useState(false);

    function setterUrlMiPerfil() {
        getEntry();
        setUrl("#MiPerfil#Ingresos")
    }
    function setterUrlMiPerfilClases() {
        getUser();
        getClases();
        if (actualUser.length !== 0) {

        }
        setUrl("#MiPerfil#Clases")
    }
    function setterUrlReservas() {
        setUrl("#Reservas")
    }
    function setterUrlClases() {
        setUrl("#Clases")
    }

    return (
        <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: "10%" }}>
            {url === "#MiPerfil#Ingresos" ? <div>
                <Card style={{ width: "60vw" }}>
                    <Card.Header>
                        <Nav variant="tabs" defaultActiveKey="/dashboard_user#MiPerfil#Ingresos">
                            <Nav.Item style={{ display: "flex" }}>
                                <Nav.Link onClick={setterUrlMiPerfil} >
                                    <Link to="/dashboard_user#MiPerfil#Ingresos">Ingresos</Link>
                                </Nav.Link>
                                <Nav.Link onClick={setterUrlMiPerfilClases} >
                                    <Link to="/dashboard_user#MiPerfil#Clases">Clases</Link>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <div>
                        <Card.Body style={{ width: "60vw" }}>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Hora</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {entry.map((reserva, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{reserva.date.split("T")[0]}</td>
                                                <td>{reserva.hour.split(":")[0] + ":" + reserva.hour.split(":")[1]}</td>
                                                <td><Button onClick={(e) => { deleteReserva(reserva.id) }} className="btn-danger">Anular</Button></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </div>
                </Card>
            </div> : url === "#MiPerfil#Clases" ? <div>
                <Card style={{ width: "60vw" }}>
                    <Card.Header>
                        <Nav variant="tabs" defaultActiveKey="/dashboard_user#MiPerfil#Clases">
                            <Nav.Item style={{ display: "flex" }}>
                                <Nav.Link defaultActiveKey="/dashboard_user#MiPerfil#Ingresos" onClick={setterUrlMiPerfil} >
                                    <Link to="dashboard_user#MiPerfil#Ingresos">Ingresos</Link>
                                </Nav.Link>
                                <Nav.Link defaultActiveKey="/dashboard_user#MiPerfil#Clases" onClick={setterUrlMiPerfilClases} >
                                    <Link to="/dashboard_user#MiPerfil#Clases">Clases</Link>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <div>
                        <Card.Body>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Clase</th>
                                        <th>Fecha</th>
                                        <th>Hora</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clases.map((clase, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{clase.name}</td>
                                                <td>{clase.date.split("T")[0]}</td>
                                                <td>{clase.hour.split(":")[0] + ":" + clase.hour.split(":")[1]}</td>
                                                <td><Button onClick={(e) => { deleteReservaClase(clase.id) }} className="btn-danger">Anular</Button></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </div>

                </Card>
            </div> : url === "#Reservas" ? <div>
                <div>
                    <h1 style={{ padding: "5%" }}> Reserva tu ingreso al gimnasio</h1>
                </div>
                <div>
                    <ButtonToolbar aria-label="Toolbar with button groups">
                        <ButtonGroup className="me-2" aria-label="First group">

                            <ToggleButton
                                className="mb-2"
                                id="toggle-checkL"
                                type="checkbox"
                                variant="outline-primary"
                                checked={checkedL}
                                value="1"
                                onChange={(e) => setCheckedL(e.currentTarget.checked)}
                            >
                                Lunes 19/03
                            </ToggleButton>
                        </ButtonGroup>
                        <ButtonGroup className="me-2" aria-label="First group">
                            <ToggleButton
                                className="mb-2"
                                id="toggle-checkM"
                                type="checkbox"
                                variant="outline-primary"
                                checked={checkedM}
                                value="1"
                                onChange={(e) => setCheckedM(e.currentTarget.checked)}
                            >
                                Martes 20/03
                            </ToggleButton>
                        </ButtonGroup>
                        <ButtonGroup className="me-2" aria-label="First group">
                            <ToggleButton
                                className="mb-2"
                                id="toggle-checkMi"
                                type="checkbox"
                                variant="outline-primary"
                                checked={checkedMi}
                                value="1"
                                onChange={(e) => setCheckedMi(e.currentTarget.checked)}
                            >
                                Miercoles 21/03
                            </ToggleButton>
                        </ButtonGroup>
                        <ButtonGroup className="me-2" aria-label="First group">
                            <ToggleButton
                                className="mb-2"
                                id="toggle-checkJ"
                                type="checkbox"
                                variant="outline-primary"
                                checked={checkedJ}
                                value="1"
                                onChange={(e) => setCheckedJ(e.currentTarget.checked)}
                            >
                                Jueves 22/03
                            </ToggleButton>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>
                <div>
                    <ButtonToolbar aria-label="Toolbar with button groups">
                        <ButtonGroup className="me-2" aria-label="First group">
                            <ToggleButton
                                className="mb-2"
                                id="toggle-check09"
                                type="checkbox"
                                variant="outline-primary"
                                checked={checked09}
                                value="1"
                                onChange={(e) => setChecked09(e.currentTarget.checked)}
                            >
                                09:00
                            </ToggleButton>
                        </ButtonGroup>
                        <ButtonGroup className="me-2" aria-label="First group">
                            <ToggleButton
                                className="mb-2"
                                id="toggle-check10"
                                type="checkbox"
                                variant="outline-primary"
                                checked={checked10}
                                value="1"
                                onChange={(e) => setChecked10(e.currentTarget.checked)}
                            >
                                10:00
                            </ToggleButton>
                        </ButtonGroup>
                        <ButtonGroup className="me-2" aria-label="First group">
                            <ToggleButton
                                className="mb-2"
                                id="toggle-check11"
                                type="checkbox"
                                variant="outline-primary"
                                checked={checked11}
                                value="1"
                                onChange={(e) => setChecked11(e.currentTarget.checked)}
                            >
                                11:00
                            </ToggleButton>
                        </ButtonGroup>
                        <ButtonGroup className="me-2" aria-label="First group">
                            <ToggleButton
                                className="mb-2"
                                id="toggle-check12"
                                type="checkbox"
                                variant="outline-primary"
                                checked={checked12}
                                value="1"
                                onChange={(e) => setChecked12(e.currentTarget.checked)}
                            >
                                12:00
                            </ToggleButton>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>
            </div> : url === "#Clases" ?
                <div>
                    {clases ?
                        <div>
                            <h1> Clases </h1>
                            <div style={{ display: "flex" }}>
                                {clase.map((clase) => {
                                    return (
                                        <Card style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src={clase.img} />
                                        </Card>)
                                })}
                            </div>
                        </div> : null}
                </div> : null}
            <Nav variant="tabs" defaultActiveKey={window.location.pathname + window.location.hash} className="flex-column" style={{ height: "10%" }}>
                <Nav.Item>
                    <Nav.Link defaultActiveKey={window.location.pathname + window.location.hash} onClick={setterUrlMiPerfil} >
                        <Link to="/dashboard_user#MiPerfil#Ingresos">Usuarios</Link>Usuarios</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link defaultActiveKey={window.location.pathname + window.location.hash} onClick={setterUrlReservas} >
                        <Link to="/dashboard_user#Reservas">Reservas</Link>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link defaultActiveKey={window.location.pathname + window.location.hash} onClick={setterUrlClases} >
                        <Link to="/dashboard_user#Clases">Clases</Link>
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
}

export default DashboardUser;