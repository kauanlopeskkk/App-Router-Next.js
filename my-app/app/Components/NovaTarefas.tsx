"use client";

import { FormEvent, useState } from "react";

interface NovaTarefaProps {
  aoAdicionar: (titulo: string) => void;
}

export default function NovaTarefa({ aoAdicionar }: NovaTarefaProps) {
  const [titulo, setTitulo] = useState("");
  const [erro, setErro] = useState("");

  function adicionarTarefa(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const tituloFormatado = titulo.trim();

    if (!tituloFormatado) {
      setErro("Digite o nome da tarefa.");
      return;
    }

    aoAdicionar(tituloFormatado);

    setTitulo("");
    setErro("");
  }

  return (
    <form
      className="task-form"
      onSubmit={adicionarTarefa}
      aria-label="Formulario de nova tarefa"
    >
      <div className="formulario">
        <label htmlFor="titulo">Nova tarefa</label>

        <input
          id="titulo"
          name="titulo"
          type="text"
          placeholder="Digite uma tarefa"
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
          aria-describedby={erro ? "erro-tarefa" : undefined}
        />

        <button type="submit">Adicionar</button>
      </div>

      {erro && (
        <p id="erro-tarefa" role="alert" className="erro">
          {erro}
        </p>
      )}
    </form>
  );
}
