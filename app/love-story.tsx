"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const memories = Array.from(
  { length: 19 },
  (_, index) => `/memories/photo-${String(index + 1).padStart(2, "0")}.jpg`,
);

const notes = [
  ["Seu sorriso", "que faz qualquer dia comum parecer especial."],
  ["Seu jeitinho", "que me ganha de novo, até quando você nem percebe."],
  ["Nós dois", "porque perto de você, até o silêncio tem graça."],
];

export function LoveStory() {
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState(0);
  const [answered, setAnswered] = useState(false);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!opened) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % memories.length),
      4200,
    );
    return () => window.clearInterval(timer);
  }, [opened]);

  const move = useCallback((direction: number) => {
    setActive((current) =>
      (current + direction + memories.length) % memories.length,
    );
  }, []);

  useEffect(() => {
    const selected = carousel.current?.querySelector(`[data-index="${active}"]`);
    selected?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active]);

  const openLetter = () => {
    setOpened(true);
    window.setTimeout(() => {
      document.querySelector("#historia")?.scrollIntoView({ behavior: "smooth" });
    }, 650);
  };

  return (
    <main>
      <div className="grain" aria-hidden="true" />

      <section className={`hero ${opened ? "is-open" : ""}`}>
        <div className="hero-photo" aria-hidden="true" />
        <div className="hero-shade" />
        <div className="hero-orbit orbit-one" aria-hidden="true">✦</div>
        <div className="hero-orbit orbit-two" aria-hidden="true">♥</div>

        <div className="hero-content">
          <p className="eyebrow">uma surpresa em forma de amor</p>
          <h1>
            Para você,
            <span>Angeliny.</span>
          </h1>
          <p className="hero-copy">
            Algumas pessoas chegam e mudam o rumo da nossa história.<br />
            Você mudou até o jeito como eu enxergo o mundo.
          </p>
          <button className="open-button" onClick={openLetter} type="button">
            <span>Abrir meu coração</span>
            <span className="button-heart" aria-hidden="true">♥</span>
          </button>
        </div>

        <p className="scroll-note">role para sentir essa história</p>
      </section>

      <section className="declaration" id="historia">
        <div className="section-number">01</div>
        <div className="declaration-copy">
          <p className="eyebrow dark">meu lugar favorito</p>
          <h2>Você faz a vida<br /><em>ter mais cor.</em></h2>
          <p>
            Angeliny, eu poderia tentar explicar tudo o que você significa para
            mim, mas sempre que penso em nós, as palavras parecem pequenas.
            Você transformou momentos simples em lembranças que eu quero guardar
            para sempre.
          </p>
          <p>
            É no seu sorriso que eu encontro paz. No seu abraço, casa. E em cada
            versão nossa — romântica, boba, espontânea — encontro mais um motivo
            para amar dividir a vida com você.
          </p>
        </div>
        <div className="polaroid-stack" aria-label="Duas memórias nossas">
          <figure className="polaroid back">
            <img src="/memories/photo-18.jpg" alt="Nós dois sorrindo juntos" />
          </figure>
          <figure className="polaroid front">
            <img src="/memories/photo-06.jpg" alt="Um beijo cheio de carinho" />
            <figcaption>minha pessoa favorita ♡</figcaption>
          </figure>
        </div>
      </section>

      <section className="reasons">
        <p className="eyebrow">se eu tivesse que resumir...</p>
        <h2>São infinitos motivos.<br />Estes são só três.</h2>
        <div className="reason-grid">
          {notes.map(([title, text], index) => (
            <article className="reason-card" key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cinema">
        <div className="cinema-heading">
          <div>
            <p className="eyebrow">cenas que eu repetiria</p>
            <h2>Nós, em movimento.</h2>
          </div>
          <p>Porque alguns segundos dizem mais do que páginas inteiras.</p>
        </div>
        <div className="video-grid">
          <figure>
            <video src="/memories/moment-01.mp4" autoPlay muted loop playsInline controls aria-label="Um vídeo especial nosso" />
            <figcaption>take 01 — só a gente</figcaption>
          </figure>
          <figure>
            <video src="/memories/moment-02.mp4" autoPlay muted loop playsInline controls aria-label="Mais um vídeo especial nosso" />
            <figcaption>take 02 — e esse sorriso</figcaption>
          </figure>
        </div>
      </section>

      <section className="gallery" aria-labelledby="gallery-title">
        <div className="gallery-title">
          <div>
            <p className="eyebrow dark">nosso rolo de câmera</p>
            <h2 id="gallery-title">Cada foto,<br /><em>um pedacinho de nós.</em></h2>
          </div>
          <div className="carousel-buttons">
            <button onClick={() => move(-1)} aria-label="Foto anterior" type="button">←</button>
            <button onClick={() => move(1)} aria-label="Próxima foto" type="button">→</button>
          </div>
        </div>

        <div className="carousel" ref={carousel}>
          {memories.map((photo, index) => (
            <button
              className={`memory ${index === active ? "active" : ""}`}
              data-index={index}
              key={photo}
              onClick={() => setActive(index)}
              aria-label={`Ver memória ${index + 1}`}
              type="button"
            >
              <img src={photo} alt={`Angeliny e seu amor, memória ${index + 1}`} loading={index > 4 ? "lazy" : "eager"} />
              <span>{String(index + 1).padStart(2, "0")} / {memories.length}</span>
            </button>
          ))}
        </div>
        <p className="drag-note">arraste para passear pelas nossas memórias</p>
      </section>

      <section className="letter">
        <div className="letter-photo">
          <img src="/memories/photo-19.jpg" alt="Nós dois em uma noite especial" />
          <span aria-hidden="true">A + ♥</span>
        </div>
        <div className="paper">
          <p className="date">Para Angeliny, hoje e em todos os amanhãs</p>
          <h2>Meu amor,</h2>
          <p>
            Obrigado por ser colo, parceria, risada e aventura. Por tornar meus
            dias mais leves e meus planos muito mais bonitos só por estar neles.
          </p>
          <p>
            Quero continuar colecionando cafés, viagens, fotos tremidas, abraços
            demorados e todas as pequenas coisas que viram gigantes quando são
            vividas ao seu lado.
          </p>
          <p>
            Eu escolho você nos dias extraordinários — e, principalmente, nos
            dias comuns. É você quem eu quero por perto quando a vida estiver
            acontecendo de verdade.
          </p>
          <p className="signature">Com todo o meu amor,<br /><strong>para sempre seu.</strong></p>
        </div>
      </section>

      <section className="finale">
        <div className="heart-bloom" aria-hidden="true">
          {Array.from({ length: 18 }, (_, i) => <i key={i}>♥</i>)}
        </div>
        <p className="eyebrow">e depois de tudo...</p>
        <h2>Angeliny, aceita continuar<br />escrevendo essa história comigo?</h2>
        {!answered ? (
          <button className="yes-button" onClick={() => setAnswered(true)} type="button">
            Sempre, meu amor ♥
          </button>
        ) : (
          <div className="answer" role="status">
            <span>♥</span>
            <p>Então vem cá me dar um abraço.<br /><strong>Eu te amo, Angeliny.</strong></p>
          </div>
        )}
        <p className="made-with">feito com amor, memórias e um pouquinho de saudade</p>
      </section>
    </main>
  );
}
