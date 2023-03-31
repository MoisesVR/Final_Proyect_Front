import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
/* import { DataContext } from "../context/contextApi";
*/
import UserContext from "../context/context";
import { Form, Button } from "react-bootstrap";

import axios from "axios";

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
            alert("Usuario identificado con éxito");
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
            alert(error);
        }
    }

/*     const getUser = async () => {
        const urlServer = "http://localhost:3000";
        const endpoint = "/dashboard_user/usuarios";
        const email = localStorage.getItem("usuario");
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(urlServer + endpoint, {
                email: email
            }, {
                headers: { Authorization: "Bearer" + token },
            })
            setUserActual(response.data.gettedUser[0].id);
        } catch (error) {
            alert(error);
        }
    }

    console.log("user Actual->", userActual)

    localStorage.setItem("usuario", userActual.id)

    useEffect(() => {
        if (usuario.length !== undefined) {
            getUser();
        }
    }) */

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