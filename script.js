/* ==========================================================================
   Cabinet de Soins Infirmiers « Believe » – script de la page
   Les informations modifiables (WhatsApp, analyses, prix, actualités)
   sont regroupées en haut du fichier.
   ========================================================================== */

/* --- Informations du cabinet ---------------------------------------------- */
var CENTRE = {
  nom: "Cabinet de Soins Infirmiers « Believe »",
  whatsapp: "22892515736"   // numéro WhatsApp avec l'indicatif du Togo (228), chiffres seulement
};

/* --- Analyses : ["Nom complet affiché", prix en FCFA, "mots-clés de recherche (abréviations)"] ---
   Les abréviations ne sont pas affichées mais restent utilisables dans la barre de recherche. */
var ANALYSES = [
  { groupe: "Biochimie", items: [
    ["Urée", 1000], ["Glycémie", 1000], ["Créatinine", 1000, "créat"],
    ["Cholestérol total", 1500, "cholestérol t"], ["Cholestérol HDL", 2500, "hdl"], ["Cholestérol LDL", 2500, "ldl"],
    ["Triglycérides", 2000], ["Aspartate aminotransférase", 1500, "asat tgo"], ["Alanine aminotransférase", 1500, "alat tgp"],
    ["Gamma-glutamyl transférase", 2000, "ggt"], ["Phosphatases alcalines", 2000, "pal"],
    ["Calcium", 1500], ["Magnésium", 1500], ["Potassium", 1500] ] },
  { groupe: "Hématologie", items: [
    ["Numération formule sanguine", 3500, "nfs"], ["Vitesse de sédimentation", 1000, "vs"],
    ["Numération blanche", 1000, "nb"], ["Taux d'hémoglobine", 1000, "th"] ] },
  { groupe: "Parasitologie", items: [
    ["Examen parasitologique des selles", 500, "selles kop kyste oeuf parasite"], ["Goutte épaisse (recherche du paludisme)", 500, "ge"] ] },
  { groupe: "Immuno-sérologie", items: [
    ["Sérologie rétrovirale", 2000, "srv"],
    ["Antigène HBs (hépatite B)", 2500, "aghbs hbs"], ["Protéine C-réactive", 2500, "crp"],
    ["Groupe sanguin et rhésus", 2500, "groupage"], ["Sérologie de la syphilis", 3000, "tpha vdrl"],
    ["Toxoplasmose", 6000], ["Virus de l'hépatite C", 2500, "hvc"],
    ["Test de grossesse sanguin", 1000, "b hcg bhcg"] ] }
];

/* --- Actualités ------------------------------------------------------------ */
var NEWS = [
  { tag: "Octobre rose", date: "Octobre 2026", titre: "Parlons du cancer du sein",
    intro: "Chaque année en octobre, une campagne rappelle que le cancer du sein se soigne mieux quand il est découvert tôt.",
    liste: [
      "Observez et palpez vos seins une fois par mois, à la même période.",
      "Consultez sans attendre devant une boule, un écoulement du mamelon, une peau qui se creuse ou un sein qui change de forme.",
      "Faites examiner vos seins régulièrement par un professionnel de santé, surtout à partir de 40 ans."
    ],
    fin: "Une boule ne veut pas toujours dire cancer, mais seul un examen permet de le savoir. Venez en parler au cabinet." },
  { tag: "Vaccination", date: "Octobre 2026", titre: "Vaccinez vos enfants, dès les premiers mois",
    intro: "La vaccination protège les enfants contre des maladies graves comme la rougeole, la poliomyélite, la tuberculose, la diphtérie, le tétanos ou la coqueluche.",
    liste: [
      "Les vaccins se font à des âges précis, dès la naissance. Respecter les dates donne la meilleure protection.",
      "Apportez toujours le carnet de santé de l'enfant: chaque vaccin y est noté.",
      "Si une date est dépassée, venez quand même. Le calendrier peut être repris."
    ],
    fin: "La vaccination est proposée au cabinet. Appelez-nous au +228 92 51 57 36 ou au +228 70 72 82 12 pour en savoir plus." }
];

