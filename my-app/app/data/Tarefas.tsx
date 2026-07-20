import { Tarefa } from "@/app/types/tarefa";

export const tarefasIniciais: Tarefa[] = [
  {
    id: 1,
    titulo: "Estudar Next.js",
    concluida: false,
  },
  {
    id: 2,
    titulo: "Praticar testes unitarios",
    concluida: true,
  },
  {
    id: 3,
    titulo: "Criar o repositorio no GitHub",
    concluida: false,
  },
];

export function buscarTarefas(): Tarefa[] {
  return tarefasIniciais;
}
