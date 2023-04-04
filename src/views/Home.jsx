import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    return (
        <div>
            <Card className="text-center">
                <Card.Header>PLANES</Card.Header>
                <Card.Body >
                    <Card.Title>Energía y Salud en Movimiento</Card.Title>
                    <Card.Text>
                        <img src="https://media.glamour.mx/photos/638e434ac84633754915d1c4/16:9/w_2560%2Cc_limit/tendencias_fitness_2023_crossfit.jpg" width={"30%"} alt="Mujer levantado una kettlebell" />
                    </Card.Text>
                    <Button onClick={() => {
                        navigate("/planes")
                    }} variant="primary"> Planes
                    </Button>
                </Card.Body>
            </Card>
            <br />
            <br />
            <Card className="text-center" >
                <Card.Header>Servicios</Card.Header>
                <Card.Body >
                    <Card.Title>Personal altamente capacitado</Card.Title>
                    <Card.Text>
                        <img src="https://i.blogs.es/e4ac8b/entrenamiento-personal/1366_2000.jpeg" width={"30%"} alt="" />
                    </Card.Text>
                    <Button onClick={() => {
                        navigate("/servicios")
                    }} variant="primary" > Servicios
                    </Button>
                </Card.Body>
            </Card>
        </div>


    );
}


export default Home;