(function () {
  "use strict";

  function prix(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " FCFA"; }
  function norm(s) { return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  /* Écrit un texte dans un élément en rendant cliquables les numéros « +228 xx xx xx xx » */
  function ecrire(el, texte) {
    el.textContent = "";
    var re = /\+228 (\d{2}) (\d{2}) (\d{2}) (\d{2})/g, dernier = 0, m;
    while ((m = re.exec(texte))) {
      if (m.index > dernier) el.appendChild(document.createTextNode(texte.slice(dernier, m.index)));
      var a = document.createElement("a");
      a.href = "tel:+228" + m[1] + m[2] + m[3] + m[4];
      a.textContent = m[0];
      el.appendChild(a);
      dernier = m.index + m[0].length;
    }
    if (dernier < texte.length) el.appendChild(document.createTextNode(texte.slice(dernier)));
  }
  function todayISO() { var d = new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }

  /* ---- Mode édition : ajouter ?edition à l'adresse pour voir les champs À COMPLÉTER ---- */
  if (/[?&]edition(=|&|$)/.test(location.search)) {
    document.body.classList.add("edition");
    var ban = document.createElement("div");
    ban.className = "edition-banner";
    ban.textContent = "Mode édition : les zones en jaune sont à compléter.";
    document.body.appendChild(ban);
  }

  /* ---- Menu mobile ---- */
  var burger = document.getElementById("burger"), menu = document.getElementById("menu");
  function ferme(rendreLeFocus) {
    var etaitOuvert = menu.classList.contains("open");
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Ouvrir le menu");
    if (rendreLeFocus && etaitOuvert) burger.focus();
  }
  burger.addEventListener("click", function () {
    var o = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", o ? "true" : "false");
    burger.setAttribute("aria-label", o ? "Fermer le menu" : "Ouvrir le menu");
  });
  menu.addEventListener("click", function (e) { if (e.target.closest && e.target.closest("a")) ferme(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") ferme(true); });

  /* ---- Analyses : Biochimie à gauche, les autres groupes à droite ---- */
  var box = document.getElementById("groups"), cols = [document.createElement("div"), document.createElement("div")], grps = [];
  cols.forEach(function (c) { c.className = "col"; box.appendChild(c); });
  ANALYSES.forEach(function (g, i) {
    var d = document.createElement("div"); d.className = "grp"; d.style.flexGrow = g.items.length;
    var h = document.createElement("h4"); h.textContent = g.groupe; d.appendChild(h);
    var ul = document.createElement("ul"), lis = [];
    g.items.forEach(function (it) {
      var li = document.createElement("li");
      var a = document.createElement("span"); a.className = "lbl";
      a.textContent = it[0];
      var b = document.createElement("span"); b.className = "px"; b.textContent = prix(it[1]);
      li.appendChild(a); li.appendChild(b);
      li.setAttribute("data-k", norm(it[0] + " " + (it[2] || "") + " " + g.groupe));
      ul.appendChild(li); lis.push(li);
    });
    d.appendChild(ul); cols[i === 0 ? 0 : 1].appendChild(d); grps.push({ el: d, lis: lis });
  });
  document.getElementById("q").addEventListener("input", function (e) {
    var q = norm(e.target.value.trim()), total = 0;
    grps.forEach(function (g) {
      var n = 0;
      g.lis.forEach(function (li) { var ok = !q || li.getAttribute("data-k").indexOf(q) > -1; li.hidden = !ok; if (ok) n++; });
      g.el.hidden = n === 0; total += n;
    });
    var visibles = 0;
    cols.forEach(function (c) {
      var any = Array.prototype.some.call(c.children, function (x) { return !x.hidden; });
      c.hidden = !any; if (any) visibles++;
    });
    box.style.gridTemplateColumns = visibles === 1 ? "minmax(0, 1fr)" : "";
    document.getElementById("none").hidden = total > 0;
  });

  /* ---- Actualités ---- */
  var nb = document.getElementById("news");
  NEWS.forEach(function (n) {
    var a = document.createElement("article"); a.className = "post";
    var m = document.createElement("div"); m.className = "meta";
    var t = document.createElement("span"); t.className = "tag"; t.textContent = n.tag;
    var d = document.createElement("span"); d.textContent = n.date; m.appendChild(t); m.appendChild(d);
    var h = document.createElement("h3"); h.textContent = n.titre;
    var p1 = document.createElement("p"); p1.textContent = n.intro;
    var ul = document.createElement("ul");
    n.liste.forEach(function (x) { var li = document.createElement("li"); li.textContent = x; ul.appendChild(li); });
    var p2 = document.createElement("p"); p2.className = "fin"; ecrire(p2, n.fin);
    [m, h, p1, ul, p2].forEach(function (e) { a.appendChild(e); });
    nb.appendChild(a);
  });

  /* ---- Statut d'ouverture : 06h-22h, urgences par téléphone de 22h à 05h ---- */
  (function () {
    var min;
    try {
      var parts = new Intl.DateTimeFormat("en-US", { timeZone: "Africa/Lome", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
      var mp = {}; parts.forEach(function (x) { mp[x.type] = x.value; });
      min = (parseInt(mp.hour, 10) % 24) * 60 + parseInt(mp.minute, 10);
    } catch (e) { var d = new Date(); min = d.getHours() * 60 + d.getMinutes(); }
    var st = document.getElementById("status"), tx = document.getElementById("status-text");
    if (min >= 360 && min < 1320) { st.setAttribute("data-open", "yes"); tx.textContent = "Ouvert maintenant, jusqu'à 22h"; }
    else if (min >= 1320 || min < 300) { st.setAttribute("data-open", "no"); ecrire(tx, "Fermé. Urgences de 22h à 05h : appelez le +228 92 51 57 36"); }
    else { st.setAttribute("data-open", "no"); tx.textContent = "Fermé, ouverture à 06h"; }
  })();

  /* ---- Élément de menu actif (en vert) selon la section visible ---- */
  try {
    var links = Array.prototype.slice.call(document.querySelectorAll("#menu a:not(.cta)"));
    var ids = links.map(function (a) { return a.getAttribute("href").slice(1); });
    var maj = function () {
      var cur = ids[0], y = window.scrollY + 140;
      ids.forEach(function (id) { var el = document.getElementById(id); if (el && el.getBoundingClientRect().top + window.scrollY <= y) cur = id; });
      links.forEach(function (a) {
        var on = a.getAttribute("href") === "#" + cur;
        a.classList.toggle("on", on);
        if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
      });
    };
    window.addEventListener("scroll", maj, { passive: true }); maj();
  } catch (e) {}

  /* ---- Formulaire de rendez-vous ---- */
  var form = document.getElementById("rdv"), dateInput = document.getElementById("f-date");
  dateInput.min = todayISO();
  var err = document.getElementById("err"), result = document.getElementById("result"), msgEl = document.getElementById("msg");
  [form.nom, form.tel, form.date].forEach(function (el) {
    el.addEventListener("input", function () { el.removeAttribute("aria-invalid"); });
  });
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var nom = form.nom.value.trim(), tel = form.tel.value.trim(), date = form.date.value;
    var problemes = [], premier = null;
    function signale(el, texte) { el.setAttribute("aria-invalid", "true"); problemes.push(texte); if (!premier) premier = el; }
    [form.nom, form.tel, form.date].forEach(function (el) { el.removeAttribute("aria-invalid"); });
    if (!nom) signale(form.nom, "votre nom et prénom");
    if (tel.replace(/\D/g, "").length < 8) signale(form.tel, "un numéro de téléphone valide (8 chiffres au minimum)");
    if (!date) signale(form.date, "la date souhaitée");
    else if (date < todayISO()) signale(form.date, "une date à partir d'aujourd'hui");
    if (problemes.length) {
      err.textContent = "Merci d'indiquer : " + problemes.join(" ; ") + ".";
      err.hidden = false; result.hidden = true; premier.focus(); return;
    }
    err.hidden = true;
    var dateTxt = date;
    try { dateTxt = new Date(date + "T12:00:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }); } catch (e) {}
    var lines = [
      "Bonjour, je souhaite prendre rendez-vous au " + CENTRE.nom + ".",
      "Nom : " + nom,
      "Téléphone : " + tel,
      "Service : " + form.service.value,
      "Date souhaitée : " + dateTxt + " (" + form.creneau.value.toLowerCase() + ")"
    ];
    if (form.motif.value.trim()) lines.push("Motif : " + form.motif.value.trim());
    var texte = lines.join("\n");
    msgEl.textContent = texte;
    document.getElementById("wa").href = "https://wa.me/" + CENTRE.whatsapp + "?text=" + encodeURIComponent(texte);
    result.hidden = false;
    document.getElementById("copied").hidden = true;
  });
  document.getElementById("copy").addEventListener("click", function () {
    var ok = document.getElementById("copied");
    function fait() { ok.textContent = "Message copié."; ok.hidden = false; }
    function secours() {
      var r = document.createRange(); r.selectNodeContents(msgEl);
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      ok.textContent = "Message sélectionné, copiez-le avec votre clavier."; ok.hidden = false;
    }
    try { navigator.clipboard.writeText(msgEl.textContent).then(fait, secours); } catch (e) { secours(); }
  });
})();
