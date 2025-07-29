import React, { useEffect, useState } from "react";

function RegistrarPonto() {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [tipo, setTipo] = useState("ENTRADA");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);

  const registrarPonto = async () => {
    if (!employeeId) {
      alert("Selecione um funcionário.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/pontos?employeeId=${employeeId}&tipo=${tipo}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        setMensagem("Ponto registrado com sucesso!");
      } else {
        setMensagem("Erro ao registrar ponto.");
      }
    } catch (err) {
      console.error(err);
      setMensagem("Erro ao registrar ponto.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Registrar Ponto</h2>

      <div>
        <label>Funcionário:</label>
        <select
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        >
          <option value="">Selecione</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Tipo de Ponto:</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="ENTRADA">ENTRADA</option>
          <option value="SAIDA">SAÍDA</option>
        </select>
      </div>

      <button onClick={registrarPonto}>Bater Ponto</button>

      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default RegistrarPonto;
