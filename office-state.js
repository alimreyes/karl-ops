/* ============================================================================
   OFICINA KARL — estado de los agentes
   ----------------------------------------------------------------------------
   Este archivo es la ÚNICA fuente de datos de la pestaña "Oficina" del
   OPS Dashboard. La EA lo actualiza cada vez que registra algo en un chat
   de agente (asignación, entrega, reunión). Si lo editas a mano:

   tasks[].status
     "active"   → en curso: el agente (y sus colaboradores) se sientan en el
                  escritorio del líder.
     "pending"  → asignada pero sin arrancar: cuenta como carga de trabajo,
                  pero no sienta al agente.
     "stalled"  → asignada hace tiempo, sin movimiento: aparece en el pop-up
                  como alerta, no cuenta como trabajo en curso.
     "done"     → cerrada (se puede borrar o dejar como historial).

   Reglas visuales (las calcula el dashboard, no hay que escribirlas aquí):
     - 3 o más tareas abiertas (active + pending) → escritorio lleno de tazas
       de café y cara ＞﹏＜
     - Sin tareas en curso y 14+ días desde su última entrega → ¯\_(ツ)_/¯
     - Sin tareas en curso → camina por la oficina / water cooler
     - meetings[].active = true → los asistentes se van a la Sala de Juntas

   pinned[]      → EL CARTEL: cosas que vienen de un mes/sesión anterior y que
                   todos deben tener presentes. Salen en el letrero LED, en el
                   tablero de corcho de la oficina y en el pop-up de cada agente
                   al que aplican ("for": lista de ids o "all").
   broadcasts[]  → PASAR LA VOZ: avisos que Alim le pide a la EA que comunique.
                   Durante 3 días el aviso deja una nota en el escritorio de cada
                   destinatario, y al abrir la oficina la EA recorre los
                   escritorios entregándolo ("to": lista de ids o "all").

   Fechas siempre en formato "AAAA-MM-DD".
   ========================================================================== */

