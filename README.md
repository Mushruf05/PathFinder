# 🧭 Pathfinder

**Explore your interests. Discover career possibilities. Plan your next steps.**

Pathfinder is a student-focused career exploration website for students in Grades 9–12. This hackathon project helps students explore career ideas, school streams, and possible next steps.

> **Project status:** Frontend demonstration. Career matches use simple rules, and the chatbot uses prepared responses; the site is not connected to an AI service or backend.

## 📖 About the Project

Choosing subjects and careers can feel difficult, especially when students are still learning about their interests and strengths. Pathfinder brings a few early exploration tools together in one approachable website. Its suggestions are starting points for research—not predictions or professional counselling.

## 🎯 Problem Statement

Students may not know which careers connect with the subjects they enjoy, the skills they are building, or the study options available to them. Career information can also feel scattered, and course requirements vary between institutions. Students need a simple way to begin exploring without treating one quiz or recommendation as a final answer.

## 💡 Our Solution

Pathfinder provides a guided, browser-based exploration experience. Students can select interests and strengths to see related career ideas, browse and search career information, compare broad school-stream descriptions, and create a general starter roadmap. A demonstration chatbot responds to a small set of common questions with general guidance and reminders to verify details through trusted sources.

## ✨ Key Features

- **Interest and strength assessment:** Select topics and strengths to see up to three career matches. Matching is rule-based and intended for exploration.
- **Career directory:** Search a collection of career examples and view descriptions, relevant subjects to explore, suggested next steps, and considerations.
- **Saved careers:** Save or unsave career cards during the current page session.
- **School-stream overview:** Read introductory descriptions of Science, Commerce, and Humanities.
- **Starter roadmap:** Generate general exploration steps for a selected career.
- **Chatbot demonstration:** Try predefined responses to common career and study questions. It is not a real AI assistant.
- **Official information links:** Find starting points for checking higher education, scholarships, and institution rankings.
- **Responsive navigation and layout:** Use the site on different screen sizes.

## 🧩 How the Website Works

1. Open the website in a modern browser.
2. Select at least one interest and one strength in the assessment.
3. Review the career matches and browse or search the career directory.
4. Explore school streams or choose a career to view a general starter roadmap.
5. Use the chatbot demonstration for general prompts, and verify current requirements with official sources.

Assessment results are calculated in the browser from the selected interests and strengths. There is no account, server-side profile, or live AI integration in this version. Saved careers last only until the page is refreshed or closed.

## 🛠️ Technology Stack

- **HTML5** — page structure and content
- **CSS3** — styling, layout, and responsive presentation
- **Vanilla JavaScript** — assessment matching, search, saved-career state, roadmap, and chatbot demonstration
- **Google Fonts (Inter)** — externally loaded typeface used by the stylesheet

No package manager, framework, backend, or project-specific dependency installation is configured in the current repository.

## 🗂️ Project Folder Structure

```text
pathfinder/
├── .vscode/
│   └── launch.json   # VS Code Chrome launch configuration
├── index.html        # Main page and website sections
├── script.js         # Career data and browser interactions
├── style.css         # Visual styles and responsive layout
└── README.md         # Project documentation
```

## 📦 Installation and Setup Instructions

The project is static and has no build or dependency-install step. Clone the repository and enter its folder:

```powershell
git clone https://github.com/Mushruf05/p.git
cd p
```

If you already have the project files, skip cloning. An internet connection is only needed to load the Inter font from Google Fonts; the page's main functionality runs in the browser.

## ▶️ How to Run the Project Locally

**Option 1: Open the page directly**

Open `index.html` in a modern web browser. On Windows PowerShell, you can run:

```powershell
Start-Process .\index.html
```

**Option 2: Serve the files locally**

If Python is installed, run this from the project folder:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000` in your browser. Stop the server with `Ctrl+C`.

## 🚀 Future Improvements

- Connect the chatbot to a real AI service with appropriate privacy safeguards.
- Expand career information and make it easier to verify details against official sources.
- Add more inclusive study and career pathways, with region-specific requirements.
- Persist saved careers and assessment results, with clear user consent and privacy controls.
- Add automated tests and accessibility checks.

These are ideas for future work; they are not features of the current demonstration.

## 👥 Team Members

Team member names are not listed in the current project files. Add the contributors' names and roles here before submitting the project.

## 🤝 Contribution Guidelines

Contributions and suggestions are welcome:

1. Fork the repository and create a branch for your change.
2. Keep changes focused and consistent with the existing HTML, CSS, and JavaScript.
3. Test the affected interactions in a browser, including a narrow/mobile viewport when relevant.
4. Submit a pull request describing what changed and how you checked it.

Please keep career guidance factual and clearly distinguish general suggestions from verified admissions or professional advice.

## 📄 License

No license file is currently included in the repository. Please contact the project maintainers for permission before reusing or distributing this work; add a license if the team intends to make it openly reusable.