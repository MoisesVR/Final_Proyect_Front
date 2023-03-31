import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";

import axios from "axios";

const Plans = () => {

    const [plans, setPlans] = useState([]);

    const getPlans = async () => {
        const urlServer = "http://localhost:3000";
        const endpoint = "/planes";
        try {
            const response = await axios.get(urlServer + endpoint);
            setPlans(response.data.plans);
        } catch ({ response: { data: message } }) {
            alert(message);
        }
    }

    useEffect(() => {
        getPlans();
    }, []);

    return (
        <div>
            <div>
                <h1 className="text-center"> Nuestros Planes </h1>
            </div>
            {plans  ?
                <div>
                    {plans.map((plan, i) => {
                        if (plan.cost === 0) {

                        } else {
                            return (
                                <div key={i} style={{ paddingLeft: "20%", paddingRight: "20%", paddingTop: "2%" }}>
                                    <Card className="text-center" style={{ width: "100%" }}>
                                        <Card.Header>{plan.name}</Card.Header>
                                        <Card.Body >
                                            <Card.Title>{plan.duration}</Card.Title>
                                            <Card.Text>{plan.description}</Card.Text>
                                            <Card.Text>${plan.cost}</Card.Text>
                                            <Button variant="primary" href={`/registrar`} >Contratar</Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            );
                        }
                    })}
                </div>
                : null
            }

        </div>
    );
}

export default Plans;