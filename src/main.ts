import "./style.css";

type Topic = "connections" | "startups" | "life";
type Entry = {
  id: string;
  title: string;
  description: string;
  type: "Reflection" | "Field note";
  topics: Topic[];
  label: string;
  image?: string;
  paragraphs: string[];
  question: string;
};

const entries: Entry[] = [
  {
    id: "connections-that-matter",
    title: "The best connections start with paying attention",
    description:
      "On listening for what someone really needs, and noticing who might help.",
    type: "Reflection",
    topics: ["connections", "startups"],
    label: "PEOPLE & POSSIBILITIES",
    image: "connections",
    paragraphs: [
      "There’s a moment in a good conversation when the question underneath the question starts to appear. Someone talks about growing a company, but what they’re really looking for is a person who understands the problem from the inside.",
      "That’s the part I find interesting. Before thinking about an introduction, I want to understand what someone is trying to do, where they feel stuck, and what kind of help would actually be useful.",
      "A meaningful connection needs context on both sides. Why these two people? Why now? Is there a reason for both of them to be curious? Sometimes the most thoughtful next step is to ask a little more before connecting anyone.",
      "I like the idea of relationships as something you tend. Attention, care, and good timing matter. The introduction is a beginning; what grows from it belongs to the people involved.",
    ],
    question: "What becomes possible when we listen a little more closely?",
  },
  {
    id: "thinking-in-connections",
    title: "Some thoughts come alive in conversation",
    description:
      "A little room for thinking out loud, following tangents, and finding the thread.",
    type: "Reflection",
    topics: ["life", "connections"],
    label: "LIFE & LEARNING",
    image: "thinking",
    paragraphs: [
      "My thoughts don’t always arrive in a straight line. One idea brings another person to mind, which opens a question, which leads somewhere I wasn’t expecting.",
      "Talking helps me find the thread. There’s something about a question asked in the moment, or a small “tell me more,” that makes an unfinished thought easier to see.",
      "I’m interested in making room for that kind of thinking: curious, responsive, and open to a little wandering. A conversation can be a place to discover what we think, as well as a place to explain it.",
      "It asks for patience in both directions. Enough space to explore, and enough care to bring the conversation back to something useful. I’m still learning that balance.",
    ],
    question: "What helps you think: quiet, a blank page, or another person?",
  },
  {
    id: "ai-and-attention",
    title: "AI, and what we do with our attention",
    description:
      "Better tools make an old question more interesting: what is worth our attention?",
    type: "Field note",
    topics: ["life"],
    label: "AI & THE HUMAN SIDE",
    paragraphs: [
      "I’m curious about how AI can help us see and support the different strengths people bring. What might become possible if more people found the collaborators who understood their particular kind of genius?",
      "For me, the human layer is attention: understanding what matters to someone, what gives them energy, and what they want to contribute. Technology opens possibilities; a meaningful connection still asks us to see the person.",
      "This is a question I want to keep exploring, especially as AI becomes part of the everyday texture of work.",
    ],
    question: "Where could a tool free you to be more present?",
  },
  {
    id: "early-stage",
    title: "The right person at the right moment",
    description: "A thought on the changing needs of an early-stage company.",
    type: "Field note",
    topics: ["startups"],
    label: "BUILDING SOMETHING",
    paragraphs: [
      "An early-stage company’s needs can change quickly. A conversation that would have felt premature a month ago might suddenly be exactly the one a founder needs.",
      "I want to understand the moment a company is in. Are they trying to learn from a customer, find a partner, meet an advisor, or bring someone onto the team? The answer changes which connections are useful.",
      "That’s why context matters as much as a network. The useful question is often: what would help you move forward from here?",
    ],
    question: "What is the next conversation that would make a difference?",
  },
  {
    id: "better-questions",
    title: "An introduction is an invitation",
    description:
      "A small reminder to leave room for a yes, a no, and a better time.",
    type: "Field note",
    topics: ["connections"],
    label: "A LITTLE CARE",
    paragraphs: [
      "A thoughtful introduction begins with checking whether the connection would be useful to both people. It leaves room for each person to choose.",
      "I like a little context: what someone is working on, why I thought of the other person, and what a conversation might be about. Enough to make the possibility clear, without turning it into an obligation.",
      "Sometimes the timing isn’t right. That’s useful to know, too. Good relationships leave room for honesty.",
    ],
    question: "How can we make an invitation feel easy to answer?",
  },
  {
    id: "staying-curious",
    title: "Leaving a little room to be surprised",
    description: "On keeping our ideas open to revision.",
    type: "Field note",
    topics: ["life"],
    label: "STAYING CURIOUS",
    paragraphs: [
      "I like questions that stay interesting after the first answer. The kind that send you into a conversation with someone who sees things differently.",
      "Learning and personal growth seem to ask for a similar thing: enough confidence to follow what interests you, and enough openness to discover that you missed something.",
      "This notebook is a place for that. Ideas can take shape, change direction, and grow as I do.",
    ],
    question: "What have you changed your mind about lately?",
  },
];

