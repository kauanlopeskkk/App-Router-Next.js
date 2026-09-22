"use client";

import { useEffect, useRef, useState } from "react";
import NovaTarefa from "@/app/Components/NovaTarefas";
import { useContadorDeTarefas } from "@/app/hook/useContadordeTarefas";
import { Tarefa } from "@/app/types/tarefa";

interface GerenciadorTarefasProps {
  tarefasIniciais: Tarefa[];
}

const STORAGE_KEY = "tarefas:v1";

function lerTarefasDoStorage(): Tarefa[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return null;

    const tarefas = parsed
      .map((item) => {
        if (typeof item !== "object" || item === null) return null;
        const maybe = item as Partial<Tarefa>;

        if (
          typeof maybe.id !== "number" ||
          typeof maybe.titulo !== "string" ||
          typeof maybe.concluida !== "boolean"
        ) {
          return null;
        }

        return {
          id: maybe.id,
          titulo: maybe.titulo,
          concluida: maybe.concluida,
        } satisfies Tarefa;
      })
      .filter((v): v is Tarefa => v !== null);

    return tarefas;
  } catch {
    return null;
  }
}

export default function GerenciadorTarefas({
  tarefasIniciais,
}: GerenciadorTarefasProps) {
  const [tarefas, setTarefas] = useState<Tarefa[]>(tarefasIniciais);
  const quantidadeDeTarefas = useContadorDeTarefas(tarefas);

  const hasLoadedFromStorage = useRef(false);

  useEffect(() => {
    if (hasLoadedFromStorage.current) return;
    hasLoadedFromStorage.current = true;

    const tarefasDoStorage = lerTarefasDoStorage();
    if (tarefasDoStorage) {
      queueMicrotask(() => setTarefas(tarefasDoStorage));
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedFromStorage.current) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
    } catch {
      // no-op
    }
  }, [tarefas]);

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
