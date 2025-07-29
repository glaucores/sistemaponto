import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  // Buscar funcionários
  const fetchEmployees = () => {
    fetch('http://localhost:8080/employees')
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error('Erro ao buscar funcionários:', err));
  };

  // Deletar funcionário
  const handleDelete = (id) => {
    console.log("Tentando deletar funcionário com id:", id);

    fetch(`http://localhost:8080/employees/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        console.log("Resposta do DELETE:", response);

        if (!response.ok) {
          throw new Error(`Erro ao excluir funcionário. Status: ${response.status}`);
        }
        // Atualiza a lista após exclusão
        fetchEmployees();
      })
      .catch((err) => console.error('Erro ao excluir funcionário:', err));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      <h2>Funcionários</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} - {employee.email}
            <button onClick={() => navigate(`/edit/${employee.id}`)}>Editar</button>
            <button onClick={() => handleDelete(employee.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;
