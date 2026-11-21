/* Renders the site from SITE (js/content.js). You normally don't need to edit this file. */
(function () {
  "use strict";
  const S = SITE; // defined in content.js
  const P = S.profile;
  const $ = (sel) => document.querySelector(sel);

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fmtDate = (d) => {
    const m = /^(\d{4})-(\d{1,2})/.exec(d || "");
    return m ? `${MONTHS[+m[2] - 1]} ${m[1]}` : esc(d);
  };
  const initials = (name) => name.split(/\s+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  const SOCIAL = {
    scholar: { icon: "ai ai-google-scholar", label: "Google Scholar" },
    orcid: { icon: "ai ai-orcid", label: "ORCID" },
    researchgate: { icon: "ai ai-researchgate", label: "ResearchGate" },
    linkedin: { icon: "fa-brands fa-linkedin", label: "LinkedIn" },
    github: { icon: "fa-brands fa-github", label: "GitHub" },
    x: { icon: "fa-brands fa-x-twitter", label: "X" }
  };
  const socialsHTML = () =>
    Object.entries(P.links || {})
      .filter(([k, url]) => url && SOCIAL[k])
      .map(([k, url]) => `<li><a href="${esc(url)}" target="_blank" rel="noopener"><i class="${SOCIAL[k].icon}" aria-hidden="true"></i>${SOCIAL[k].label}</a></li>`)
      .join("");

  /* ---------- Page meta ---------- */
  document.title = `${P.name} | ${P.title}`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = `${P.name}: ${P.title}, ${P.affiliation}. ${P.tagline}`;
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = P.name;

  /* ---------- Hero ---------- */
  $("#brand").textContent = P.name;
  // Overpass sets "·" tight, so give the separator its own even spacing
  $("#heroTitle").innerHTML = `<span>${String(P.title || "").split(/\s*·\s*/).map((s) => `<span class="seg">${esc(s)}</span>`).join('<span class="sep">·</span><wbr>')}</span>`;

  // Degrees joined like stations on a line (oldest → newest)
  $("#signRoute").innerHTML = (P.route || []).map((r) => `
    <li class="${r.now ? "is-now" : ""}">
      <span class="creds__year">${esc(r.year)}</span>
      <span class="creds__deg">${esc(r.degree)}</span>
      <span class="creds__where">${esc(r.where)}</span>
    </li>`).join("");
  if (!(P.route || []).length) $("#signRoute").remove();
  $("#heroName").textContent = P.name;
  $("#heroTagline").textContent = P.tagline;
  // One quiet line of plain text (no icons): affiliation · lab · advisor · city
  $("#heroMeta").textContent = [
    P.affiliation, P.lab, P.advisor && `Advisor: ${P.advisor}`, P.location
  ].filter(Boolean).join(" · ");
  if (P.openTo) {
    const o = $("#heroOpen");
    o.hidden = false;
    o.innerHTML = `<i class="fa-solid fa-circle-check" aria-hidden="true"></i>${esc(P.openTo)}`;
  }

  // Buttons: the first one is the solid (primary) button, the rest are outlined.
  const ctaButtons = (onGreen) => {
    const items = [
      P.cv && { cls: "js-cv", href: P.cv, ext: true, icon: "fa-solid fa-file-arrow-down", text: "Download CV" },
      P.email && { href: `mailto:${P.email}`, icon: "fa-solid fa-envelope", text: onGreen ? P.email : "Email me" },
      !P.email && P.links && P.links.linkedin && { href: P.links.linkedin, ext: true, icon: "fa-brands fa-linkedin", text: "Connect on LinkedIn" },
      !onGreen && (S.publications || []).length > 0 && { href: "#publications", icon: "fa-solid fa-book-open", text: "Publications" }
    ].filter(Boolean);
    return items.map((b) =>
      `<a class="btn ${b.cls || ""}" href="${esc(b.href)}"${b.ext ? ' target="_blank" rel="noopener"' : ""}><i class="${b.icon}" aria-hidden="true"></i>${esc(b.text)}</a>`
    ).join("");
  };
  // Style by position, so whichever button ends up first is the solid one
  const styleButtons = () => {
    [["#heroCta", "btn--primary", "btn--ghost"], ["#contactActions", "btn--onsign", "btn--onsign-ghost"]].forEach(([sel, first, rest]) => {
      document.querySelectorAll(`${sel} .btn`).forEach((a, i) => {
        a.style.transition = "none"; // swap styles instantly, no fade from outline to solid
        a.classList.remove("btn--primary", "btn--ghost", "btn--onsign", "btn--onsign-ghost");
        a.classList.add(i === 0 ? first : rest);
        void a.offsetWidth;
        a.style.transition = "";
      });
    });
  };
  $("#heroCta").innerHTML = ctaButtons(false);
  $("#contactActions").innerHTML = ctaButtons(true);
  styleButtons();
  $("#heroSocials").innerHTML = socialsHTML();
  $("#contactSocials").innerHTML = socialsHTML();
  // Don't repeat LinkedIn under the hero when it's already the main button
  ["#heroSocials", "#contactSocials"].forEach((sel) => {
    if (!P.email && P.links && P.links.linkedin) {
      const li = document.querySelector(`${sel} a[href*="linkedin"]`);
      if (li) li.closest("li").remove();
    }
    if (!$(sel).children.length) $(sel).remove();
  });

  // Portrait: shown only once a real photo loads. No placeholder block —
  // without a photo the hero is text-only, which reads as a real page, not a template.
  const photoBox = $("#heroPhoto");
  const portrait = document.querySelector(".hero__portrait");
  if (portrait) portrait.hidden = true;
  if (P.photo && photoBox && portrait) {
    const img = new Image();
    img.alt = `Portrait of ${P.name}`;
    img.decoding = "async";
    img.onload = () => {
      photoBox.innerHTML = "";
      photoBox.appendChild(img);
      portrait.hidden = false;
      // A small image (e.g. 200px) is shown as a round profile picture; a large one as a full portrait.
      document.querySelector(".hero").classList.add(img.naturalWidth < 400 ? "has-avatar" : "has-photo");
    };
    img.src = P.photo;
  }

  // Hide CV buttons if the PDF isn't uploaded yet (only checkable when served over http/https)
  if (P.cv && location.protocol.startsWith("http")) {
    fetch(P.cv, { method: "HEAD" }).then((r) => { if (!r.ok) { document.querySelectorAll(".js-cv").forEach((a) => a.remove()); styleButtons(); } }).catch(() => {});
  }

  /* ---------- About ---------- */
  $("#aboutBio").innerHTML = (S.about || []).map((p) => `<p>${p}</p>`).join("");
  $("#interests").innerHTML = (S.interests || []).map((i) => `<li>${esc(i)}</li>`).join("");

  /* ---------- News ---------- */
  const NEWS_VISIBLE = 4;
  const news = S.news || [];
  $("#newsList").innerHTML = news.map((n, i) =>
    `<li class="${i >= NEWS_VISIBLE ? "is-hidden" : ""}"><time datetime="${esc(n.date)}">${fmtDate(n.date)}</time><div class="news__text">${n.text}</div></li>`
  ).join("") || `<li class="empty">No news yet.</li>`;
  if (news.length > NEWS_VISIBLE) {
    const more = $("#newsMore");
    more.hidden = false;
    more.addEventListener("click", () => {
      const hidden = document.querySelectorAll("#newsList li.is-hidden");
      const expanding = hidden.length > 0;
      document.querySelectorAll("#newsList li").forEach((li, i) => li.classList.toggle("is-hidden", !expanding && i >= NEWS_VISIBLE));
      more.textContent = expanding ? "Show fewer" : "Show earlier updates";
    });
  }

  /* ---------- Research ---------- */
  $("#researchGrid").innerHTML = (S.research || []).map((r) => `
    <article class="research-item">
      <div class="research-item__icon"><i class="${esc(r.icon)}" aria-hidden="true"></i></div>
      <h3>${esc(r.title)}</h3>
      <p>${esc(r.text)}</p>
      <div class="tags">${(r.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
    </article>`).join("");

  /* ---------- Publications ---------- */
  const pubs = (S.publications || []).slice().sort((a, b) => (b.year || 0) - (a.year || 0));
  const TYPE_LABEL = { journal: "Journal", conference: "Conference", thesis: "Thesis", preprint: "Preprint" };
  const boldSelf = (authors) => {
    let out = esc(authors);
    [P.shortName, P.name].filter(Boolean).forEach((n) => {
      const e = esc(n).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      out = out.replace(new RegExp(e, "g"), `<strong>${esc(n)}</strong>`);
    });
    return out;
  };
  const citation = (p) => `${p.authors} (${p.year}). ${p.title}. ${p.venue}.${p.links && p.links.doi ? " " + p.links.doi : ""}`;
  const linkBtns = (p, i) => {
    const L = p.links || {};
    return [
      L.doi && `<a class="pub-link" href="${esc(L.doi)}" target="_blank" rel="noopener"><i class="fa-solid fa-link" aria-hidden="true"></i>DOI</a>`,
      L.pdf && `<a class="pub-link" href="${esc(L.pdf)}" target="_blank" rel="noopener"><i class="fa-solid fa-file-pdf" aria-hidden="true"></i>PDF</a>`,
      L.code && `<a class="pub-link" href="${esc(L.code)}" target="_blank" rel="noopener"><i class="fa-solid fa-code" aria-hidden="true"></i>Code</a>`,
      `<button class="pub-link js-cite" type="button" data-i="${i}"><i class="fa-solid fa-quote-right" aria-hidden="true"></i>Cite</button>`
    ].filter(Boolean).join("");
  };

  const featured = pubs.filter((p) => p.featured);
  if (featured.length) {
    $("#featuredPubs").innerHTML = featured.map((p) => `
      <article class="feat">
        <span class="feat__label">Featured · ${esc(TYPE_LABEL[p.type] || p.type)}${p.status ? " · " + esc(p.status) : ""}</span>
        <h3>${esc(p.title)}</h3>
        <p class="pub__authors">${boldSelf(p.authors)}</p>
        <p class="pub__venue">${esc(p.venue)}, ${esc(p.year)}</p>
        ${p.summary ? `<p>${esc(p.summary)}</p>` : ""}
        <div class="pub__foot">${linkBtns(p, pubs.indexOf(p))}</div>
      </article>`).join("");
  } else $("#featuredPubs").remove();

  $("#pubList").innerHTML = pubs.map((p, i) => `
    <li class="pub" data-type="${esc(p.type)}">
      <div class="pub__year">${esc(p.year)}</div>
      <div>
        <div class="pub__title">${esc(p.title)}</div>
        <p class="pub__authors">${boldSelf(p.authors)}</p>
        <p class="pub__venue">${esc(p.venue)}</p>
        <div class="pub__foot">
          <span class="badge">${esc(TYPE_LABEL[p.type] || p.type)}</span>
          ${p.status ? `<span class="badge badge--status">${esc(p.status)}</span>` : ""}
          ${linkBtns(p, i)}
        </div>
      </div>
    </li>`).join("") || `<li class="empty">Publications coming soon.</li>`;

  const types = ["all", ...new Set(pubs.map((p) => p.type))];
  const filters = $("#pubFilters");
  filters.innerHTML = types.map((t) => {
    const count = t === "all" ? pubs.length : pubs.filter((p) => p.type === t).length;
    return `<button class="filter" role="tab" aria-selected="${t === "all"}" data-type="${esc(t)}">${t === "all" ? "All" : esc(TYPE_LABEL[t] || t)} (${count})</button>`;
  }).join("");
  filters.addEventListener("click", (e) => {
    const b = e.target.closest(".filter");
    if (!b) return;
    filters.querySelectorAll(".filter").forEach((x) => x.setAttribute("aria-selected", x === b));
    document.querySelectorAll("#pubList .pub").forEach((li) => li.classList.toggle("is-hidden", b.dataset.type !== "all" && li.dataset.type !== b.dataset.type));
  });

  const toast = $("#toast");
  let toastT;
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add("is-on");
    clearTimeout(toastT);
    toastT = setTimeout(() => toast.classList.remove("is-on"), 2200);
  };
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".js-cite");
    if (!b) return;
    const text = citation(pubs[+b.dataset.i]);
    const fallback = () => {
      const ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); showToast("Citation copied"); } catch (_) { showToast("Couldn't copy"); }
      ta.remove();
    };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(() => showToast("Citation copied"), fallback);
    else fallback();
  });

  /* ---------- Education & experience ---------- */
  $("#eduLine").innerHTML = (S.education || []).map((e) => `
    <li class="stop reveal">
      <div class="stop__years">${esc(e.years)}</div>
      <h4>${esc(e.degree)}</h4>
      <p class="stop__org">${esc(e.school)}</p>
      ${e.focus ? `<p class="stop__focus">${esc(e.focus)}</p>` : ""}
      ${e.note ? `<p class="stop__note">${esc(e.note)}</p>` : ""}
    </li>`).join("");
  $("#expLine").innerHTML = (S.experience || []).map((x) => `
    <li class="stop reveal">
      <div class="stop__years">${esc(x.years)}</div>
      <h4>${esc(x.role)}</h4>
      <p class="stop__org">${esc(x.org)}</p>
      ${(x.points || []).length ? `<ul>${x.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>` : ""}
    </li>`).join("");
  $("#skillsGrid").innerHTML = (S.skills || []).map((s) => `
    <div class="skills__row">
      <dt>${esc(s.group)}</dt>
      <dd>${s.items.map((i) => `<span>${esc(i)}</span>`).join("")}</dd>
    </div>`).join("");

  /* ---------- Awards, teaching, service ---------- */
  $("#awardsList").innerHTML = (S.awards || []).map((a) =>
    `<li><span class="yr">${esc(a.year)}</span><div><strong>${esc(a.title)}</strong><span class="org">${esc(a.org)}</span></div></li>`).join("");
  // "Chairperson, IEEE (Jul 2022 – Jul 2023)" → role, organisation and dates.
  // Lines that don't follow that shape are shown as written.
  const entry = (t) => {
    const m = /^(.*?)\s*\(([^()]*\d[^()]*)\)\s*$/.exec(t);
    const main = m ? m[1] : t;
    const when = m ? m[2] : "";
    const cut = main.indexOf(",");
    const role = cut > 0 ? main.slice(0, cut) : main;
    const org = cut > 0 ? main.slice(cut + 1).trim() : "";
    return `<li class="entry">${when ? `<span class="entry__when">${esc(when)}</span>` : ""}<span class="entry__role">${esc(role)}</span>${org ? `<span class="entry__org">${esc(org)}</span>` : ""}</li>`;
  };
  $("#teachingList").innerHTML = (S.teaching || []).map(entry).join("");
  $("#serviceList").innerHTML = (S.service || []).map(entry).join("");

  /* ---------- Hide anything that has no content yet ---------- */
  const has = (arr) => Array.isArray(arr) && arr.length > 0;
  const dropSection = (id) => {
    const sec = document.getElementById(id);
    if (sec) sec.remove();
    const a = document.querySelector(`#navLinks a[href="#${id}"]`);
    if (a) a.remove();
  };
  if (!has(S.news)) dropSection("news");
  if (!has(S.research)) dropSection("research");
  if (!has(S.publications)) dropSection("publications");

  const honors = [
    [S.awards, "#awardsList", "Awards"],
    [S.teaching, "#teachingList", "Teaching"],
    [S.service, "#serviceList", "Service"]
  ];
  const presentCols = [];
  const present = honors.filter(([arr, sel]) => {
    const col = $(sel).closest(".honors__col");
    if (has(arr)) { presentCols.push(col); return true; }
    if (col) col.remove();
    return false;
  }).map(([, , label]) => label);
  if (!present.length) dropSection("awards");
  else {
    const h = document.querySelector("#awards .section__title");
    if (present.length === 1) {
      // One list only: its own label ("Service & leadership") becomes the section title
      document.querySelector("#awards .honors").classList.add("honors--single");
      document.getElementById("awards").classList.add("section--compact");
      h.lastChild.textContent = presentCols[0].querySelector(".label").textContent;
    } else {
      h.lastChild.textContent = present.slice(0, -1).join(", ") + " & " + present[present.length - 1];
    }
    document.querySelector('#navLinks a[href="#awards"]').textContent = present[0];
  }

  // Alternate plain / tinted backgrounds over the sections that are left,
  // so two plain sections never run together when one is hidden.
  document.querySelectorAll("main > section.section").forEach((s, i) => s.classList.toggle("section--tint", i % 2 === 1));
  if (!$("#contactActions").children.length) $("#contactActions").remove();

  // Renumber the remaining sections 01, 02, 03 …
  document.querySelectorAll("main .section__title .num").forEach((n, i) => { n.textContent = String(i + 1).padStart(2, "0"); });

  /* ---------- Footer ---------- */
  $("#footerName").innerHTML = `&copy; ${new Date().getFullYear()} ${esc(P.name)}`;
  const lm = new Date(document.lastModified);
  $("#updated").textContent = isNaN(lm) ? "" : lm.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  /* ---------- Theme toggle ---------- */
  const root = document.documentElement;
  const themeBtn = $("#themeToggle");
  const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  const syncIcon = () => {
    const icon = themeBtn.querySelector("i");
    icon.classList.toggle("fa-sun", isDark());
    icon.classList.toggle("fa-moon", !isDark());
  };
  syncIcon();
  themeBtn.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (_) {}
    syncIcon();
  });

  /* ---------- Mobile menu ---------- */
  const burger = $("#burger");
  const links = $("#navLinks");
  const setMenu = (open) => {
    links.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    const icon = burger.querySelector("i"); // swap classes (not innerHTML) so the clicked node stays in the DOM
    icon.classList.toggle("fa-bars", !open);
    icon.classList.toggle("fa-xmark", open);
  };
  burger.addEventListener("click", () => setMenu(!links.classList.contains("is-open")));
  links.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  document.addEventListener("click", (e) => { if (!e.target.closest(".nav")) setMenu(false); });

  /* ---------- Nav shadow + scroll-spy ---------- */
  const nav = $(".nav");
  const firstSection = document.getElementById("about");
  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
    // clear the highlighted nav item when back at the top (hero)
    if (window.scrollY < firstSection.offsetTop - window.innerHeight / 2) links.querySelectorAll("a.is-active").forEach((a) => a.classList.remove("is-active"));
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const navMap = new Map([...links.querySelectorAll("a")].map((a) => [a.getAttribute("href").slice(1), a]));
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting && navMap.has(en.target.id)) {
          navMap.forEach((a) => a.classList.remove("is-active"));
          navMap.get(en.target.id).classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));

    const rev = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); rev.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach((el) => rev.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
  }
})();