const $ = <T extends HTMLElement>(selector: string) =>
  document.querySelector<T>(selector)!;
const reader = $<HTMLDialogElement>("#reader");
const searchDialog = $<HTMLDialogElement>("#search-dialog");
const searchInput = $<HTMLInputElement>("#search-input");
let currentFilter = "all";
const flower = '<span class="note-flower" aria-hidden="true">✳</span>';

function renderNotebook() {
  const filtered = entries.filter(
    (entry) =>
      currentFilter === "all" || entry.topics.includes(currentFilter as Topic),
  );
  const cards = filtered.filter((e) => e.type === "Reflection");
  const notes = filtered.filter((e) => e.type === "Field note");
  $("#cards").innerHTML = cards
    .map(
      (e) =>
        `<a class="reflection-card" href="#${e.id}" data-entry="${e.id}"><div class="thought-art thought-${e.image}" aria-hidden="true"><i></i><b></b><span>${e.image === "connections" ? "↗" : "≈"}</span><small>${e.image === "connections" ? "A SHARED DIRECTION" : "THINKING, TOGETHER"}</small></div><div class="card-copy"><span class="card-label">${e.label}</span><h4>${e.title}</h4><p>${e.description}</p><div class="card-meta"><span><span class="seed-dot"></span> In progress</span><span aria-hidden="true">↗</span></div></div></a>`,
    )
    .join("");
  $("#notes-list").innerHTML = notes
    .map(
      (e) =>
        `<a class="note-link" href="#${e.id}" data-entry="${e.id}">${flower}<div><span class="card-label">${e.label}</span><h4>${e.title}</h4></div><span class="note-arrow" aria-hidden="true">↗</span></a>`,
    )
    .join("");
  $("#cards-empty").hidden = cards.length > 0;
  $("#notes-empty").hidden = notes.length > 0;
  $("#filter-status").textContent = `${filtered.length} thoughts shown`;
}

function openEntry(id: string) {
  const entry = entries.find((e) => e.id === id);
  if (!entry) return;
  $("#reader-content").innerHTML =
    `<p class="eyebrow">${entry.type} <span> / </span> ${entry.label}</p><h2 id="reader-title">${entry.title}</h2><p class="reader-deck">${entry.description}</p><div class="reader-meta"><span class="seed-dot"></span> An open thought · Still taking shape</div>${entry.paragraphs.map((p) => `<p>${p}</p>`).join("")}<blockquote>${entry.question}</blockquote><div class="reader-end">A thought from Alicia’s notebook <span aria-hidden="true">✳</span></div>`;
  if (searchDialog.open) searchDialog.close();
  if (!reader.open) reader.showModal();
}

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  const link = target.closest<HTMLAnchorElement>("[data-entry]");
  if (link) {
    event.preventDefault();
    history.pushState(null, "", link.getAttribute("href"));
    openEntry(link.dataset.entry!);
  }
});

document.querySelectorAll<HTMLButtonElement>(".filter").forEach((button) =>
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter!;
    document.querySelectorAll(".filter").forEach((b) => {
      b.classList.toggle("active", b === button);
      b.setAttribute("aria-pressed", String(b === button));
    });
    renderNotebook();
  }),
);

function updateThemeLabel() {
  $("#theme-toggle").setAttribute(
    "aria-label",
    `Switch to ${document.documentElement.dataset.theme === "dark" ? "light" : "dark"} theme`,
  );
}
$("#theme-toggle").addEventListener("click", () => {
  const theme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("alicia-hub-theme", theme);
  } catch {
    /* Theme still works without storage. */
  }
  updateThemeLabel();
});

