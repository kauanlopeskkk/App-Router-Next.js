import { fireEvent, render, screen, within } from "@testing-library/react";
import GerenciadorTarefas from "./GerenciadorTarefas";
import { Tarefa } from "@/app/types/tarefa";

const tarefas: Tarefa[] = [
  { id: 1, titulo: "Estudar Next.js", concluida: false },
  { id: 2, titulo: "Praticar testes", concluida: true },
];

const STORAGE_KEY = "tarefas:v1";

describe("GerenciadorTarefas", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renderiza as tarefas iniciais e o contador", () => {
    render(<GerenciadorTarefas tarefasIniciais={tarefas} />);

    expect(screen.getByText("Estudar Next.js")).toBeInTheDocument();
    expect(screen.getByText("Praticar testes")).toBeInTheDocument();
    expect(screen.getByTestId("contador")).toHaveTextContent("2");
  });

  it("adiciona uma nova tarefa", () => {
    jest.spyOn(Date, "now").mockReturnValue(99);

    render(<GerenciadorTarefas tarefasIniciais={tarefas} />);

    fireEvent.change(screen.getByRole("textbox", { name: /nova tarefa/i }), {
      target: { value: "Enviar projeto" },
    });
    fireEvent.click(screen.getByRole("button", { name: /adicionar/i }));

    expect(screen.getByText("Enviar projeto")).toBeInTheDocument();
    expect(screen.getByTestId("contador")).toHaveTextContent("3");

    const raw = localStorage.getItem(STORAGE_KEY);
    expect(raw).not.toBeNull();
  });

  it("alterna e remove tarefas", () => {
    render(<GerenciadorTarefas tarefasIniciais={tarefas} />);

    const checkbox = screen.getByRole("checkbox", { name: /estudar next.js/i });
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    const item = screen.getByText("Estudar Next.js").closest("li");
    expect(item).not.toBeNull();

    fireEvent.click(
      within(item as HTMLElement).getByRole("button", { name: /remover/i }),
    );

    expect(screen.queryByText("Estudar Next.js")).not.toBeInTheDocument();
    expect(screen.getByTestId("contador")).toHaveTextContent("1");
  });

  it("mostra o estado vazio quando nao ha tarefas", () => {
    render(<GerenciadorTarefas tarefasIniciais={[]} />);

    expect(screen.getByText("Nenhuma tarefa cadastrada.")).toBeInTheDocument();
    expect(screen.getByTestId("contador")).toHaveTextContent("0");
  });
});
