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

/**
 * Illustrative scenarios, labelled as such on the page. When a client approves a real
 * story, replace one here and change the section heading in services/page.tsx.
 */
export const caseStudies = [
  {
    id: "cs-1",
    clientType: "Scenario · Mid-sized manufacturer",
    title: "Renewal clarity before a hard market",
    result:
      "Premiums are rising and ops, finance, and the broker each tell a different story. We map the exposures and bring everyone to one account of the risk before renewal talks begin.",
    deliverable: "You leave with: one briefing deck everyone can sign off on",
  },
  {
    id: "cs-2",
    clientType: "Scenario · Professional services firm",
    title: "Claims readiness for a lean team",
    result:
      "Nobody is sure who calls whom when something goes wrong. A tabletop session walks through a realistic incident and surfaces the gaps while they are still cheap to fix.",
    deliverable: "You leave with: named owners and a shared claims checklist",
  },
  {
    id: "cs-3",
    clientType: "Scenario · Regional agency",
    title: "Program design for specialty growth",
    result:
      "Producers are moving into specialty lines faster than their explanations can keep up. We build a coverage map and plain talking points so they can explain value without overselling.",
    deliverable: "You leave with: a coverage map and producer talking points",
  },
] as const;

export const faqs = [
  {
    q: "Do you sell insurance policies directly?",
    a: "No. My work is advisory: risk reviews, program design, workshops, and briefings. Policies stay with your broker or carrier, and I'm glad to work alongside them.",
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
    q: "What is your professional background?",
    a: "I work as an underwriting expert and am accredited by the Institute of Public Relations, Ghana. If your engagement calls for specific credentials, ask on our first call and I'll share the details.",
  },
] as const;
