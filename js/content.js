/* =====================================================================
   ✏️  EDIT THIS FILE — it holds ALL the text on the website.
   ---------------------------------------------------------------------
   • Keep the quotes "..." and commas , exactly as they are.
   • To remove a link, set it to ""  (it will disappear automatically).
   • To add an item to a list, copy one { ... }, block and edit it.
   • A list left empty  [ ]  hides that whole section from the website.
   • Text in "about" and "news" can contain simple HTML like <strong>.
   ===================================================================== */

const SITE = {
  /* ---------- 1. PROFILE (top of the page) ---------- */
  profile: {
    name: "Laiba Yaqoob",
    shortName: "L. Yaqoob",               // how her name appears in author lists (gets bolded)
    title: "PhD Student · Transportation Systems",
    affiliation: "Instituto Superior Técnico, University of Lisbon",
    lab: "",                               // e.g. "CERIS" or the research group name
    advisor: "",                           // e.g. "Prof. Name Surname"
    location: "Lisbon, Portugal",
    tagline: "Making mobility safer and more sustainable through traffic engineering, data, and well-planned infrastructure.",
    photo: "assets/photo-round.jpg",       // round portrait, background toned green (original: assets/photo.jpg)
    cv: "assets/cv.pdf",                   // put her CV in /assets with this name
    email: "laibayaqoob@tecnico.ulisboa.pt",
    openTo: "",                            // e.g. "Open to research collaborations"

    /* Optional: a line of degrees under her name. Left empty to keep the top of the page clean
       (the same information is in "Education" further down). To use it, fill it like this:
       route: [ { degree: "B.S. Civil Engineering", where: "COMSATS", year: "2019 – 2023" }, ... ] */
    route: [],
    links: {
      scholar: "",
      orcid: "",
      researchgate: "",
      linkedin: "https://www.linkedin.com/in/laiba-yaqoob-48440828b/",
      github: "",
      x: ""
    }
  },

  /* ---------- 2. ABOUT ---------- */
  about: [
    "I am a PhD student in the doctoral program in <strong>Transportation Systems</strong> at <strong>Instituto Superior Técnico</strong>, the engineering school of the University of Lisbon, working in transportation and traffic engineering. My interests center on road safety, traffic systems, and sustainable infrastructure, and on how data-driven methods such as machine learning can help plan transportation networks that are safer and more efficient.",
    "I earned my M.S. in Civil Engineering (Transportation) at the <strong>National University of Sciences and Technology (NUST)</strong>, Pakistan, where I also worked as a Research Assistant. I hold a B.S. in Civil Engineering from <strong>COMSATS University, Abbottabad</strong>. In industry, I have worked as a Design Engineer at CIK Telecom Inc. and as an intern with Pakistan's National Highway Authority (NHA)."
  ],
  interests: [
    "Traffic engineering & road safety",
    "Transportation engineering & planning",
    "Machine learning for transportation",
    "Sustainable mobility & development",
    "Infrastructure development",
    "Highway design"
  ],

  /* ---------- 3. NEWS (newest first) ---------- */
  /* Empty = section hidden. Use it for real news only, e.g. a paper accepted, a talk, an award:
     { date: "2027-03", text: "Paper <strong>accepted</strong> at the TRB Annual Meeting." }
     (Her degrees and jobs are already shown under Education & Experience.) */
  news: [
  ],

  /* ---------- 4. RESEARCH AREAS (3–4 work best) ---------- */
  /* Empty = section hidden. The "Research interests" list in About already covers her topics.
     Fill this in once she has specific projects to describe (her PhD topic, her thesis), like:
     { icon: "fa-solid fa-traffic-light", title: "Project or topic", text: "Two sentences, in her own words.", tags: ["Tag"] } */
  research: [
  ],

  /* ---------- 5. PUBLICATIONS ----------
     Empty for now, so the section is hidden. To add a paper, copy this example
     between the [ ] brackets below and remove the // at the start of each line:

     // {
     //   type: "journal",          // "journal" | "conference" | "thesis" | "preprint"
     //   featured: true,           // true = shown as a highlighted card
     //   status: "",               // "" (published) | "Under review" | "Accepted"
     //   year: 2026,
     //   title: "Paper title",
     //   authors: "L. Yaqoob, A. Coauthor",
     //   venue: "Journal or conference name",
     //   summary: "One-sentence summary (optional).",
     //   links: { doi: "", pdf: "", code: "" }
     // },
  */
  publications: [
  ],

  /* ---------- 6. EDUCATION (newest first) ---------- */
  education: [
    {
      degree: "Ph.D., Transportation Systems",
      focus: "",
      school: "Instituto Superior Técnico (IST), University of Lisbon, Portugal",
      years: "2026 – present",
      note: "First year: Advanced Studies Diploma in Transportation Systems (2026/2027)."
    },
    {
      degree: "M.S., Civil Engineering",
      focus: "Transportation Engineering",
      school: "National University of Sciences and Technology (NUST), Pakistan",
      years: "2023 – 2025",
      note: ""                              // e.g. "Thesis: ..."
    },
    {
      degree: "B.S., Civil Engineering",
      focus: "",
      school: "COMSATS University Islamabad, Abbottabad Campus",
      years: "2019 – 2023",
      note: "Projects: highway design with horizontal and vertical curves; construction planning of a G+2 building in MS Project."
    }
  ],

  /* ---------- 7. EXPERIENCE (newest first) ---------- */
  experience: [
    {
      role: "Design Engineer",
      org: "CIK Telecom Inc.",
      years: "Apr 2026 – present",
      points: [
        "Applies transportation and traffic engineering to infrastructure-development projects.",
        "Focuses on effective, sustainable solutions for traffic systems and road safety."
      ]
    },
    {
      role: "Research Assistant",
      org: "National University of Sciences and Technology (NUST)",
      years: "Jun 2024 – Dec 2025",
      points: ["Full-time research in transportation and traffic engineering."]
    },
    {
      role: "Intern",
      org: "National Highway Authority (NHA), Pakistan",
      years: "Sep 2022 – Oct 2022",
      points: ["Internship with the NHA's HRTC Cell."]
    },
    {
      role: "Chairperson (volunteer)",
      org: "IEEE",
      years: "Jul 2022 – Jul 2023",
      points: []
    }
  ],

  /* ---------- 8. SKILLS ---------- */
  skills: [
    { group: "Core expertise", items: ["Transportation Engineering", "Traffic Engineering", "Road Safety"] },
    { group: "Methods", items: ["Machine Learning", "Data Analysis"] },
    { group: "Planning & design", items: ["Infrastructure Development", "Sustainable Development", "Highway Design", "MS Project"] },
    { group: "Languages", items: ["English (professional)", "Urdu (native)"] }
  ],

  /* ---------- 9. AWARDS (newest first) — empty hides the box ---------- */
  awards: [
    // { year: "2025", title: "Award name", org: "Who gave it" },
  ],

  /* ---------- 10. TEACHING & SERVICE ---------- */
  teaching: [
  ],
  service: [
  ]
};
