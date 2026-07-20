import { renderHook } from "@testing-library/react";
import { useContadorDeTarefas } from "./useContadordeTarefas";
import { Tarefa } from "@/app/types/tarefa";

const criarTarefa = (id: number): Tarefa => ({
  id,
  titulo: `Tarefa ${id}`,
  concluida: false,
});

describe("useContadorDeTarefas", () => {
  it("retorna a quantidade de tarefas recebidas", () => {
    const { result, rerender } = renderHook(
      ({ tarefas }) => useContadorDeTarefas(tarefas),
      {
        initialProps: {
          tarefas: [criarTarefa(1), criarTarefa(2)],
        },
      },
    );

    expect(result.current).toBe(2);

    rerender({ tarefas: [criarTarefa(1)] });

    expect(result.current).toBe(1);
  });
});
