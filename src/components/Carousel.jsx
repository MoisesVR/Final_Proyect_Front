import Carousel from 'react-bootstrap/Carousel';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function UncontrolledExample() {
    const navigate = useNavigate();
  return (
    <Carousel>
      <Carousel.Item>
        <img
          src="https://media.glamour.mx/photos/638e434ac84633754915d1c4/16:9/w_2560%2Cc_limit/tendencias_fitness_2023_crossfit.jpg"
          alt="First slide"
          style={{width: "100%", textAlign: "center", height: "97vh"}}
        />
        <Carousel.Caption>
          <h3>Energia y Salud en Movimiento</h3>
          <Button variant='dark' onClick={()=>{navigate("/planes")}}>Nuestros Planes</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="https://i.blogs.es/e4ac8b/entrenamiento-personal/1366_2000.jpeg"
          alt="Second slide"
          style={{width: "100%", textAlign: "center", height: "97vh"}}
        />

        <Carousel.Caption>
          <h3>Personal altamente capacitado</h3>
          <Button variant='dark' onClick={()=>{navigate("/servicios")}}>Nuestros Servicios</Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;