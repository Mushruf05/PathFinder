const careers = [
  {
    name: "Software Developer",
    category: "Technology",
    description: "Build apps, websites and software.",
    interests: ["technology", "building"],
    strengths: ["analytical", "creative"],
    subjects: "Computer Science and Mathematics",
    next: "Try beginner programming and build a small website.",
    challenges: "Requires regular coding practice and continuous learning."
  },
  {
    name: "AI / Machine Learning",
    category: "Technology",
    description: "Explore how computers learn from data.",
    interests: ["technology", "science"],
    strengths: ["analytical", "research"],
    subjects: "Mathematics, Statistics and Computer Science",
    next: "Learn Python basics and experiment with simple datasets.",
    challenges: "Often involves mathematics, coding and experimentation."
  },
  {
    name: "Engineer",
    category: "Engineering",
    description: "Design and improve machines, structures or systems.",
    interests: ["building", "science", "technology"],
    strengths: ["analytical", "creative"],
    subjects: "Depends on the engineering branch; Mathematics and Physics are common.",
    next: "Explore different engineering branches and their entry requirements.",
    challenges: "Requirements and daily work vary by branch."
  },
  {
    name: "Healthcare Professional",
    category: "Healthcare",
    description: "Help people through different healthcare professions.",
    interests: ["science", "helping"],
    strengths: ["empathy", "research"],
    subjects: "Biology and Chemistry may be relevant; requirements depend on the role.",
    next: "Explore healthcare careers beyond medicine, such as laboratory and allied health roles.",
    challenges: "Training, responsibilities and licensing depend on the profession."
  },
  {
    name: "Business Analyst",
    category: "Business",
    description: "Study information to help organizations make decisions.",
    interests: ["business", "technology"],
    strengths: ["analytical", "communication"],
    subjects: "Mathematics, Economics, Business Studies or Statistics may help.",
    next: "Try a simple spreadsheet project and practise explaining your findings.",
    challenges: "Requires careful analysis and communication."
  },
  {
    name: "Graphic Designer",
    category: "Creative Design",
    description: "Create visual designs for digital and print media.",
    interests: ["creative", "building", "communication"],
    strengths: ["creative", "communication"],
    subjects: "Art, Design or Computer Applications may be useful.",
    next: "Create a small portfolio of original designs.",
    challenges: "Requires practice, feedback and portfolio development."
  },
  {
    name: "Environmental Scientist",
    category: "Environment",
    description: "Study nature and investigate environmental challenges.",
    interests: ["nature", "science"],
    strengths: ["research", "analytical"],
    subjects: "Biology, Chemistry, Geography or related sciences.",
    next: "Explore local environmental projects and introductory science activities.",
    challenges: "May involve fieldwork, research and data analysis."
  },
  {
    name: "Journalist",
    category: "Media",
    description: "Research and communicate news and stories.",
    interests: ["communication", "creative", "helping"],
    strengths: ["communication", "research"],
    subjects: "Languages, Social Studies and Media Studies may help.",
    next: "Write a short, fact-checked article about a topic you enjoy.",
    challenges: "Requires accuracy, research and responsible reporting."
  },
  {
    name: "Teacher / Educator",
    category: "Education",
    description: "Help people understand subjects and develop skills.",
    interests: ["helping", "communication"],
    strengths: ["communication", "empathy", "research"],
    subjects: "The relevant subject and required teaching qualifications depend on the role.",
    next: "Try explaining a topic to a classmate and research teaching pathways.",
    challenges: "Requires preparation, patience and strong communication."
  }
];

const assessmentForm = document.getElementById("assessmentForm");
const recommendations = document.getElementById("recommendations");
const assessmentMessage = document.getElementById("assessmentMessage");
const careerList = document.getElementById("careerList");
const careerSearch = document.getElementById("careerSearch");
const savedCareers = new Set();

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

