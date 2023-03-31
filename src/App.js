import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from "./views/Home";
import Plans from "./views/Plans";
import Services from "./views/Services";
import Class from "./views/Class";
import Register from "./views/Register";
import StartSession from "./views/StartSession";
import DashboardAdmin from "./views/DashboardAdmin";
import DashboardUser from "./views/DashboardUser";
import DashboardProfesor from "./views/Dashboard_profesor";

import Navbar from "./components/Navbar";

import UserContext from "./context/context";
import { useState } from "react";

function App() {

  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <BrowserRouter>

        <Navbar />

        <Routes>
          <Route path="/" element={< Home />} />
          <Route path="/planes" element={< Plans />} />
          <Route path="/servicios" element={< Services />} />
          <Route path="/clases" element={< Class />} />
          <Route path="/registrar" element={< Register />} />
          <Route path="/iniciarSesion" element={< StartSession />} />
          <Route path="/dashboard" element={< DashboardAdmin />} />
          <Route path="/dashboard_user" element={< DashboardUser />} />
          <Route path="/dashboard_profesor" element={< DashboardProfesor />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
