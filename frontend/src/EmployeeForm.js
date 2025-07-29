import React, { useState, useEffect } from 'react';

function EmployeeForm({ onAdd }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEmployee = { name, email, password };

    // Chama o callback para adicionar o funcionário (que vamos passar lá no componente principal)
    onAdd(newEmployee);

    // Limpa o formulário
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Criar novo funcionário</h3>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default EmployeeForm;
