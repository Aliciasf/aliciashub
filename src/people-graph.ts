// All people and opportunities below are fictional examples, approved for the public demo.
// Keep introductions as explicit edges: displayed counts are derived, never invented metrics.
export const people = [
  {
    id: "maya",
    name: "Maya Chen",
    role: "AI founder",
    initials: "MC",
    x: 160,
    y: 96,
    tone: "copper",
    interest: "Turning an ambitious AI idea into something people love to use.",
  },
  {
    id: "jordan",
    name: "Jordan Ellis",
    role: "Product designer",
    initials: "JE",
    x: 405,
    y: 65,
    tone: "sage",
    interest: "Making emerging technology feel thoughtful, useful, and human.",
  },
  {
    id: "sam",
    name: "Sam Rivera",
    role: "ML engineer",
    initials: "SR",
    x: 650,
    y: 110,
    tone: "blue",
    interest:
      "Building practical AI with people who care about its real-world impact.",
  },
  {
    id: "leo",
    name: "Leo Park",
    role: "Startup advisor",
    initials: "LP",
    x: 700,
    y: 300,
    tone: "gold",
    interest:
      "Helping early teams find a clear direction and a sustainable way forward.",
  },
  {
    id: "ava",
    name: "Ava Brooks",
    role: "Community builder",
    initials: "AB",
    x: 640,
    y: 510,
    tone: "sage",
    interest: "Bringing curious people together around ideas worth exploring.",
  },
  {
    id: "noah",
    name: "Noah Kim",
    role: "Researcher",
    initials: "NK",
    x: 405,
    y: 555,
    tone: "blue",
    interest:
      "Connecting research insights with people who can put them into practice.",
  },
  {
    id: "priya",
    name: "Priya Shah",
    role: "Climate founder",
    initials: "PS",
    x: 160,
    y: 510,
    tone: "gold",
    interest: "Finding collaborators who want to build for a healthier planet.",
  },
  {
    id: "eli",
    name: "Eli Morgan",
    role: "Story strategist",
    initials: "EM",
    x: 100,
    y: 300,
    tone: "copper",
    interest:
      "Helping purposeful ideas find a story that resonates with people.",
  },
] as const;

type PersonId = (typeof people)[number]["id"];
export const introductions: { from: PersonId; to: PersonId; why: string }[] = [
  {
    from: "maya",
    to: "jordan",
    why: "Bring a human-centered design perspective to an early AI product.",
  },
  {
    from: "maya",
    to: "sam",
    why: "Explore how a product vision could become a working AI prototype.",
  },
  {
    from: "maya",
    to: "leo",
    why: "Talk through the next decisions for an early-stage company.",
  },
  {
    from: "maya",
    to: "eli",
    why: "Find a clearer story for the people the product hopes to serve.",
  },
  {
    from: "jordan",
    to: "noah",
    why: "Turn research into a more thoughtful product experience.",
  },
  {
    from: "jordan",
    to: "priya",
    why: "Explore a more approachable experience for a climate-focused idea.",
  },
  {
    from: "jordan",
    to: "ava",
    why: "Learn from community conversations while shaping a new experience.",
  },
  {
    from: "sam",
    to: "noah",
    why: "Connect technical research with hands-on engineering.",
  },
  {
    from: "sam",
    to: "priya",
    why: "Explore practical applications of AI to a climate problem.",
  },
  {
    from: "leo",
    to: "priya",
    why: "Bring an outside perspective to a growing company’s next chapter.",
  },
  {
    from: "leo",
    to: "eli",
    why: "Connect company strategy with a clear, grounded narrative.",
  },
  {
    from: "ava",
    to: "noah",
    why: "Create a conversation between researchers and a curious community.",
  },
  {
    from: "ava",
    to: "eli",
    why: "Give a community’s shared purpose a story people can connect with.",
  },
  {
    from: "ava",
    to: "priya",
    why: "Bring people together around a shared interest in climate solutions.",
  },
  {
    from: "noah",
    to: "priya",
    why: "Explore where an emerging research insight could meet a real need.",
  },
  {
    from: "priya",
    to: "eli",
    why: "Make a complex climate idea easier to understand and care about.",
  },
];

const map = document.querySelector<HTMLElement>("#people-map")!;
const nodes = document.querySelector<HTMLElement>("#people-nodes")!;
const lines = document.querySelector<SVGElement>("#people-lines")!;
const detail = document.querySelector<HTMLElement>("#people-detail-content")!;
const reset = document.querySelector<HTMLButtonElement>("#people-reset")!;
const linkedEdges = (id: PersonId) =>
  introductions.filter((edge) => edge.from === id || edge.to === id);
let selected: PersonId | null = null;