function renderSearch() {
  const query = searchInput.value.trim().toLowerCase();
  const terms = query.split(/\s+/).filter(Boolean);
  const results = entries.filter((e) => {
    const words =
      `${e.title} ${e.description} ${e.label} ${e.topics.join(" ")} ${e.paragraphs.join(" ")}`
        .toLowerCase()
        .split(/[^\p{L}\p{N}]+/u);
    return terms.every((term) => words.some((word) => word.startsWith(term)));
  });
  $("#search-results").innerHTML =
    `<p class="search-count">${query ? `${results.length} thought${results.length === 1 ? "" : "s"} found` : "A few paths to explore"}</p>` +
    (results.length
      ? results
          .map(
            (e) =>
              `<a class="search-result" href="#${e.id}" data-entry="${e.id}"><span class="card-label">${e.type}</span><h3>${e.title}</h3><span aria-hidden="true">↗</span></a>`,
          )
          .join("")
      : '<p class="search-empty">No thoughts on that just yet. Try “people”, “AI”, or “learning”.</p>');
}
$("#search-open").addEventListener("click", () => {
  searchInput.value = "";
  renderSearch();
  searchDialog.showModal();
  searchInput.focus();
});
searchInput.addEventListener("input", renderSearch);

document.querySelectorAll<HTMLDialogElement>("dialog").forEach((dialog) => {
  dialog
    .querySelector(".dialog-close")
    ?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      )
        dialog.close();
    }
  });
  dialog.addEventListener("close", () => {
    if (dialog === reader && entries.some((e) => `#${e.id}` === location.hash))
      history.replaceState(null, "", "#notebook");
  });
});

$("#colophon-open").addEventListener("click", () => {
  $("#reader-content").innerHTML =
    '<p class="eyebrow">BEHIND THIS LITTLE CORNER</p><h2 id="reader-title">The colophon.</h2><p>A personal home for Alicia Lin: a connector of people, ideas, and possibilities.</p><p>This original design draws on <a href="https://www.hume.ai/">Hume’s luminous visual language</a>, <a href="https://www.cosmos.so/">Cosmos’s spaciousness</a>, and <a href="https://www.are.na/">Are.na’s thoughtful community spirit</a>. The network is an interactive expression of Alicia’s approach to connection.</p><p>Set in Bricolage Grotesque, Newsreader, and DM Sans. Built with TypeScript and Vite, with original CSS and SVG graphics. The proposed writing and visual design were created with AI assistance.</p><p>No analytics or account required. Your theme preference stays in your browser.</p><div class="reader-end">People first. Possibility always. <span aria-hidden="true">↗</span></div>';
  reader.showModal();
});

const lenses: Record<string, { text: string; symbol: string }> = {
  genius: {
    text: "Everyone has a particular kind of brilliance.<br>I’m curious about what makes yours come alive.",
    symbol: "✳",
  },
  purpose: {
    text: "The right people share more than an interest.<br>They care about where they’re going together.",
    symbol: "◎",
  },
  energy: {
    text: "Some conversations give you energy.<br>I pay attention to that feeling of possibility.",
    symbol: "≈",
  },
  possibility: {
    text: "Different strengths. A shared direction.<br>That’s where something new can begin.",
    symbol: "↗",
  },
};
document
  .querySelectorAll<HTMLButtonElement>("[data-lens]")
  .forEach((button) => {
    button.addEventListener("click", () => {
      const lens = button.dataset.lens!;
      document
        .querySelectorAll<HTMLButtonElement>("[data-lens]")
        .forEach((node) => {
          node.classList.toggle("active", node === button);
          node.setAttribute("aria-pressed", String(node === button));
        });
      $(".network-stage").dataset.active = lens;
      $("#network-insight").innerHTML = lenses[lens].text;
      $(".insight-symbol").textContent = lenses[lens].symbol;
    });
  });

window.addEventListener("popstate", () => {
  const id = location.hash.slice(1);
  if (entries.some((e) => e.id === id)) openEntry(id);
  else if (reader.open) reader.close();
});
$("#year").textContent = String(new Date().getFullYear());
renderNotebook();
updateThemeLabel();
if (entries.some((e) => e.id === location.hash.slice(1)))
  openEntry(location.hash.slice(1));
