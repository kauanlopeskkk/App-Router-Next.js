import { fireEvent, render, screen } from "@testing-library/react";
import NovaTarefa from "./NovaTarefas";

describe("NovaTarefa", () => {
  it("exibe uma mensagem de erro ao enviar o formulario vazio", () => {
    const aoAdicionar = jest.fn();

    render(<NovaTarefa aoAdicionar={aoAdicionar} />);

    fireEvent.click(screen.getByRole("button", { name: /adicionar/i }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Digite o nome da tarefa.",
    );
    expect(aoAdicionar).not.toHaveBeenCalled();
  });

  it("envia o titulo formatado e limpa o campo", () => {
    const aoAdicionar = jest.fn();

    render(<NovaTarefa aoAdicionar={aoAdicionar} />);

    const input = screen.getByRole("textbox", { name: /nova tarefa/i });
    fireEvent.change(input, { target: { value: "  Revisar testes  " } });
    fireEvent.click(screen.getByRole("button", { name: /adicionar/i }));

    expect(aoAdicionar).toHaveBeenCalledWith("Revisar testes");
    expect(input).toHaveValue("");
  });
});
