"use client";

import { useState } from "react";
import NovaTarefa from "@/app/Components/NovaTarefas";
import { useContadorDeTarefas } from "@/app/hook/useContadordeTarefas";
import { Tarefa } from "@/app/types/tarefa";

interface GerenciadorTarefasProps {
  tarefasIniciais: Tarefa[];
}

export default function GerenciadorTarefas({
  tarefasIniciais,
}: GerenciadorTarefasProps) {
  const [tarefas, setTarefas] = useState<Tarefa[]>(tarefasIniciais);

  const quantidadeDeTarefas = useContadorDeTarefas(tarefas);

  function adicionarTarefa(titulo: string) {
    const novaTarefa: Tarefa = {
      id: Date.now(),
      titulo,
      concluida: false,
    };

    setTarefas((tarefasAtuais) => [novaTarefa, ...tarefasAtuais]);
  }

  function alternarTarefa(id: number) {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.map((tarefa) =>
        tarefa.id === id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa,
      ),
    );
  }

  function removerTarefa(id: number) {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.filter((tarefa) => tarefa.id !== id),
    );
  }

  return (
    <section className="task-board" aria-label="Gerenciador de tarefas">
      <NovaTarefa aoAdicionar={adicionarTarefa} />

      <div className="board-header">
        <div>
          <span className="section-label">Resumo</span>
          <h2>Suas tarefas</h2>
        </div>

        <p className="contador">
          <strong data-testid="contador">{quantidadeDeTarefas}</strong>
          <span>Total</span>
        </p>
      </div>

      {tarefas.length === 0 ? (
        <p className="empty-state">Nenhuma tarefa cadastrada.</p>
      ) : (
        <ul className="task-list" aria-label="Lista de tarefas">
          {tarefas.map((tarefa) => (
            <li
              key={tarefa.id}
              className={tarefa.concluida ? "task-item is-done" : "task-item"}
            >
              <label>
                <input
                  type="checkbox"
                  checked={tarefa.concluida}
                  onChange={() => alternarTarefa(tarefa.id)}
                />
                <span>{tarefa.titulo}</span>
              </label>

              <button type="button" onClick={() => removerTarefa(tarefa.id)}>
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