function makeCareerCard(career, showScore = false) {
  const saved = savedCareers.has(career.name);

  return `
    <article class="panel">
      <span class="tag">${escapeHTML(career.category)}</span>
      <h3>${escapeHTML(career.name)}</h3>
      <p>${escapeHTML(career.description)}</p>
      ${showScore ? `<p><strong>Why it matched:</strong></p>
        <ul class="card-reasons">
          ${career.reasons.map(reason => `<li>${escapeHTML(reason)}</li>`).join("")}
        </ul>` : ""}
      <p><strong>Subjects to explore:</strong><br>${escapeHTML(career.subjects)}</p>
      ${showScore ? `<p><strong>Suggested next step:</strong><br>${escapeHTML(career.next)}</p>` : ""}
      <p><strong>Reality check:</strong><br>${escapeHTML(career.challenges)}</p>
      <button type="button" class="button button-outline save-button"
        data-save="${escapeHTML(career.name)}">
        ${saved ? "✓ Saved" : "+ Save career"}
      </button>
    </article>
  `;
}

function renderCareers(list = careers) {
  careerList.innerHTML = list.length
    ? list.map(career => makeCareerCard(career)).join("")
    : '<p class="notice">No careers found. Try another search.</p>';
}

function renderRecommendations(list) {
  recommendations.innerHTML = list.length
    ? `<div class="section-heading"><h2>Your career matches</h2>
       <p>These are ideas to explore, not predictions of your future.</p></div>
       <div class="cards">${list.map(career => makeCareerCard(career, true)).join("")}</div>`
    : "";
}

function handleSaveClick(event) {
  const button = event.target.closest("[data-save]");
  if (!button) return;

  const name = button.dataset.save;
  if (savedCareers.has(name)) {
    savedCareers.delete(name);
  } else {
    savedCareers.add(name);
  }

  document.getElementById("savedCount").textContent = savedCareers.size;
  renderCareers(filterCareers());
  if (recommendations.innerHTML) {
    const current = recommendations.querySelectorAll("[data-save]");
    if (current.length) {
      const selected = careers.filter(c => savedCareers.has(c.name));
      // Re-render only the recommendation cards currently displayed.
      const names = [...current].map(b => b.dataset.save);
      const recs = names.map(n => careers.find(c => c.name === n)).filter(Boolean);
      renderRecommendations(recs.map(c => ({
        ...c,
        reasons: c.reasons || ["Your assessment included related interests or strengths."]
      })));
    }
  }
}

function filterCareers() {
  const query = careerSearch.value.trim().toLowerCase();
  return careers.filter(career =>
    `${career.name} ${career.category} ${career.description} ${career.subjects}`
      .toLowerCase().includes(query)
  );
}

assessmentForm.addEventListener("submit", event => {
  event.preventDefault();

  const interests = [...document.querySelectorAll('input[name="interest"]:checked')].map(el => el.value);
  const strengths = [...document.querySelectorAll('input[name="strength"]:checked')].map(el => el.value);

  if (!interests.length || !strengths.length) {
    assessmentMessage.textContent = "Please select at least one interest and one strength.";
    return;
  }

  const ranked = careers.map(career => {
    const matchedInterests = career.interests.filter(value => interests.includes(value));
    const matchedStrengths = career.strengths.filter(value => strengths.includes(value));
    const score = matchedInterests.length * 2 + matchedStrengths.length;
    const reasons = [];

    if (matchedInterests.length) {
      reasons.push("Your selected interests connect with " + matchedInterests.join(", ") + ".");
    }
    if (matchedStrengths.length) {
      reasons.push("Your selected strengths include " + matchedStrengths.join(", ") + ".");
    }
    if (!reasons.length) {
      reasons.push("This is an additional career you may wish to explore.");
    }

    return { ...career, score, reasons };
  }).sort((a, b) => b.score - a.score).slice(0, 3);

  renderRecommendations(ranked);
  document.getElementById("assessmentStatus").textContent = "Completed";
  assessmentMessage.textContent = "Your suggestions are ready. Explore more than one option before deciding.";
  recommendations.scrollIntoView({ behavior: "smooth", block: "start" });
});

careerSearch.addEventListener("input", () => renderCareers(filterCareers()));

