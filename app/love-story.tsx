"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const originalMemories = Array.from(
  { length: 19 },
  (_, index) => ({
    src: `/memories/photo-${String(index + 1).padStart(2, "0")}.jpg`,
    caption: "um pedacinho de nós",
  }),
);

const newMemories = [
  { src: "/memories/Novas/WhatsApp%20Image%202026-08-19%20at%2008.29.35.jpeg", caption: "beijo com vista e tudo" },
  { src: "/memories/Novas/aniversario_dela.jpeg", caption: "o aniversário dela" },
  { src: "/memories/Novas/dia_de_jogo_do_brasil_na_copa/WhatsApp%20Image%202026-08-19%20at%2008.29.35%20(1).jpeg", caption: "dia de Brasil na Copa" },
  { src: "/memories/Novas/dia_de_jogo_do_brasil_na_copa/WhatsApp%20Image%202026-08-19%20at%2008.29.35%20(2).jpeg", caption: "Brasil, beijo e festa" },
  { src: "/memories/Novas/dia_de_jogo_do_brasil_na_copa/WhatsApp%20Image%202026-08-19%20at%2008.29.35.jpeg", caption: "ela e a amarelinha" },
  { src: "/memories/Novas/dia_de_jogo_do_brasil_na_copa/WhatsApp%20Image%202026-08-19%20at%2008.29.36%20(1).jpeg", caption: "torcida em casal" },
  { src: "/memories/Novas/dia_de_jogo_do_brasil_na_copa/WhatsApp%20Image%202026-08-19%20at%2008.29.36.jpeg", caption: "mais um beijo pela Seleção" },
  { src: "/memories/Novas/dia_que_ela_me_fez_raiva.jpeg", caption: "o dia que ela me fez raiva" },
  { src: "/memories/Novas/ela_assumindo_que_torce_pro_flamengo.jpeg", caption: "a prova contra o Palmeiras" },
  { src: "/memories/Novas/ela_me_assumindo.jpeg", caption: "o dia em que ela me assumiu" },
  { src: "/memories/Novas/foto3_no_aniversario_dela.jpeg", caption: "mais uma do aniversário dela" },
  { src: "/memories/Novas/outra_foto_aniversario_dela.jpeg", caption: "porque uma foto só era pouco" },
  { src: "/memories/Novas/passeio_no_acude.jpeg", caption: "nosso passeio no Açude Velho" },
  { src: "/memories/Novas%202/WhatsApp%20Image%202026-08-19%20at%2009.30.18.jpeg", caption: "ela novinha e toda fofinha" },
  { src: "/memories/Novas%202/WhatsApp%20Image%202026-08-19%20at%2009.30.41.jpeg", caption: "esse sorriso já existia" },
  { src: "/memories/Novas%202/WhatsApp%20Image%202026-08-19%20at%2009.31.54.jpeg", caption: "essa eu vou deixar sem explicação 😂" },
];

// Para esconder uma foto apenas do carrossel, coloque uma parte única do nome
// do arquivo nesta lista. Exemplo: "photo-06.jpg" ou "ela_me_assumindo.jpeg".
const hiddenFromCarousel: string[] = [
  "09.30.18.jpeg",
  "09.30.41.jpeg",
  "09.31.54.jpeg",
];

const memories = [...originalMemories, ...newMemories].filter(
  (memory) => !hiddenFromCarousel.some((fileName) => memory.src.includes(fileName)),
);

const featuredStories = [
  {
    src: "/memories/Novas/ela_me_assumindo.jpeg",
    number: "01",
    title: "Ela me assumiu",
    text: "Foi assim que você resolveu me assumir: enrolado num lençol e parecendo que eu tava sendo mantido em cativeiro 😂.",
  },
  {
    src: "/memories/Novas/dia_que_ela_me_fez_raiva.jpeg",
    number: "02",
    title: "Sabe me fezar raiva",
    text: "Nesse dia você me fez raiva. E foi muita, tá? Mas eu precisava deixar registrado porque eu QUASE nunca me estresso.",
  },
  {
    src: "/memories/Novas/ela_assumindo_que_torce_pro_flamengo.jpeg",
    number: "03",
    title: "Palmeirense? Não por muito tempo ...",
    text: "Você fala que é palmeirense, mas essa foto no peito da camisa do Flamengo não ajuda muito a sua defesa não viu 😂.",
  },
  {
    src: "/memories/Novas/passeio_no_acude.jpeg",
    number: "04",
    title: "Passeio no Açude",
    text: "Nosso passeio no Açude Velho. A foto ficou meio torta, pegou metade da estátua, mas o beijo saiu certinho.",
  },
];