window.OFFICE_STATE = {
  updated: "2026-10-02",
  updatedBy: "Executive Assistant",

  /* --------------------------------------------------------------------- */
  agents: [
    {
      id: "ms", name: "Marketing Specialist", plate: "MKT SPEC.", color: "#6B7C8F",
      role: "Dirección estratégica: posicionamiento, mensaje y voz de marca para todas las líneas de servicio.",
      chatLog: "Chat between agents/EA - Marketing Specialist - Chat.md",
      lastDelivery: { date: "2026-10-01", text: "QA de los entregables de Residential Rubbish Removal (blogs, LinkedIn, investigación) — confirmado OK por Alim." }
    },
    {
      id: "data", name: "Data Analysis Expert", plate: "DATA ANALYST", color: "#F2C94C",
      role: "Reportes mensuales, GA4, Search Console, Mailchimp y Meta Ads.",
      chatLog: "Chat between agents/EA - Data Analysis Expert - Chat.md",
      lastDelivery: { date: "2026-10-01", text: "Reporte mensual de septiembre 2026 (12 láminas) + 5 prioridades para octubre." }
    },
    {
      id: "seo", name: "SEO / AEO / GEO Specialist", plate: "SEO·AEO·GEO", color: "#2FBF9F",
      role: "Búsqueda, answer engines y generative engines: keywords, schema, internal linking.",
      chatLog: "Chat between agents/EA - SEO-AEO-GEO Specialist - Chat.md",
      lastDelivery: { date: "2026-10-01", text: "Pase de SEO/schema sobre los 4 blogs de Rubbish Removal — publicados (confirmado por Alim)." }
    },
    {
      id: "content", name: "Content & Blog Writer", plate: "CONTENT", color: "#8BD450",
      role: "Blogs, contenido largo y copy de marca.",
      chatLog: "Chat between agents/EA - Content & Blog Writer - Chat.md",
      lastDelivery: { date: "2026-09-24", text: "4 blogs geolocalizados de Residential Rubbish Removal — ya publicados." }
    },
    {
      id: "webdev", name: "Web Developer", plate: "WEB DEV", color: "#4C7EE8",
      role: "Sitio en Squarespace, HTML, tracking (GA4, Pixel) y apps internas.",
      chatLog: "Chat between agents/EA - Web Developer - Chat.md",
      lastDelivery: { date: "2026-08-26", text: "Fix del width-gap en las 3 páginas de servicio + About Us verificado en vivo." }
    },
    {
      id: "email", name: "Email Marketing", plate: "EMAIL", color: "#F59E3B",
      role: "Campañas, secuencias y firmas en Mailchimp.",
      chatLog: "Chat between agents/EA - Email Marketing - Chat.md",
      lastDelivery: { date: "2026-09-25", text: "HTML de las campañas 1-3 de Residential Rubbish Removal (aún sin enviar)." }
    },
    {
      id: "linkedin", name: "LinkedIn Marketing", plate: "LINKEDIN", color: "#5FD3F3",
      role: "Contenido B2B orgánico en la página de empresa de LinkedIn.",
      chatLog: "Chat between agents/EA - LinkedIn Marketing - Chat.md",
      lastDelivery: { date: "2026-09-25", text: "4 posts repurposeados de los blogs de Rubbish Removal — publicados (confirmado por Alim)." }
    },
    {
      id: "paid", name: "Paid Media Specialist", plate: "PAID MEDIA", color: "#F06FB3",
      role: "Meta / Google / LinkedIn Ads y campañas de generación de leads.",
      chatLog: "Chat between agents/EA - Paid Media Specialist - Chat.md",
      lastDelivery: { date: "2026-07-04", text: "Brief de campaña de julio ($60, objetivo Leads) — confirmado por Alim." }
    },
    {
      id: "lead", name: "Lead Research Agent", plate: "LEAD RSRCH", color: "#A0703F",
      role: "Búsqueda y verificación de empresas y contactos para outbound.",
      chatLog: "Chat between agents/EA - Lead Research Agent - Chat.md",
      lastDelivery: { date: "2026-10-01", text: "Investigación de posicionamiento de Rubbish Removal en la zona Chermside–Victoria Point — confirmada OK por Alim." }
    },
    {
      id: "design", name: "Design", plate: "DESIGN", color: "#B07BEA",
      role: "Diseño visual: tarjetas, folletos y assets para el resto de los agentes.",
      chatLog: "Chat between agents/EA - Design - Chat.md",
      lastDelivery: { date: "2026-10-01", text: "Fotos reales de KARL para los blogs y los posts de LinkedIn — confirmadas OK por Alim." }
    },
    {
      id: "ea", name: "Executive Assistant", plate: "EXEC ASST.", color: "#F15B45",
      role: "Coordina a todos los agentes, mantiene el contexto y los tiempos. Nadie habla con nadie sin pasar por aquí.",
      chatLog: "Chat between agents/00 - EA Coordination Hub.md",
      lastDelivery: { date: "2026-10-01", text: "Verificación de la página en vivo de Residential Rubbish Removal + pestaña Oficina del dashboard." }
    }
  ],

  /* --------------------------------------------------------------------- */
  tasks: [
    /* Minuta 02/10 — ángulo "aliado del equipo de limpieza interno" */
    { id: "ms-angle", title: "Validar el posicionamiento \"aliado de tu equipo de limpieza\" + jerarquía de CTA (llamar primero)", lead: "ms", collaborators: ["content"], status: "active", since: "2026-10-02",
      detail: "KARL es contratado por empresas que ya tienen equipo interno, para limpieza profunda. Complementa, no reemplaza. Sin tagline ni claims de certificaciones." },
    { id: "ct-angle", title: "Variantes de titular + blog/sección con el ángulo de aliado", lead: "content", collaborators: ["seo"], status: "active", since: "2026-10-02",
      detail: "2-3 variantes y un bloque reutilizable (web, email, LinkedIn, anuncios). Pasa por SEO antes de publicar." },
    { id: "wd-popup", title: "Pop-up del sitio: incentivar la llamada directa (0451 791 377)", lead: "webdev", collaborators: ["content"], status: "active", since: "2026-10-02",
      detail: "Botón tel: en móvil + evento de clic al teléfono en GA4." },
    { id: "wd-cert", title: "Ocultar /our-certifications y sacarla del FAQ hasta que KARL mande info", lead: "webdev", collaborators: ["seo"], status: "active", since: "2026-10-02",
      detail: "Quitar de menú/footer/FAQ y revisar links internos. SEO: sitemap, schema y noindex mientras tanto." },
    { id: "seo-angle", title: "Keyword research del ángulo + limpieza de /our-certifications en sitemap/schema", lead: "seo", collaborators: [], status: "pending", since: "2026-10-02",
      detail: "Dónde encaja el ángulo (página de servicio, blog, FAQ schema)." },
    { id: "em-cta", title: "Botón \"llamar\" o \"Free Quotation\" en plantillas y campañas", lead: "email", collaborators: ["content"], status: "pending", since: "2026-10-02",
      detail: "No usar \"free quote\" en los correos de Rubbish Removal hasta que Alim confirme esa política." },
    { id: "li-alt", title: "Calendario alternado: limpieza industrial ↔ Residential Rubbish Removal", lead: "linkedin", collaborators: ["content"], status: "active", since: "2026-10-02",
      detail: "2-3 posts nuevos de industrial con el ángulo de aliado (en inglés). Tope 1 de 4 y sin mezclar con HACCP." },
    { id: "pm-angle", title: "Variantes de anuncio con el ángulo de aliado (CTA llamada / Free Quotation)", lead: "paid", collaborators: [], status: "pending", since: "2026-10-02",
      detail: "Cuando Meta Ads se reactive; UTM distinto para llamadas vs formulario." },

    /* EA */
    { id: "ea-oct", title: "Rutear las 5 prioridades de octubre del reporte de septiembre", lead: "ea", collaborators: [], status: "active", since: "2026-10-01",
      detail: "#3 títulos/meta de 4 páginas sin clics → SEO + Content · #4 reactivar email y limpiar lista → Email + Lead Research · #5 LinkedIn cadencia/foco → LinkedIn. (#1, #2 y Meta ya los dejó Data Analysis en los chats de Web Dev y Paid Media)." },
    { id: "ea-email", title: "Seguimiento: envío de la campaña de Email de Rubbish Removal", lead: "ea", collaborators: [], status: "active", since: "2026-10-01",
      detail: "Alim confirmó el 01/10 que aún no se ha enviado." },

    /* Email */
    { id: "em-rr", title: "Campaña Residential Rubbish Removal (5 correos)", lead: "email", collaborators: [], status: "active", since: "2026-09-24",
      detail: "Correos 1-3 en HTML (referidos/awareness a la lista actual). Faltan: imágenes en alta resolución en Mailchimp, visto bueno de Alim al split de audiencia y envío. Correos 4-5 en espera de una lista con intención residencial." },
    { id: "em-sign", title: "Firma de email de Rosa — esperando feedback del cliente", lead: "email", collaborators: [], status: "stalled", since: "2026-07-02", detail: "Entregada el 02/07, sin respuesta del cliente." },

    /* Web Developer (tickets de Data Analysis) */
    { id: "wd-form", title: "GA4: confirmar que form_submit dispara y está marcado como key event", lead: "webdev", collaborators: ["data"], status: "pending", since: "2026-10-01",
      detail: "Key events = 0 en agosto y septiembre (julio: 27). Data Analysis lo verifica en el reporte de octubre." },
    { id: "wd-bots", title: "GA4: excluir tráfico automatizado (Singapur/EE.UU.) + estandarizar UTMs", lead: "webdev", collaborators: ["data"], status: "pending", since: "2026-10-01",
      detail: "Solo 13 de 153 usuarios son de Australia. UTMs a corregir: linkind, social_media, zbvyduvzc." },
    { id: "wd-nav", title: "Confirmar que Residential Rubbish Removal es accesible desde el menú del sitio", lead: "webdev", collaborators: [], status: "pending", since: "2026-10-01",
      detail: "No se vio link al servicio desde el home al revisarlo el 01/10." },
    { id: "wd-audit", title: "Auditoría técnica del sitio (58/100): 2 críticos + quick wins", lead: "webdev", collaborators: ["seo"], status: "stalled", since: "2026-08-19",
      detail: "Contraste del hero, CTAs blanco sobre blanco, robots.txt bloqueando crawlers de IA, imagen hero de 6.2 MB, schema." },

    /* SEO */
    { id: "seo-audit", title: "Auditoría del sitio: análisis y priorización de hallazgos SEO/AEO/GEO", lead: "seo", collaborators: [], status: "stalled", since: "2026-08-19", detail: "Asignado el 19/08, sin entrega registrada." },

    /* Paid Media */
    { id: "pm-meta", title: "Confirmar estado de la campaña de Meta Ads y su objetivo (Leads vs Traffic)", lead: "paid", collaborators: [], status: "pending", since: "2026-10-01",
      detail: "1 sesión de Meta en todo septiembre (julio: 230). Pedido por Data Analysis." },
    { id: "pm-tag", title: "Verificar en Meta Ads Manager que no quede el lema de PROTOCOLo en los headlines", lead: "paid", collaborators: [], status: "stalled", since: "2026-09-03", detail: "Los archivos se corrigieron; lo publicado en Meta no se ha confirmado." },

    /* Lead Research */
    { id: "lr-vert", title: "Estrategia de contacto: casas de retiro, concesionarios y complejos de oficinas", lead: "lead", collaborators: [], status: "stalled", since: "2026-09-02", detail: "Incluye lista de Real Estate y Google Sheet de visitas por zona." },

    /* Design */
    { id: "de-cards", title: "Rediseño de tarjetas + tarjeta y folleto por servicio", lead: "design", collaborators: ["content"], status: "stalled", since: "2026-09-02", detail: "Rotación mensual con links distintos para medir." },

    /* Marketing Specialist */
    { id: "ms-deck", title: "Revisar el deck de 19 láminas por el lema de PROTOCOLo", lead: "ms", collaborators: [], status: "stalled", since: "2026-09-03", detail: "No se pudo escanear el .pptx; quedó como autocontrol del agente." }
  ],

  /* --------------------------------------------------------------------- */
  meetings: [
    {
      id: "m-1002", date: "2026-10-02", title: "Mesa redonda: KARL, aliado de tu equipo de limpieza", active: true,
      attendees: ["ea", "ms", "seo", "content", "webdev", "email", "linkedin", "paid"],
      topics: [
        { text: "Ángulo: \"Aunque tu empresa tenga un equipo de limpieza, KARL es tu aliado para la limpieza profunda\"", status: "open" },
        { text: "Web: pop-up para incentivar la llamada directa", status: "open" },
        { text: "Web: ocultar /our-certifications y sacarla del FAQ hasta que KARL mande info", status: "open" },
        { text: "Email: botón para llamar o ir a Free Quotation", status: "open" },
        { text: "LinkedIn: alternar limpieza industrial ↔ Residential Rubbish Removal", status: "open" },
        { text: "Free Quotation en email vs política sin confirmar de Rubbish Removal", status: "open" }
      ]
    },
    {
      id: "m-0924", date: "2026-09-24", title: "Mesa redonda: Residential Rubbish Removal", active: false,
      attendees: ["ea", "ms", "lead", "seo", "content", "linkedin", "email"],
      topics: [
        { text: "4 blogs geolocalizados (Chermside/Nundah → Sunnybank/Victoria Point)", status: "resolved" },
        { text: "Pase de SEO + schema + internal links de los blogs", status: "resolved" },
        { text: "LinkedIn: repurposear los 4 blogs (tope 1 de cada 4 posts)", status: "resolved" },
        { text: "Investigación de posicionamiento en la zona", status: "resolved" },
        { text: "QA de Marketing Specialist (firewall de marca, sin flota)", status: "resolved" },
        { text: "Fotos reales en vez de stock", status: "resolved" },
        { text: "Precio / teléfono / GMB → aclarado (cotización por teléfono, mismo número, GMB del lado de KARL)", status: "resolved" },
        { text: "FAQ con placeholder + canonical de la página", status: "resolved" },
        { text: "\"24-Hour Guarantee\" → se queda (decisión de Alim)", status: "resolved" },
        { text: "Campaña de 5 correos — envío", status: "open" }
      ]
    },
    {
      id: "m-0903", date: "2026-09-03", title: "Aviso a todos: KARL no tiene tagline", active: false,
      attendees: ["ea", "ms", "data", "seo", "content", "webdev", "email", "linkedin", "paid", "lead", "design"],
      topics: [
        { text: "\"The data decides, we execute\" es el lema de PROTOCOLo — corregido en 6 archivos", status: "resolved" },
        { text: "Paid Media: confirmar headlines publicados en Meta Ads Manager", status: "open" },
        { text: "Marketing Specialist: revisar el deck .pptx", status: "open" }
      ]
    },
    {
      id: "m-0902", date: "2026-09-02", title: "Minuta 02/09: KARL pasa a ser multi-servicio", active: false,
      attendees: ["ea", "content", "seo", "webdev", "email", "linkedin", "lead", "design"],
      topics: [
        { text: "Posicionamiento y copy del nuevo servicio", status: "resolved" },
        { text: "Keyword research + schema", status: "resolved" },
        { text: "Página Residential Rubbish Removal en vivo", status: "resolved" },
        { text: "Post en redes anunciando el servicio", status: "resolved" },
        { text: "Página Commercial Rubbish Removal", status: "open" },
        { text: "Estrategia de contacto por vertical (retiro, concesionarios, oficinas)", status: "open" },
        { text: "Lista de Real Estate + sheet de visitas por zona", status: "open" },
        { text: "Tarjetas y folletos por servicio", status: "open" },
        { text: "Video de entrada para GMB (KARL)", status: "open" }
      ]
    },
    {
      id: "m-0819", date: "2026-08-19", title: "Hallazgos del reporte de julio", active: false,
      attendees: ["ea", "data", "seo", "linkedin", "email", "content"],
      topics: [
        { text: "SEO: reescribir títulos/metas de las 5 páginas con más impresiones", status: "open" },
        { text: "LinkedIn: repetir el formato del post del 17/07", status: "open" },
        { text: "Email: mantener volumen y replicar el formato \"30-Day Audit Prep\"", status: "open" },
        { text: "Content: 4 posts de agosto con el ángulo que sí funcionó", status: "resolved" }
      ]
    }
  ],

  /* EL CARTEL — lo que todos deben tener presente ------------------------- */
  pinned: [
    { from: "ea", date: "2026-10-02", for: ["ms", "seo", "content", "webdev", "email", "linkedin", "paid"],
      text: "Ángulo nuevo: KARL es contratado por empresas que YA tienen equipo de limpieza, para la limpieza industrial profunda. \"Aunque tu empresa tenga un equipo de limpieza, KARL es tu aliado para esos procesos más profundos que necesitan un equipo especializado y experimentado.\" Complementa, no reemplaza.",
      source: "Minuta de Alim, 02/10" },
    { from: "ea", date: "2026-10-02", for: ["webdev", "seo", "content", "email", "linkedin", "paid"],
      text: "/our-certifications queda oculta (y fuera del FAQ) hasta que KARL envíe la información. Ningún claim ni link de certificaciones en copy nuevo.",
      source: "Minuta del 02/10" },
    { from: "ea", date: "2026-10-02", for: ["webdev", "email", "linkedin", "paid", "content"],
      text: "El canal más directo con KARL es la llamada (0451 791 377). Pop-up del sitio y botón del email empujan a llamar; Free Quotation como alternativa en email.",
      source: "Minuta del 02/10" },
    { from: "data", date: "2026-10-01", for: "all",
      text: "Solo 13 de 153 usuarios (8.5%) son de Australia; ~56% parece tráfico automatizado. No presentar el crecimiento de sesiones como audiencia real — leer la vista \"solo Australia\".",
      source: "Reporte de septiembre 2026" },
    { from: "data", date: "2026-10-01", for: ["webdev", "paid", "ea", "ms"],
      text: "0 form_submit en agosto y septiembre (julio: 27). Confirmar el tracking antes de concluir que la landing o los anuncios fallaron.",
      source: "Reporte de septiembre 2026" },
    { from: "data", date: "2026-10-01", for: ["seo", "content"],
      text: "4 páginas en posición <10 con 234 impresiones y 0 clics: el problema es el CTR (títulos y metas), no el ranking.",
      source: "Reporte de septiembre 2026" },
    { from: "data", date: "2026-10-01", for: ["email", "lead"],
      text: "Los 2 clics de email de septiembre vinieron de la misma empresa de reclutamiento. \"Audit Readiness Glossary\" abre 16.5% vs 12.3% de \"QAC vs PAA\".",
      source: "Reporte de septiembre 2026" },
    { from: "data", date: "2026-10-01", for: ["linkedin", "ms"],
      text: "LinkedIn: 3 posts en septiembre (julio: 10), los tres de Rubbish Removal. Hay que decidir para qué es el perfil.",
      source: "Reporte de septiembre 2026" },
    { from: "ea", date: "2026-09-03", for: "all",
      text: "KARL no tiene tagline. \"The data decides, we execute\" es el lema de PROTOCOLo — nunca usarlo para KARL.",
      source: "Regla de marca permanente" },
    { from: "ms", date: "2026-09-03", for: ["content", "email", "linkedin", "paid", "design"],
      text: "Rubbish Removal: KARL tiene UNA camioneta, no una flota. Voz de confiabilidad, no de compliance. En LinkedIn, máximo 1 de cada 4 posts y nunca mezclado con HACCP.",
      source: "Estrategia de Marketing Specialist" }
  ],

  /* PASAR LA VOZ — avisos que Alim pidió comunicar ------------------------- */
  broadcasts: [
    { date: "2026-10-02", from: "Alim", to: ["ms", "seo", "content", "webdev", "email", "linkedin", "paid"],
      text: "Mesa redonda: KARL ha sido contratado por empresas que ya tienen equipo de limpieza, para limpieza industrial profunda → mensaje de aliado. Web: pop-up para llamar y ocultar /our-certifications (también del FAQ) hasta nuevo aviso. Email: botón de llamar o Free Quotation. LinkedIn: alternar limpieza industrial y Residential Rubbish Removal." },
    { date: "2026-10-01", from: "Alim", to: ["content", "seo", "webdev", "email", "linkedin", "paid", "ms"],
      text: "Residential Rubbish Removal está en vivo en /residential-rubbish-removal. Alim ya corrigió el FAQ y la canonical. Decisiones finales: el \"24-Hour Guarantee\" se queda; el precio es por cotización telefónica (nunca una cifra publicada); el teléfono es el de siempre, 0451 791 377; GMB sigue pausado y depende de KARL." },
    { date: "2026-09-03", from: "Alim", to: "all",
      text: "KARL no tiene tagline: \"The data decides, we execute\" es el lema de PROTOCOLo. Corregido en 6 archivos." }
  ],

  /* Temas que aún no se han tratado en una reunión ------------------------ */
  upcoming: [
    "Esperar de KARL la información para rellenar /our-certifications",
    "Confirmar con Alim la política de Free Quotation para Rubbish Removal",
    "Rutear las 5 prioridades de octubre (reporte de septiembre)",
    "Enviar la campaña de email de Rubbish Removal",
    "LinkedIn: ¿la página sigue con contenido de food manufacturing?",
    "Meta Ads: ¿pausado? ¿objetivo Leads o Traffic?",
    "Decidir qué hacer con el segmento \"Oficinas\" (55% de la BBDD)",
    "Auditoría técnica del sitio (58/100)",
    "Página Commercial Rubbish Removal (aún no publicada)",
    "Política de cotización gratis + disposición del escombro",
    "GMB: reactivación (pendiente del lado de KARL)"
  ]
};
