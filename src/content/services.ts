export const services = [
  {
    id: "risk-advisory",
    title: "Corporate Risk Advisory",
    summary:
      "Structured risk reviews for mid-market teams who need clarity before renewal season—not jargon after the fact.",
    outcomes: [
      "Exposure maps tied to real operations",
      "Renewal-ready briefing decks",
      "Stakeholder language that lands with finance and ops",
    ],
  },
  {
    id: "insurance-program",
    title: "Insurance Program Design",
    summary:
      "Coverage architecture for agencies and corporate clients who outgrew off-the-shelf bundles.",
    outcomes: [
      "Gap analysis across property, liability, and specialty lines",
      "Carrier conversation prep",
      "Policy language translated for non-specialists",
    ],
  },
  {
    id: "claims-readiness",
    title: "Claims Readiness Workshops",
    summary:
      "Tabletop sessions so your team knows who does what when something goes wrong.",
    outcomes: [
      "Playbooks with named owners",
      "Documentation checklists",
      "Post-incident review cadence",
    ],
  },
  {
    id: "speaking",
    title: "Briefings & Speaking",
    summary:
      "Keynotes and closed-door briefings on risk culture, renewals, and decision hygiene.",
    outcomes: [
      "Audience-tuned outlines",
      "Take-home frameworks",
      "Optional Q&A facilitation",
    ],
  },
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Listen",
    body: "A discovery call to map goals, constraints, and who needs to be in the room.",
  },
  {
    step: "02",
    title: "Diagnose",
    body: "Document review and exposure walkthrough—focused, time-boxed, written up clearly.",
  },
  {
    step: "03",
    title: "Design",
    body: "Recommendations with options, tradeoffs, and a path your stakeholders can approve.",
  },
  {
    step: "04",
    title: "Steady",
    body: "Optional retainers for renewals, workshops, and ongoing counsel as the year turns.",
  },
] as const;

export const whoItsFor = [
  "Corporate agents and producers building specialist credibility",
  "Ops and finance leads at growing companies preparing for renewal",
  "Founders who need a clear insurance story for boards or lenders",
  "Teams wanting workshops without a multi-year consulting engagement",
] as const;

export const caseStudies = [
  {
    id: "cs-1",
    clientType: "[PLACEHOLDER: Mid-market manufacturer]",
    title: "Renewal clarity before a hard market",
    result:
      "A single briefing deck that aligned ops, finance, and broker—renewal closed with fewer surprises.",
    metric: "[PLACEHOLDER: Outcome metric]",
  },
  {
    id: "cs-2",
    clientType: "[PLACEHOLDER: Professional services firm]",
    title: "Claims readiness for a lean team",
    result:
      "Named owners, a shared checklist, and a tabletop that surfaced gaps before a real incident.",
    metric: "[PLACEHOLDER: Outcome metric]",
  },
  {
    id: "cs-3",
    clientType: "[PLACEHOLDER: Regional agency]",
    title: "Program redesign for specialty growth",
    result:
      "Coverage map and talking points that helped producers explain value without overselling.",
    metric: "[PLACEHOLDER: Outcome metric]",
  },
] as const;

export const faqs = [
  {
    q: "Do you sell insurance policies directly?",
    a: "This site presents advisory and workshop offerings. Licensing and placement details are placeholders—replace with your real credentials and placement model before launch.",
  },
  {
    q: "Who is a good fit for a discovery call?",
    a: "Teams facing a renewal, a coverage question they cannot answer cleanly, or a need for stakeholder-ready risk language.",
  },
  {
    q: "How do engagements usually start?",
    a: "A short discovery call, a scoped proposal, then a time-boxed diagnostic. Retainers are optional after the first project.",
  },
  {
    q: "Can you speak at our offsite or conference?",
    a: "Yes—use the contact form with topic “Speaking.” Share audience size, format, and desired takeaways.",
  },
  {
    q: "Are credentials and firm affiliations listed here real?",
    a: "No. All licenses, firm names, and affiliations on this MVP are fictional placeholders for you to replace.",
  },
] as const;
