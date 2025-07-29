import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import EmployeeList from "./components/EmployeeList";
import CreateEmployee from './CreateEmployee';
import RegistrarPonto from "./RegistrarPonto";
import ListarPontos from "./ListarPontos";
import EditEmployee from './EditEmployee';

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <Router>
      <div className="App" style={{ padding: "2rem" }}>
        <h1>Sistema de Funcionários</h1>

        <Routes>
          <Route path="/" element={
            <>
              <CreateEmployee onEmployeeCreated={() => setRefresh(!refresh)} />
              <EmployeeList refresh={refresh} />
            </>
          } />
          <Route path="/edit/:id" element={<EditEmployee onEmployeeUpdated={() => setRefresh(!refresh)} />} />
          <Route path="/registrar-ponto" element={<RegistrarPonto />} />
          <Route path="/listar-pontos" element={<ListarPontos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


