import React, { useEffect, useState } from "react";

function ListarPontos() {
  const [pontos, setPontos] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filterEmployeeId, setFilterEmployeeId] = useState("");

  // Buscar todos os pontos (com filtro opcional)
  const fetchPontos = () => {
    let url = "http://localhost:8080/pontos";
    // Para filtrar no backend, você pode implementar isso depois; por enquanto, só busca tudo
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPontos(data))
      .catch((err) => console.error("Erro ao buscar pontos:", err));
  };

  // Buscar funcionários para filtro
  const fetchEmployees = () => {
    fetch("http://localhost:8080/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Erro ao buscar funcionários:", err));
  };

  useEffect(() => {
    fetchEmployees();
    fetchPontos();
  }, []);

  // Filtra os pontos no frontend
  const pontosFiltrados = filterEmployeeId
    ? pontos.filter((ponto) => ponto.employee.id === parseInt(filterEmployeeId))
    : pontos;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lista de Pontos Registrados</h2>

      <div>
        <label>Filtrar por Funcionário:</label>
        <select
          value={filterEmployeeId}
          onChange={(e) => setFilterEmployeeId(e.target.value)}
        >
          <option value="">Todos</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>
      </div>

      <table border="1" cellPadding="8" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Funcionário</th>
            <th>Tipo</th>
            <th>Data e Hora</th>
          </tr>
        </thead>
        <tbody>
          {pontosFiltrados.map((ponto) => (
            <tr key={ponto.id}>
              <td>{ponto.id}</td>
              <td>{ponto.employee.name}</td>
              <td>{ponto.tipo}</td>
              <td>{new Date(ponto.dataHora).toLocaleString()}</td>
            </tr>
          ))}
          {pontosFiltrados.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                Nenhum registro encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListarPontos;
