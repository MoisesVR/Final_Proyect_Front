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

    const [clas, setClass] = useState();

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

    const addReserveClass = async (date, hour, id_class) => {
        console.log("date->", date)
        console.log("hour->", hour)
        console.log("id_class->", id_class)
        const urlServer = "https://backendproyect-5ybw4.ondigitalocean.app";
        const token = localStorage.getItem("token");
        const endpoint = `/dashboard_user/clases`;
        const id = actualUser;

        try {
            const response = await axios.post(urlServer + endpoint, {
                fecha: date,
                hora: hour,
                id_user: id,
                id_class: id_class,
            })
        } catch (error) {

        }

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
            const id = actualUser
            const endpoint = `/dashboard_user/clases/${id}`;
            try {
                const response = await axios.get(urlServer + endpoint, {
                    headers: { Authorization: "Bearer " + token },
                })
                setClase(response.data.reserveClass);
            } catch (error) {
                alert(error);
            }
        }
    }

    const getAllClases = async () => {
        if (actualUser.length !== 0) {
            const urlServer = "https://backendproyect-5ybw4.ondigitalocean.app";
            const token = localStorage.getItem("token");
            const id = actualUser
            const endpoint = `/dashboard_user/allclases/${id}`;
            try {
                const response = await axios.get(urlServer + endpoint, {
                    headers: { Authorization: "Bearer " + token },
                })
                setClases(response.data.reserveClass)
            } catch (error) {

            }
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
        if (url === "#MiPerfil#Ingresos") {
            getUser();
            getEntry();
            getAllClases();
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
        setUrl("#MiPerfil#Clases")
    }
    function setterUrlReservas() {
        navigate("#Reservas")
        setUrl("#Reservas")
    }
    function setterUrlClases() {
        getAllClases();
        setUrl("#Clases")
    }

    return (
        <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: "10%" }}>
            {url === "#MiPerfil#Ingresos" ? <div>
                <Card style={{ width: "60vw" }}>
                    <Card.Header>
                        <Nav variant="tabs" defaultActiveKey="/dashboard_user#MiPerfil#Ingresos">
                            <Nav.Item style={{ display: "flex" }}>
                                <Nav.Link defaultActiveKey="/dashboard_user#MiPerfil#Ingresos" onClick={setterUrlMiPerfil} >
                                    <Link to="/dashboard_user#MiPerfil#Ingresos">Ingresos</Link>
                                </Nav.Link>
                                <Nav.Link defaultActiveKey="/dashboard_user#MiPerfil#Clases" onClick={setterUrlMiPerfilClases} >
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
                                    {clase.map((claseActual, i) => {
                                        console.log("id claseActual", claseActual.id_reserve)
                                        return (
                                            <tr key={i}>
                                                <td>{claseActual.name}</td>
                                                <td>{claseActual.date.split("T")[0]}</td>
                                                <td>{claseActual.hour.split(":")[0] + ":" + claseActual.hour.split(":")[1]}</td>
                                                <td><Button onClick={(e) => { deleteReservaClase(claseActual.id_reserve) }} className="btn-danger">Anular</Button></td>
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
            </div> : url === "#Clases" ? <div>
                <div>
                    <h1 style={{ width: "60vw" }}>Reserva tu clase preferida</h1>
                </div>
                <div>
                    <h1> Clases </h1>
                    <div style={{ display: "flex" }}>
                        {clases.map((clase, i) => {
                            return (
                                <Card key={i} style={{ width: '18rem' }}>
                                    <Button onClick={(e) => setClass(clase.id)}>{clase.name}</Button>
                                    <Card.Img variant="top" src={clase.img} />
                                </Card>)
                        })}
                    </div>

                    <div>
                        {clas !== undefined ? <div>
                            <Calendar name="calendar" onChange={onChange2} value={value2}></Calendar>
                        </div> : null}
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
                                <Button onClick={(e) => addReserveClass(value2, radioValue2, clas)}> Reservar Hora</Button>
                            </div>
                        </div> : null}

                    </div>

                </div>
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
        </div >
    );
}

export default DashboardUser;