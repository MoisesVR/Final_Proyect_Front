import { Card } from "react-bootstrap";

const Services = () => {

    return (
        <div >
            <h1 className="text-center">Servicios</h1>
            <div style={{ display: "flex", padding: "1%" }}>
                <Card.Img variant="top" src="https://www.avanzaentucarrera.com/orientacion/comp/uploads/2020/08/AETC-preparador-fisico-y-nutricionista.jpg" alt="Preparador fisico para en sala de musculación" style={{ width: "30%" }} />
                <Card.Body style={{ paddingLeft: "2%" }}>
                    <Card.Title>
                        Profesores Staff
                    </Card.Title>
                    <Card.Text style={{ paddingTop: "2%" }}>
                        Acceso ilimitado a todas las clases dirigidas de la parrilla. Nuestras disciplinas guiadas siguen tendencias mundiales, siempre innovadoras y entretenidas. Dirigidas por talentosos profesores certificados.
                    </Card.Text>
                </Card.Body>
            </div>
            <div style={{ display: "flex", padding: "1%" }}>
                <Card.Img variant="top" src="https://clubsport.es/wp-content/uploads/2019/02/SALA-SPINNING-min.jpg" alt="Preparador fisico para en sala de musculación" style={{ width: "30%" }} />
                <Card.Body style={{ paddingLeft: "2%" }}>
                    <Card.Title>
                        Sala de Cycling
                    </Card.Title>
                    <Card.Text style={{ paddingTop: "2%" }}>
                        Disfruta de esta experiencia única en la ciudad, sala de ciclismo bajo techo, totalmente equipada con bicicletas del más alto nivel, garantizando seguridad y comodidad, avaladas por una de las marcas con mayor prestigio mundial. Este espacio te hará disfrutar de una disciplina guiada por instructores certificados, sofisticado sistema de climatización, tecnología audiovisual tipo cinema, lleno de pura energía y movimiento.
                    </Card.Text>
                </Card.Body>
            </div>
            <div style={{ display: "flex", padding: "1%" }}>
                <Card.Img variant="top" src="https://mx.habcdn.com/photos/project/medium/banos-vestidores-mujeres-golds-gym-176814.jpg" alt="Preparador fisico para en sala de musculación" style={{ width: "30%" }} />
                <Card.Body style={{ paddingLeft: "2%" }}>
                    <Card.Title>
                        Sala de Cycling
                    </Card.Title>
                    <Card.Text style={{ paddingTop: "2%" }}>
                        Disfruta de esta experiencia única en la ciudad, sala de ciclismo bajo techo, totalmente equipada con bicicletas del más alto nivel, garantizando seguridad y comodidad, avaladas por una de las marcas con mayor prestigio mundial. Este espacio te hará disfrutar de una disciplina guiada por instructores certificados, sofisticado sistema de climatización, tecnología audiovisual tipo cinema, lleno de pura energía y movimiento.
                    </Card.Text>
                </Card.Body>
            </div>
        </div>       
    );
}

export default Services;