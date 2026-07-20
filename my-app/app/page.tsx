import GerenciadorTarefas from "@/app/Components/GerenciadorTarefas";
import { buscarTarefas } from "@/app/data/Tarefas";

export default function Home() {
  const tarefas = buscarTarefas();

  return (
    <main className="page-shell">
      <section className="hero" aria-labelledby="titulo-principal">
        <div>
          <span className="eyebrow">Painel pessoal</span>
          <h1 id="titulo-principal">Lista de tarefas</h1>
          <p className="descricao">
            Organize sua rotina com clareza, adicione prioridades e acompanhe
            tudo em um painel simples.
          </p>
        </div>

        <div className="hero-card" aria-hidden="true">
          <span>Hoje</span>
          <strong>{tarefas.length}</strong>
          <small>tarefas prontas para planejar</small>
        </div>
      </section>

      <GerenciadorTarefas tarefasIniciais={tarefas} />
    </main>
  );
}
