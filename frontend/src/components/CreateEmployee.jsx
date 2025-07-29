import React, { useState } from "react";

function CreateEmployee({ onEmployeeCreated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEmployee = { name, email, password };

    fetch("http://localhost:8080/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEmployee),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao criar funcionário");
        return res.json();
      })
      .then(() => {
        alert("Funcionário criado com sucesso!");
        setName("");
        setEmail("");
        setPassword("");
        onEmployeeCreated(); // Notifica o App para atualizar a lista
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao criar funcionário");
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h2>Criar Funcionário</h2>
      <div>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Criar</button>
    </form>
  );
}

export default CreateEmployee;
