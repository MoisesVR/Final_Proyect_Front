import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import axios from "axios";


function Register() {

    const [usuario, setUserLocal] = useState({ id_user_type: 1 });

    const navigate = useNavigate();

    const handleSetUser = ({ target: { value, name } }) => {
        const field = {};
        field[name] = value;
        setUserLocal({ ...usuario, ...field });
    };

    const register = async () => {
        const urlServer = "http://localhost:3000";
        const endpoint = "/registrar";
        let { nombre, email, password, direccion, forma_de_pago, id_user_type, id_plan } = usuario;
        try {
            if (!nombre || !email || !password || !direccion || !forma_de_pago || !id_user_type || !id_plan) return alert("Falta ingresar datos");
            await axios.post(urlServer + endpoint, usuario);
            alert("Usuario registrado con exito");
            navigate("/iniciarSesion");
        } catch ({ response: { data: message } }) {
            alert(message);
        }
    }

    return (
        <div>
            <Form style={{ width: "70%", paddingLeft: "30%", paddingTop: "3%" }}>
                <Form.Group className="mb-3" controlId="formBasicNombre">
                    <Form.Label> Nombre </Form.Label>
                    <Form.Control type="text" name="nombre" placeholder="Ingresar Nombre" value={usuario.name} onChange={handleSetUser} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Ingresar Email" value={usuario.email} onChange={handleSetUser} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label> Contraseña </Form.Label>
                    <Form.Control type="password" name="password" placeholder="Ingresar Contraseña" value={usuario.password} onChange={handleSetUser} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDirrecion">
                    <Form.Label> Direccion </Form.Label>
                    <Form.Control type="text" name="direccion" placeholder="Ingresar Direccion" value={usuario.direccion} onChange={handleSetUser} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Forma de pago</Form.Label>
                    <Form.Select id="forma_de_pago" name="forma_de_pago" value={usuario.payment_type} onChange={handleSetUser}>
                        <option>Selecciona una forma de pago</option>
                        <option id="forma_de_pago" name="forma_de_pago" value="Efectivo">Efectivo</option>
                        <option id="forma_de_pago" name="forma_de_pago" value="Tarjeta de Credito">Tarjeta de Credito</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Planes</Form.Label>
                    <Form.Select id="id_plan" name="id_plan" value={usuario.id_plan} onChange={handleSetUser}>
                        <option>Selecciona un Plan </option>
                        <option id="id_plan" name="id_plan" value= {1}> Anual </option>
                        <option id="id_plan" name="id_plan" value={2}> Trimestral </option>
                        <option id="id_plan" name="id_plan" value={3}> Semestral </option>
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" onClick={register}>
                    Registrar
                </Button>
            </Form>
        </div>
    );
}

export default Register;