document.addEventListener("click", event => {
  if (event.target.closest("[data-save]")) handleSaveClick(event);
});

document.getElementById("roadmapButton").addEventListener("click", () => {
  const career = document.getElementById("roadmapCareer").value;
  const info = careers.find(item => item.name === career) || careers[0];

  const steps = [
    ["Discover", `Learn about ${career} and its everyday responsibilities.`],
    ["Check the route", `Research the school subjects and qualifications relevant to ${career}.`],
    ["Build skills", info.next],
    ["Verify requirements", "Check official institution and course websites for current eligibility and entrance examinations."],
    ["Discuss and review", "Talk through your plan with a trusted parent, teacher or career counsellor."]
  ];

  document.getElementById("roadmapResult").innerHTML =
    `<h3>Your starter roadmap: ${escapeHTML(career)}</h3>` +
    steps.map((step, index) => `
      <div class="roadmap-step">
        <div class="roadmap-number">${String(index + 1).padStart(2, "0")}</div>
        <div><h4>${escapeHTML(step[0])}</h4><p>${escapeHTML(step[1])}</p></div>
      </div>
    `).join("") +
    '<p class="notice">This is a general demo roadmap, not a verified admissions plan.</p>';
});

const chatMessages = document.getElementById("chatMessages");

function addChatMessage(text, sender) {
  const message = document.createElement("div");
  message.className = sender === "user" ? "user-message" : "bot-message";
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function demoReply(question) {
  const q = question.toLowerCase();

  if (q.includes("biology") && (q.includes("doctor") || q.includes("medicine"))) {
    return "You can explore several biology-related areas besides becoming a doctor, such as biotechnology, environmental science, laboratory science, food science and some allied healthcare professions. Each has different study and entry requirements, so check official course information.";
  }

  if (q.includes("b.tech") || q.includes("bca")) {
    return "B.Tech is generally an engineering or technology degree, while BCA focuses on computer applications. Duration, eligibility, entrance exams and costs vary by institution. Compare the actual course syllabus and official admission requirements before choosing.";
  }

  if (q.includes("stream") || q.includes("science") || q.includes("commerce") || q.includes("humanities")) {
    return "Science often includes scientific subjects, Commerce focuses on areas such as business and economics, and Humanities explores people, society and ideas. Subject availability varies. Consider your interests, school options and future course requirements, and discuss them with a trusted teacher.";
  }

  if (q.includes("salary") || q.includes("income") || q.includes("earn")) {
    return "Pay varies by location, role, experience, employer and skills. I don't have verified live salary data in this demo, so I won't invent a number. Check recent, reliable salary sources and compare more than one role.";
  }

  if (q.includes("scholarship") || q.includes("fees") || q.includes("cost")) {
    return "Costs and scholarship deadlines change. Check the institution's official fee page and the official scholarship provider. Include tuition, accommodation, travel, materials and exam fees when comparing total expenses.";
  }

  if (q.includes("after grade 10") || q.includes("after 10") || q.includes("after class 10")) {
    return "Start by comparing the available school streams and vocational options, then check which subjects are required for careers you might like. You do not need to make the decision from one quiz alone.";
  }

  return "Let's explore that together. Think about which subjects you enjoy, what activities make you curious and what kind of problems you like solving. I can give general guidance in this demo, but exact admissions, fees, deadlines and salary information must be verified from official or reliable sources. Try asking me about streams, courses, or careers you enjoy.";
}

document.getElementById("chatForm").addEventListener("submit", event => {
  event.preventDefault();

  const input = document.getElementById("chatInput");
  const question = input.value.trim();
  if (!question) return;

  addChatMessage(question, "user");
  input.value = "";

  window.setTimeout(() => {
    addChatMessage(demoReply(question), "bot");
  }, 350);
});

document.querySelectorAll(".suggestion").forEach(button => {
  button.addEventListener("click", () => {
    document.getElementById("chatInput").value = button.textContent;
    document.getElementById("chatInput").focus();
  });
});

const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
});

navigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => navigation.classList.remove("open"));
});

renderCareers();