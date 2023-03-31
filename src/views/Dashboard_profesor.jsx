/* import { useState } from "react"; */
import { Card, Nav, Table, Button } from "react-bootstrap";

const DashboardProfesor = () => {

    return (
        <div>
            <Card style={{ width: "100%" }}>
                <Card.Header>
                    <Nav variant="tabs" defaultActiveKey="/dashboard_profesor">
                        <Nav.Item style={{ display: "flex" }}>
                            <Nav.Link href={`/dashboard_profesor`} >Clases</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Cupo listo</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Cycling</td>
                                <td>30/50</td>
                                <td>05/03</td>
                                <td>11:00</td>
                                <td><Button className="btn-danger">Finalizar Clase</Button></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Yoga</td>
                                <td>40/60</td>
                                <td>15/02</td>
                                <td>15:00</td>
                                <td><Button className="btn-danger">Confirmar</Button></td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>);
}

export default DashboardProfesor;