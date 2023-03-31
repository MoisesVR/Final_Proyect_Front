import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

import axios from "axios";

const Class = () => {

    const [clases, setClases] = useState([]);

    const getClases = async () => {
        const urlServer = "https://backendproyect-5ybw4.ondigitalocean.app";
        const endpoint = "/clases";
        try {
            const response = await axios.get(urlServer + endpoint);
            setClases(response.data.clases);
        } catch ({ response: { data: message } }) {
            alert(message);
        }
    }

    useEffect(() => {
        getClases();
    }, [])

    return (
        <div>
            <div>
                <h1 className="text-center"> Nuestras Clases </h1>
            </div>
            {clases ?
                <div>
                    {clases.map((clase, i) => {
                        return (
                            <div key={i} style={{ display: "flex", padding: "1% " }}>
                                <Card.Img variant="top" src={clase.img} alt="" style={{ width: "30%" }} />
                                <Card.Body style={{ paddingLeft: "2%" }}>
                                    <Card.Title>
                                        {clase.name}
                                    </Card.Title>
                                    <Card.Text style={{ paddingTop: "2%" }}>
                                        {clase.description}
                                    </Card.Text>
                                </Card.Body>
                            </div>
                        );
                    })}
                </div>
                : null
            }
        </div>
    );
}

export default Class;