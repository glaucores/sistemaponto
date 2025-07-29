import React, { useState, useEffect } from 'react';

function CreateEmployee({ onEmployeeCreated }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEmployee = { name, email, password };

    const response = await fetch('http://localhost:8080/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEmployee),
    });

    if (response.ok) {
      alert('Funcionário criado com sucesso!');
      setName('');
      setEmail('');
      setPassword('');
      if (onEmployeeCreated) onEmployeeCreated(); // Atualiza a lista se passado como prop
    } else {
      alert('Erro ao criar funcionário');
    }
  };

  return (
    <div>
      <h2>Criar Funcionário</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
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
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default CreateEmployee;