const notes = [
  ["Lomba eterna", "Você dorme demais viu? Às vezes acho que namora mais com a cama do que comigo."],
  ["Minha psicóloga", "Você estudando Psicologia e eu aqui dando assunto suficiente pra um TCC inteiro. O seu autista preferido."],
  ["Macarrão com você", "Eu comeria macarrão todos os dias com você. Sem reclamar e ainda dividia o último pouquinho."],
  ["Seu Dreher", "Um Dreher, a gente junto em carioca e alguma conversa besta. Pra mim já tá ótimo."],
];

const youngPhotos = [
  {
    src: "/memories/Novas%202/WhatsApp%20Image%202026-08-19%20at%2009.30.18.jpeg",
    caption: "Você pode até não gostar dessa, mas eu achei fofinha sim 😂",
  },
  {
    src: "/memories/Novas%202/WhatsApp%20Image%202026-08-19%20at%2009.30.41.jpeg",
    caption: "O sorriso continua exatamente o mesmo ❤️",
  },
  {
    src: "/memories/Novas%202/WhatsApp%20Image%202026-08-19%20at%2009.31.54.jpeg",
    caption: "Essa aqui é simplesmente uma obra de arte, a melhor Emilia que tá tendo",
  },
];

const revealPhotos = [
  {
    src: "/memories/revelacoes/dia-feliz-no-barril.jpg",
    title: "Um dia feliz no Barril",
    caption: "Essa foto é bonita sim e eu posso provar: a gente tá feliz nela 😂❤️",
  },
  {
    src: "/memories/revelacoes/dia-que-roubaram-o-celular.jpg",
    title: "O dia que roubaram o celular",
    caption: "O celular foi embora, mas pelo menos essa foto sobreviveu pra chegar até aqui.",
  },
  {
    src: "/memories/revelacoes/escovando-os-dentes.jpg",
    title: "Escovando os dentes",
    caption: "Uma foto que talvez não precisasse existir. Por isso mesmo eu precisava colocar 😂",
  },
];

const relationshipTerms = [
  {
    icon: "🍝",
    title: "Meus horários de almoço",
    text: "Já aceitei que meus horários de almoço agora são seus. Se der pra passar 15 minutinhos na sua casa, eu vou dar um jeito de ir.",
  },
  {
    icon: "🚗",
    title: "Deixar tu dirigir meu carro",
    text: "A maior prova de confiança que eu poderia te dar. Deixei tu dirigir meu carro e ainda fui no banco do passageiro. Não sei se confio mais em você ou em Deus e Nossa Senhora.",
  },
  {
    icon: "🛵",
    title: "Uma Biz branca",
    text: "Essa aqui é simples: aceitou namorar comigo, ganhou uma Biz branca. Pode tirar print porque depois eu não aceito dizer que nunca prometi.",
  },
];

const unscriptedDates = [
  {
    src: "/memories/novas-ultimas/eu_comeria_hamburguer_agridoce_por_voce.jpeg",
    act: "ato 01 · amor agridoce",
    title: "Te amo comendo hambúrguer agridoce",
    text: "Eu comeria hambúrguer agridoce por você. E olha que isso já é uma declaração bem séria.",
  },
  {
    src: "/memories/novas-ultimas/foto_fofa_na_burgueria_79.jpeg",
    act: "ato 02 · mesa para dois",
    title: "Nossa foto mais bonita juntos",
    text: "Um coração no meio da foto e duas pessoas fingindo que esse date bonito é a coisa mais normal do mundo.",
  },
  {
    src: "/memories/novas-ultimas/fotinha_fofa_depois_de_voce_tomar_dreher_no_carioca.jpeg",
    act: "ato 03 · depois do Dreher",
    title: "Te amo quando tu tá 3.5 de Dreher",
    text: "A expressão serena de quem tomou Dreher no Carioca e, mesmo assim, ainda saiu bonita na foto.",
  },
  {
    src: "/memories/novas-ultimas/minha_ana_castela.jpeg",
    act: "ato 04 · participação especial",
    title: "Te amo até vestida de Ana Castela",
    text: "Chapéu na cabeça, pose de boiadeira e o meu coração completamente sem defesa.",
  },
];

