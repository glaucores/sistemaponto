import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = ({ onEmployeeUpdated }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Busca dados atuais do funcionário
  useEffect(() => {
    fetch(`http://localhost:8080/employees/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Funcionário não encontrado');
        return res.json();
      })
      .then(data => setEmployee(data))
      .catch(err => alert(err.message));
  }, [id]);

  // Função para enviar atualização
  const editarFuncionario = async (id, dadosAtualizados) => {
    try {
      const response = await fetch(`http://localhost:8080/employees/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosAtualizados),
      });

      if (!response.ok) {
        throw new Error(`Erro ao atualizar funcionário: ${response.statusText}`);
      }

      const funcionarioAtualizado = await response.json();
      alert("Funcionário atualizado com sucesso!");

      if (onEmployeeUpdated) onEmployeeUpdated();

      navigate('/'); // volta para a lista

      return funcionarioAtualizado;

    } catch (error) {
      console.error("Erro ao editar funcionário:", error);
      alert("Falha ao atualizar funcionário");
    }
  };

  // Manipula mudança nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prev => ({ ...prev, [name]: value }));
  };

  // Submissão do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    editarFuncionario(id, employee);
  };

  return (
    <div>
      <h2>Editar Funcionário</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            name="password"
            value={employee.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default EditEmployee;

