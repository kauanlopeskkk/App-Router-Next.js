import { render, screen } from "@testing-library/react";
import Home from "./page";

jest.mock("@/app/data/Tarefas", () => ({
  buscarTarefas: jest.fn(() => [
    { id: 1, titulo: "Tarefa mockada", concluida: false },
    { id: 2, titulo: "Outra tarefa", concluida: true },
  ]),
}));

describe("Home", () => {
  it("renderiza a pagina inicial com dados mockados", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: /lista de tarefas/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Tarefa mockada")).toBeInTheDocument();
    expect(screen.getAllByText("2")[0]).toBeInTheDocument();
  });
});
