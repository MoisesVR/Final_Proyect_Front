import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../context/context";
import { Form, Button } from "react-bootstrap";

import axios from "axios";
import Swal from "sweetalert2";

function StartSession() {

    const [user, setUser] = useContext(UserContext);

    const navigate = useNavigate();
    const [usuario, setUserLocal] = useState({});

    const handleSetUser = ({ target: { value, name } }) => {
        const field = {};
        field[name] = value;
        setUserLocal({ ...usuario, ...field });
    };

    const login = async () => {
        const urlServer = "https://backendproyect-5ybw4.ondigitalocean.app";
        const endpoint = "/iniciarSesion";
        const { email, password } = usuario;
        try {
            if (!email || !password) return alert("Email  y password obligatorias");
            const { data: token } = await axios.post(urlServer + endpoint, usuario, {
            });
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Usuario identificado con éxito',
                showConfirmButton: false,
                timer: 1500
              })
            localStorage.setItem("token", token.token);
            localStorage.setItem("usuario", usuario.email);
            if (token.user[0].id_user_type === 1) {
                setUser(usuario)
                navigate("/dashboard#Usuarios");
            } else if (token.user[0].id_user_type === 2) {
                setUser(usuario)
                navigate("/dashboard_user#MiPerfil#Ingresos");
            }
        } catch (error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Email o Contraseña incorrecto',
                showConfirmButton: false,
                timer: 1500
              })
        }
    }

    return (
        <div>
            <Form style={{ width: "70%", paddingLeft: "30%", paddingTop: "3%" }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label> Email </Form.Label>
                    <Form.Control type="email" name="email" placeholder="Ingresar Email" value={usuario.email} onChange={handleSetUser} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label> Contraseña </Form.Label>
                    <Form.Control type="password" name="password" placeholder="Ingresar Contraseña" value={usuario.pass} onChange={handleSetUser} />
                </Form.Group>
                <Button variant="primary" onClick={login}>
                    Iniciar Sesión
                </Button>
            </Form>
        </div>
    );
}

export default StartSession;