document.querySelector("#people-summary")!.textContent =
  `${people.length} example people · ${introductions.length} possible introductions`;
nodes.innerHTML = people
  .map(
    (person) =>
      `<button type="button" class="person-node tone-${person.tone}" data-person="${person.id}" style="--node-x:${person.x / 8}%;--node-y:${person.y / 6.2}%" aria-pressed="false" aria-controls="people-detail-content" aria-label="${person.name}, ${person.role}, ${linkedEdges(person.id).length} possible introductions"><span class="person-avatar">${person.initials}<span class="person-count">${linkedEdges(person.id).length}</span></span><span class="person-name">${person.name}</span><span class="person-role">${person.role}</span></button>`,
  )
  .join("");

function renderConnections() {
  detail.parentElement!.scrollTop = 0;
  const connected = new Set<PersonId>();
  if (selected)
    linkedEdges(selected).forEach((edge) => {
      connected.add(edge.from);
      connected.add(edge.to);
    });
  map.classList.toggle("has-selection", selected !== null);
  lines.innerHTML =
    people
      .map(
        (person) =>
          `<line class="hub-spoke" x1="400" y1="310" x2="${person.x}" y2="${person.y - 16}"/>`,
      )
      .join("") +
    introductions
      .map((edge) => {
        const from = people.find((p) => p.id === edge.from)!;
        const to = people.find((p) => p.id === edge.to)!;
        const active = selected === edge.from || selected === edge.to;
        return `<path class="intro-edge ${active ? "is-active" : ""}" d="M${from.x} ${from.y - 16} Q400 310 ${to.x} ${to.y - 16}"/>`;
      })
      .join("");
  nodes
    .querySelectorAll<HTMLButtonElement>("[data-person]")
    .forEach((button) => {
      const id = button.dataset.person as PersonId;
      button.classList.toggle("is-selected", id === selected);
      button.classList.toggle(
        "is-related",
        selected !== null && id !== selected && connected.has(id),
      );
      button.classList.toggle(
        "is-unrelated",
        selected !== null && !connected.has(id),
      );
      button.setAttribute("aria-pressed", String(id === selected));
    });

  if (!selected) {
    detail.innerHTML = `<p class="eyebrow">THE POSSIBILITIES BETWEEN PEOPLE</p><h3 id="people-detail-title">A network is just<br>the beginning.</h3><p class="people-detail-intro">The interesting part is who could help each other move forward.</p><div class="people-overview"><div><strong>${people.length}</strong><span>example people</span></div><div><strong>${introductions.length}</strong><span>possible introductions</span></div></div><div class="people-pick-hint"><span aria-hidden="true">↖</span><p>Choose a name.<br>See their possible connections and what could bring them together.</p></div><p class="people-panel-footnote">An illustration of the connector effect. Every introduction begins with a conversation and mutual interest.</p>`;
    reset.classList.add("is-overview");
    return;
  }

  const person = people.find((p) => p.id === selected)!;
  const edges = linkedEdges(selected);
  detail.innerHTML = `<p class="eyebrow">EXAMPLE PERSON / POSSIBLE CONNECTIONS</p><div class="selected-person-heading"><span class="detail-avatar tone-${person.tone}">${person.initials}</span><div><h3 id="people-detail-title" tabindex="-1">${person.name}</h3><p>${person.role}</p></div></div><p class="person-interest">${person.interest}</p><div class="intro-list-heading"><strong>${edges.length}</strong><span>possible introductions<br>through Alicia</span></div><ul class="introduction-list">${edges
    .map((edge) => {
      const other = people.find(
        (p) => p.id === (edge.from === selected ? edge.to : edge.from),
      )!;
      return `<li><button type="button" data-select-person="${other.id}" aria-label="Explore ${other.name}’s connections"><span><strong>${other.name}</strong><small>${other.role}</small></span><span aria-hidden="true">↗</span></button><p>${edge.why}</p></li>`;
    })
    .join(
      "",
    )}</ul><p class="people-panel-footnote">Illustrative possibilities, not confirmed matches or available introductions.</p>`;
  reset.classList.remove("is-overview");
}

nodes.addEventListener("click", (event) => {
  const button = (event.target as Element).closest<HTMLButtonElement>(
    "[data-person]",
  );
  if (!button) return;
  selected = button.dataset.person as PersonId;
  renderConnections();
});
detail.addEventListener("click", (event) => {
  const button = (event.target as Element).closest<HTMLButtonElement>(
    "[data-select-person]",
  );
  if (!button) return;
  selected = button.dataset.selectPerson as PersonId;
  renderConnections();
  detail.querySelector<HTMLElement>("#people-detail-title")?.focus();
});
reset.addEventListener("click", () => {
  selected = null;
  renderConnections();
});
renderConnections();
