/* =====================================================================
   SAMPLE CONTENT — for previewing the design only. NONE OF THIS IS REAL.
   It fills the empty sections (news, research, publications, awards,
   teaching, service) so you can see how a finished page looks.

   TO REMOVE IT BEFORE PUBLISHING:
     1. delete the line  <script src="js/sample.js"></script>  in index.html
     2. delete this file
   Then put her real items into js/content.js.
   ===================================================================== */
(function () {
  if (typeof SITE === "undefined") return;
  const S = SITE; // `const SITE` in content.js is not on window, but is visible to other scripts

  S.profile.lab = S.profile.lab || "CERIS Research Centre";            // SAMPLE
  S.profile.advisor = S.profile.advisor || "Prof. Name Surname";       // SAMPLE
  S.profile.openTo = S.profile.openTo || "Open to research collaborations"; // SAMPLE
  S.profile.links.orcid = S.profile.links.orcid || "https://orcid.org/";           // SAMPLE (generic link)
  S.profile.links.scholar = S.profile.links.scholar || "https://scholar.google.com/"; // SAMPLE (generic link)

  S.news = [
    { date: "2027-05", text: "Abstract <strong>accepted</strong> for oral presentation at a transportation research conference (sample)." },
    { date: "2027-03", text: "Completed the first-year <strong>Advanced Studies Diploma</strong> courses in Transportation Systems (sample)." },
    { date: "2026-11", text: "Started the <strong>Ph.D. in Transportation Systems</strong> at Instituto Superior Técnico, Lisbon." },
    { date: "2025-12", text: "Completed the <strong>M.S. in Civil Engineering</strong> at NUST and a research assistantship in traffic engineering." }
  ];

  S.research = [
    { icon: "fa-solid fa-triangle-exclamation", title: "Road safety analysis", text: "Sample text: identifying where and why crashes happen, and which design or policy changes reduce them.", tags: ["Crash data", "Safety"] },
    { icon: "fa-solid fa-traffic-light", title: "Traffic systems", text: "Sample text: how signals, junction layout and demand shape delay, flow and reliability on urban roads.", tags: ["Traffic flow", "Signals"] },
    { icon: "fa-solid fa-brain", title: "Machine learning for transport", text: "Sample text: using data-driven models to predict traffic conditions and support planning decisions.", tags: ["Prediction", "Data"] },
    { icon: "fa-solid fa-leaf", title: "Sustainable mobility", text: "Sample text: planning networks that move people safely while cutting emissions and cost.", tags: ["Planning", "Sustainability"] }
  ];

  S.publications = [
    {
      type: "journal", featured: true, status: "Under review", year: 2027,
      title: "Sample title: A data-driven approach to identifying high-risk road segments",
      authors: "L. Yaqoob, A. Coauthor, B. Coauthor",
      venue: "Sample Journal of Transportation Safety",
      summary: "Sample summary: one sentence on the question, the method and the main finding.",
      links: { doi: "", pdf: "", code: "" }
    },
    {
      type: "conference", featured: false, status: "Accepted", year: 2027,
      title: "Sample title: Predicting urban traffic conditions with machine learning",
      authors: "L. Yaqoob, A. Coauthor",
      venue: "Sample International Conference on Transportation Engineering",
      links: { doi: "", pdf: "", code: "" }
    },
    {
      type: "thesis", featured: false, status: "", year: 2025,
      title: "Sample title: M.S. thesis on traffic engineering",
      authors: "L. Yaqoob",
      venue: "National University of Sciences and Technology (NUST), Pakistan",
      links: { doi: "", pdf: "", code: "" }
    }
  ];

  S.awards = [
    { year: "2026", title: "Doctoral scholarship (sample)", org: "Funding body (sample)" },
    { year: "2023", title: "Academic distinction (sample)", org: "COMSATS University" }
  ];

  S.teaching = [
    "Teaching Assistant, Transportation Engineering (Spring 2027)"
  ];

  S.service = [
    "Reviewer, Sample Journal of Transportation Safety (2027)",
    "Volunteer, Transportation research seminar series (2027)"
  ];

  /* Small notice so sample content can never be mistaken for the real thing */
  const note = document.createElement("div");
  note.textContent = "Preview with sample content. Not her real work yet.";
  note.setAttribute("role", "note");
  note.style.cssText = "position:fixed;left:max(12px,env(safe-area-inset-left,0px));bottom:max(12px,env(safe-area-inset-bottom,0px));z-index:60;padding:7px 12px;border-radius:999px;background:#7a1f1f;color:#fff;font:600 12px/1.3 Overpass,system-ui,sans-serif;box-shadow:0 2px 8px rgba(0,0,0,.3);max-width:calc(100vw - 80px)";
  document.addEventListener("DOMContentLoaded", () => document.body.appendChild(note));
})();