export function LoveStory() {
  const [active, setActive] = useState(0);
  const [musicOn, setMusicOn] = useState(false);
  const [buttonEscaping, setButtonEscaping] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [revealedStoryCount, setRevealedStoryCount] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const carouselScrollFrame = useRef<number | null>(null);
  const audio = useRef<HTMLAudioElement>(null);

  const move = useCallback((direction: number) => {
    setActive((current) => {
      const next = (current + direction + memories.length) % memories.length;
      window.requestAnimationFrame(() => {
        const container = carousel.current;
        const selected = container?.querySelector<HTMLElement>(`[data-index="${next}"]`);
        if (container && selected) {
          container.scrollTo({
            left: selected.offsetLeft - (container.clientWidth - selected.clientWidth) / 2,
            behavior: "smooth",
          });
        }
      });
      return next;
    });
  }, []);

  const syncActiveMemory = useCallback(() => {
    if (carouselScrollFrame.current !== null) return;

    carouselScrollFrame.current = window.requestAnimationFrame(() => {
      carouselScrollFrame.current = null;
      const container = carousel.current;
      if (!container) return;

      const containerCenter = container.scrollLeft + container.clientWidth / 2;
      const cards = container.querySelectorAll<HTMLElement>("[data-index]");
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card) => {
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const distance = Math.abs(cardCenter - containerCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = Number(card.dataset.index ?? 0);
        }
      });

      setActive((current) => current === closestIndex ? current : closestIndex);
    });
  }, []);

  useEffect(() => () => {
    if (carouselScrollFrame.current !== null) {
      window.cancelAnimationFrame(carouselScrollFrame.current);
    }
  }, []);

  const toggleMusic = () => {
    if (!audio.current) return;
    if (audio.current.paused) {
      if (audio.current.currentTime < 20) audio.current.currentTime = 20;
      audio.current.play().then(() => setMusicOn(true)).catch(() => setMusicOn(false));
    } else {
      audio.current.pause();
      setMusicOn(false);
    }
  };

  return (
    <main>
      <div className="grain" aria-hidden="true" />
      <audio ref={audio} src="/memories/Jorge%20Vercillo%20-%20Monalisa.mp3" loop preload="auto" />
      <section className="hero">
        <div className="hero-photo" aria-hidden="true" />
        <div className="hero-shade" />
        <div className="hero-orbit orbit-one" aria-hidden="true">✦</div>
        <div className="hero-orbit orbit-two" aria-hidden="true">♥</div>

        <div className="hero-content">
          <p className="eyebrow">fiz isso pra você, mozin</p>
          <h1>
            Para você,
            <span>Angeliny.</span>
          </h1>
          <p className="hero-copy">
            Você sabe que eu não sou o cara mais romântico do mundo,<br />
            mas tô tentando viu? Fiz tudo isso pensando em você. ❤️
          </p>
          <div className="hero-actions">
            <button className={`hero-music ${musicOn ? "playing" : ""}`} onClick={toggleMusic} type="button">
              <span className="play-disc" aria-hidden="true">{musicOn ? "Ⅱ" : "▶"}</span>
              <span><small>tem música pra acompanhar</small><strong>{musicOn ? "Pausar música" : "Dar play na música"}</strong></span>
            </button>
          </div>
        </div>

        <p className="scroll-note">role para sentir essa história</p>
      </section>

      <section className="declaration" id="historia">
        <div className="section-number">01</div>
        <div className="declaration-copy">
          <p className="eyebrow dark">só pra você saber</p>
          <h2>Você deixa tudo<br /><em>mais especial.</em></h2>
          <p>
            Mozin, eu queria fazer uma coisa diferente pra mostrar o quanto você
            é especial pra mim. Eu sei que nem sempre sou o melhor com palavras,
            mas quero que você saiba que sou muito feliz por ter você na minha vida.
          </p>
          <p>
            Com você até os dias mais normais ficam bons. Gosto das nossas
            conversas, das nossas besteiras, dos seus abraços e até quando quero ficar acordado e tu so dorme ...
          </p>

          <p>
            Claro que isso não é tudo que eu queria te dizer, mas eu espero que você sinta o quanto você é importante pra mim. ❤️
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
        <p className="eyebrow">algumas coisas que eu amo em você</p>
        <h2>Só pra deixar registrado...</h2>
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

      <section className="throwback" aria-labelledby="throwback-title">
        <div className="throwback-heading">
          <p className="eyebrow">conteúdo que ela não autorizou</p>
          <h2 id="throwback-title">Angeliny antes<br />de mim.</h2>
          <p>Você falou que não gosta dessas fotos. Eu olhei, achei você fofinha e resolvi ignorar essa informação 😂❤️</p>
        </div>
        <div className="throwback-grid">
          {youngPhotos.map((photo, index) => (
            <figure key={photo.src}>
              <span>arquivo 0{index + 1}</span>
              <img src={photo.src} alt={`Angeliny mais nova, foto ${index + 1}`} loading="lazy" />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="photo-reveal" aria-labelledby="reveal-title">
        <div className="reveal-heading">
          <p className="eyebrow dark">agora ficou perigoso</p>
          <h2 id="reveal-title">Fotos que tu<br /><em>não queria aqui.</em></h2>
          <p>Essa parte funciona por etapas. Vai clicando e descobrindo uma de cada vez, mozin 😂</p>
        </div>

        <div className="reveal-grid">
          {revealPhotos.map((photo, index) => {
            const isRevealed = index < revealedCount;
            const isNext = index === revealedCount;

            return (
              <button
                className={`reveal-card ${isRevealed ? "revealed" : "covered"} ${isNext ? "next" : "locked"}`}
                disabled={!isRevealed && !isNext}
                key={photo.src}
                onClick={() => isNext && setRevealedCount((count) => Math.min(count + 1, revealPhotos.length))}
                type="button"
                aria-label={isRevealed ? `${photo.title}, revelada` : `Revelar foto ${index + 1}`}
              >
                <img src={photo.src} alt={photo.title} loading="lazy" />
                <span className="reveal-cover" aria-hidden={isRevealed}>
                  <small>segredo 0{index + 1}</small>
                  <strong>{isNext ? "Clique pra descobrir" : "Abra a anterior primeiro"}</strong>
                  <i>♥</i>
                </span>
                <span className="reveal-caption">
                  <strong>{photo.title}</strong>
                  <small>{photo.caption}</small>
                </span>
              </button>
            );
          })}
        </div>

        <p className={`reveal-progress ${revealedCount === revealPhotos.length ? "complete" : ""}`} aria-live="polite">
          {revealedCount === revealPhotos.length
            ? "Pronto. Revelei todas e ainda estou vivo 😂"
            : `${revealedCount} de ${revealPhotos.length} segredos revelados`}
        </p>
      </section>

      <section className="story-album" aria-labelledby="story-album-title">
        <div className="story-intro">
          <p className="eyebrow dark">essas aqui têm história</p>
          <h2 id="story-album-title">Fotos que<br /><em>precisam de contexto.</em></h2>
          <p>Tem foto bonita, foto engraçada e foto que você talvez quisesse esconder. Coloquei todas mesmo assim.</p>
        </div>
        <div className="story-grid">
          {featuredStories.map((story, index) => {
            const isRevealed = index < revealedStoryCount;
            const isNext = index === revealedStoryCount;

            return (
              <button
                className={`story-card ${isRevealed ? "story-revealed" : "story-covered"} ${isNext ? "story-next" : "story-locked"}`}
                disabled={!isRevealed && !isNext}
                key={story.title}
                onClick={() => isNext && setRevealedStoryCount((count) => Math.min(count + 1, featuredStories.length))}
                type="button"
                aria-label={isRevealed ? `${story.title}, revelada` : `Revelar história ${index + 1}`}
              >
                <div className="story-image"><img src={story.src} alt={story.title} loading="lazy" /></div>
                <div className="story-copy">
                  <span>{story.number}</span>
                  <h3>{story.title}</h3>
                  <p>{story.text}</p>
                </div>
                <span className="story-cover" aria-hidden={isRevealed}>
                  <small>história {story.number}</small>
                  <strong>{isNext ? "Clique pra ver a foto" : "Descubra a anterior primeiro"}</strong>
                  <i>♥</i>
                </span>
              </button>
            );
          })}
        </div>
        <p className={`story-progress ${revealedStoryCount === featuredStories.length ? "complete" : ""}`} aria-live="polite">
          {revealedStoryCount === featuredStories.length
            ? "Agora sim, todas as histórias foram reveladas ❤️"
            : `${revealedStoryCount} de ${featuredStories.length} histórias reveladas`}
        </p>
      </section>

      <section className="cinema">
        <div className="cinema-heading">
          <div>
            <p className="eyebrow">mais um pouquinho da gente</p>
            <h2>Uns videozinhos nossos.</h2>
          </div>
          <p>Porque eu gosto de guardar essas coisas pra ver de novo depois.</p>
        </div>
        <div className="video-grid">
          <figure>
            <video src="/memories/moment-01.mp4" autoPlay muted loop playsInline controls aria-label="Um vídeo especial nosso" />
            <figcaption>vídeo 01 | só a gente</figcaption>
          </figure>
          <figure>
            <video src="/memories/moment-02.mp4" autoPlay muted loop playsInline controls aria-label="Mais um vídeo especial nosso" />
            <figcaption>vídeo 02 | e esse sorriso</figcaption>
          </figure>
        </div>
      </section>

      <section className="unscripted" aria-labelledby="unscripted-title">
        <div className="unscripted-heading">
          <div>
            <p className="eyebrow dark">entre hambúrguer, Dreher, sertanejo e palhaçada</p>
            <h2 id="unscripted-title">Um namoro<br /><em>sem roteiro.</em></h2>
          </div>
          <p>
            A gente sai pra comer, tira uma foto bonita, inventa personagem e termina no circo.
            Com você, até o improviso vira uma memória que eu quero guardar.
          </p>
        </div>

        <div className="date-scrapbook">
          {unscriptedDates.map((date) => (
            <figure className="date-card" key={date.src}>
              <div className="date-photo">
                <img src={date.src} alt={date.title} loading="lazy" />
              </div>
              <figcaption>
                <span>{date.act}</span>
                <h3>{date.title}</h3>
                <p>{date.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <article className="circus-finale">
          <div className="circus-copy">
            <span>grand finale · circo de Soley</span>
            <p className="circus-stars" aria-hidden="true">✦ ♥ ✦</p>
            <h3>A melhor pior<br /><em>palhaça do circo.</em></h3>
            <p>
              Não existe date comum quando você resolve transformar tudo em espetáculo.
              Nota artística: 10. Técnica: a gente conversa depois 😂
            </p>
          </div>
          <div className="circus-video">
            <video
              src="/memories/novas-ultimas/a_melhor_pior_palha%C3%A7a_do_circo_de_soley.mp4"
              controls
              playsInline
              preload="metadata"
              aria-label="A melhor pior palhaça do Circo de Soley"
            />
            <span>aperte o play para o espetáculo</span>
          </div>
        </article>
      </section>

      <section className="gallery" aria-labelledby="gallery-title">
        <div className="gallery-title">
          <div>
            <p className="eyebrow dark">nosso rolo de câmera</p>
            <h2 id="gallery-title">Um monte de foto<br /><em>da gente.</em></h2>
          </div>
          <div className="carousel-buttons">
            <button onClick={() => move(-1)} aria-label="Foto anterior" type="button">←</button>
            <button onClick={() => move(1)} aria-label="Próxima foto" type="button">→</button>
          </div>
        </div>

        <div
          className="carousel"
          ref={carousel}
          onScroll={syncActiveMemory}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              move(-1);
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              move(1);
            }
          }}
          role="region"
          aria-label="Galeria de fotos. Arraste ou use as setas esquerda e direita."
          tabIndex={0}
        >
          {memories.map((memory, index) => (
            <button
              className={`memory ${index === active ? "active" : ""}`}
              data-index={index}
              key={memory.src}
              onClick={() => setActive(index)}
              aria-label={`Ver memória ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
              type="button"
            >
              <img src={memory.src} alt={`Angeliny e seu amor: ${memory.caption}`} loading={index > 4 ? "lazy" : "eager"} />
              <span className="memory-meta"><strong>{memory.caption}</strong><small>{String(index + 1).padStart(2, "0")} / {memories.length}</small></span>
            </button>
          ))}
        </div>
        <p className="drag-note">arraste ou use as setas para passear pelas nossas memórias</p>
      </section>

      <section className="relationship-terms" aria-labelledby="terms-title">
        <div className="terms-heading">
          <p className="eyebrow dark">os termos desse namoro</p>
          <h2 id="terms-title">Aceitou, agora aguente.</h2>
        </div>
        <div className="terms-grid">
          {relationshipTerms.map((term) => (
            <article key={term.title}>
              <span aria-hidden="true">{term.icon}</span>
              <h3>{term.title}</h3>
              <p>{term.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="letter">
        <div className="letter-photo">
          <img src="/memories/photo-19.jpg" alt="Nós dois em uma noite especial" />
          <span aria-hidden="true">A + ♥</span>
        </div>
        <div className="paper">
          <p className="date">Pra você, mozin ❤️</p>
          <h2>Angeliny,</h2>
          <p>
            Fiz tudo isso pra você porque queria achar um jeito de mostrar o
            quanto você é especial pra mim. Sou muito feliz por ter você comigo
            e sou grato por tudo que a gente vive.
          </p>
          <p>
            Ter você na minha vida deixa meus dias mais felizes. Gosto de viver
            nossas coisas, tirar nossas fotos, tentar te acordar depois de mais
            uma soneca e ouvir você falando de coisas da saúde / humanas que eu não faço a menor ideia do que se trata.
          </p>
          <p>
            Amo até os nossos momentos mais simples, porque, quando estou com você, qualquer coisa se torna especial. Espero que a gente ainda construa muitas lembranças bonitas juntos. Quero continuar tendo você do meu lado.
          </p>

          <p>Sei que tenho meus erros e acertos, mas te prometo continuar tentando melhorar a cada dia e cuidar cada vez melhor do que a gente tem. </p>

          <p> De todas as coisas boas que a vida poderia ter me dado, ter encontrado você foi uma das melhores. </p>

          <p> Você é o melhor presente que eu já recebi. </p>

        </div>
      </section>

      <section className="finale">
        <div className="heart-bloom" aria-hidden="true">
          {Array.from({ length: 18 }, (_, i) => <i key={i}>♥</i>)}
        </div>
        <p className="eyebrow">e depois de tudo...</p>
        <h2>Angeliny, aceita<br />namorar comigo?</h2>
        <p className="proposal-instruction">Perceba, e clique botão para aceitar!</p>

        <div className="proposal-stage">
          <button
            aria-disabled="true"
            className={`yes-button escape-button ${buttonEscaping ? "roaming" : "waiting"}`}
            onClick={(event) => event.preventDefault()}
            onPointerDown={(event) => {
              event.preventDefault();
              setButtonEscaping(true);
            }}
            onPointerEnter={() => setButtonEscaping(true)}
            type="button"
          >
            Sim, eu aceito ❤️
          </button>
        </div>
        <p className="made-with">fiz do meu jeito, mas fiz de coração ❤️</p>
      </section>
    </main>
  );
}
