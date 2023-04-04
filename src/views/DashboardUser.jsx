import { useContext, useEffect, useState } from "react";
import 'react-calendar/dist/Calendar.css';
import Calendar from "react-calendar";
import { useNavigate, Link, } from "react-router-dom";
import UserContext from "../context/context";
import { Card, Nav, Table, Button, ButtonGroup, ToggleButton, } from "react-bootstrap";

import axios from "axios";


const DashboardUser = () => {

    const [radioValue, setRadioValue] = useState();
    const [radioValue2, setRadioValue2] = useState();

    const radios = [
        { name: '10:00', value: '10:00' },
        { name: '11:00', value: '11:00' },
        { name: '12:00', value: '12:00' },
    ];

    const [value, onChange] = useState()
    const [value2, onChange2] = useState()

    const navigate = useNavigate();

    const [user] = useContext(UserContext);
    const [date, setDate] = useState([]);
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
        const urlServer = "https://backendproyect-5ybw4.ondigitalocean.app";
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
        navigate("/dashboard_user#MiPerfil#Ingresos")
        setUrl("#MiPerfil#Ingresos")
        if (actualUser.length !== 0) {
            const urlServer = "https://backendproyect-5ybw4.ondigitalocean.app";
            const token = localStorage.getItem("token");
            const id = actualUser;
            const endpoint = `/dashboard_user/ingresos/${id}`;
            try {
                const response = await axios.get(urlServer + endpoint, {
                    headers: { Authorization: "Bearer " + token },
                })
                setEntry(response.data.entry);
            } catch (error) {
                alert(error);
            }
        }
    }

    const addReserveClass = async (name) => {
        const urlServer = "https://backendproyect-5ybw4.ondigitalocean.app";
        const token = localStorage.getItem("token");
        const endpoint = `/dashboard_user/`

    }

    const getDate = async (date, hour) => {
        setterUrlReservas()
        if (actualUser.length !== 0) {
            const urlServer = "https://backendproyect-5ybw4.ondigitalocean.app";
            const token = localStorage.getItem("token");
            const id = actualUser;
            const endpoint = "/dashboard_user/ingresos"

            try {
                const response = await axios.post(urlServer + endpoint, {
                    hora: hour,
                    fecha: date,
                    id_user: id,
                }, {
                    headers: { Authorization: "Bearer " + token },
                })
                setDate(response)
            } catch (error) {
                alert(error)
            }
        }
    }

    const getClases = async () => {
        if (actualUser.length !== 0) {
            const urlServer = "https://backendproyect-5ybw4.ondigitalocean.app";
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

    console.log("Clases", clases)

    const getAllClases = async () => {
        if (actualUser.length !== 0) {
            const urlServer = "https://backendproyect-5ybw4.ondigitalocean.app";
            const token = localStorage.getItem("token");
            const endpoint = "/dashboard_user/clases";
            try {
                const response = await axios.get(urlServer + endpoint, {
                    headers: { Authorization: "Bearer " + token },
                })
                setClase(response.data.reserveClass)
            } catch (error) {

            }
        }
    }

    const deleteReserva = async (id) => {
        console.log("id Reserva", id)
        const id_user = actualUser;
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
        console.log("id Reserva Clase->", id)
        /* const urlServer = "https://backendproyect-5ybw4.ondigitalocean.app";
        const endpoint = `/dashboard_user/clases/${id}`;
        const token = localStorage.getItem("token");
        try {
            const response = await axios.delete(urlServer + endpoint, {
                headers: { Authorization: "Bearer " + token },
            })
        } catch (error) {
            alert(error)
        } */

    }

    const [url, setUrl] = useState(window.location.hash);

    useEffect(() => {
        if (url === "#MiPerfil#Ingresos") {
            getUser();
            getEntry();
        } else if (url === "#MiPerfil#Clases") {
            getClases();
        } else if (url === "#Reservas") {
            getDate();
        } else if (url === "#Clases") {
            getAllClases();
        }
        verified();
    }, [/* actualUser, clases */]);

    function setterUrlMiPerfil() {
        getEntry();
    }

    function setterUrlMiPerfilClases() {
        getUser();
        getClases();
        if (actualUser.length !== 0) {

        }
        setUrl("#MiPerfil#Clases")
    }
    function setterUrlReservas() {
        navigate("#Reservas")
        setUrl("#Reservas")
    }
    function setterUrlClases() {
        getAllClases()
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
                                        { console.log("reserva id->  ", reserva) }
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
                                    {clase.length !== 0 ? <div>
                                        {console.log("clase->", clase)}
                                        {clases.map((clase, i) => {
                                            console.log("clases->", clases)
                                            return (
                                                <tr key={i}>
                                                    <td>{clase.name}</td>
                                                    <td>{clase.date.split("T")[0]}</td>
                                                    <td>{clase.hour.split(":")[0] + ":" + clase.hour.split(":")[1]}</td>
                                                    <td><Button onClick={(e) => { deleteReservaClase(clases[0].id) }} className="btn-danger">Anular</Button></td>
                                                </tr>
                                            );
                                        })}
                                    </div> : null}
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
                    <Calendar name="calendar" onChange={onChange} value={value}></Calendar>
                    <br />
                    {value !== undefined ? <div>
                        <ButtonGroup>
                            {radios.map((radio, idx) => (
                                <ToggleButton
                                    key={idx}
                                    id={`radio-${idx}`}
                                    type="radio"
                                    variant={idx % 2 ? 'outline-success' : 'outline-success'}
                                    name="radio"
                                    value={radio.value}
                                    checked={radioValue === radio.value}
                                    onChange={(e) => setRadioValue(e.currentTarget.value)}>
                                    {radio.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                        <div style={{ paddingTop: "5%" }}>
                            <Button onClick={(e) => getDate(value, radioValue)}> Reservar Hora</Button>
                        </div>
                    </div> : null}

                </div>
            </div> : url === "#Clases" ?
                <div style={{ width: "60vw" }}>
                    {clases ?
                        <div>
                            <h1> Clases </h1>
                            <div style={{ display: "flex" }}>
                                {clase.map((clase, i) => {
                                    return (
                                        <Card key={i} style={{ width: '18rem' }}>
                                            <Button>{clase.name}</Button>
                                            <Card.Img variant="top" src={clase.img} />
                                        </Card>)
                                })}
                            </div>
                            {clase.length !== 0 ? <div>
                                <div>
                                    <Calendar name="calendar" onChange={onChange2} value={value}></Calendar>
                                    <br />
                                    {value2 !== undefined ? <div>
                                        <ButtonGroup>
                                            {radios.map((radio, idx) => (
                                                <ToggleButton
                                                    key={idx}
                                                    id={`radio-${idx}`}
                                                    type="radio"
                                                    variant={idx % 2 ? 'outline-success' : 'outline-success'}
                                                    name="radio"
                                                    value={radio.value}
                                                    checked={radioValue2 === radio.value}
                                                    onChange={(e) => setRadioValue2(e.currentTarget.value)}>
                                                    {radio.name}
                                                </ToggleButton>
                                            ))}
                                        </ButtonGroup>
                                        <div style={{ paddingTop: "5%" }}>
                                            <Button onClick={(e) => getDate(value2, radioValue2)}> Reservar Hora</Button>
                                        </div>
                                    </div> : null}

                                </div>
                            </div> : null}
                        </div> : null}
                </div> : null}
            <Nav variant="tabs" defaultActiveKey={window.location.pathname + window.location.hash} className="flex-column" style={{ height: "10%" }}>
                <Nav.Item>
                    <Nav.Link defaultActiveKey={window.location.pathname + window.location.hash} onClick={setterUrlMiPerfil} >Usuarios
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link defaultActiveKey={window.location.pathname + window.location.hash} onClick={setterUrlReservas} > Reservas
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