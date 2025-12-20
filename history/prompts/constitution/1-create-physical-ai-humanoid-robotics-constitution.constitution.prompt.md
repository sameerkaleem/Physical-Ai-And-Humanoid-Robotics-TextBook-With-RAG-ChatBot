---
id: 1
title: Create Physical AI Humanoid Robotics Constitution
stage: constitution
date: 2025-12-14
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: User
command: /sp.constitution
labels: [constitution, physical-ai, humanoid-robotics, documentation]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
  - .specify/templates/plan-template.md
  - .specify/templates/spec-template.md
  - .specify/templates/tasks-template.md
tests:
  - null
---

## Prompt

```text
/sp.constitution
Role & Goal

You are an expert curriculum designer, systems engineer, and technical writer specializing in AI, robotics, embodied intelligence, and developer education, with 20+ years of experience designing documentation-first learning systems.

Your goal is to author a production-quality technical book titled:

Physical AI and Humanoid Robotics

The book must be AI-authored, spec-driven, and system-oriented, published via Docusaurus, and paired with an embedded RAG chatbot that answers questions strictly from documented content.

Constitution for the Book
Physical AI and Humanoid Robotics
1. Vision

The vision of Physical AI and Humanoid Robotics is to create a documentation-first, system-level learning resource that explains intelligence as an emergent property of embodied systems interacting with the physical world.

This book exists to help learners move beyond disembodied, software-only AI, and instead understand how intelligence arises from the tight coupling of sensing, actuation, control, learning, and physics within humanoid robotic systems.

The project prioritizes:

Clarity over abstraction

Buildability over theory

Systems understanding over isolated algorithms

The final artifact must be suitable for long-term maintenance, extension, and reuse, both by humans and AI systems.

2. Core Principles
2.1 Embodiment First

All intelligence discussed in this project must be grounded in physical embodiment, whether real or simulated.

No concept may be introduced without reference to:

Sensors

Actuators

Control loops

Environmental interaction

Disembodied AI examples are allowed only for contrast, never as the main focus.

2.2 Learn by Building

Every chapter and lesson must result in a concrete outcome, such as:

A simulation

A controller design

A behavioral experiment

A system architecture

A deployable reasoning pipeline

Purely passive or descriptive learning is explicitly disallowed.

2.3 Systems Thinking Over Algorithms

The book prioritizes system interactions over individual algorithms.

Algorithms are introduced only after their role in the physical system is clear

Trade-offs, constraints, and failure modes must be discussed

No algorithm may be presented as a "magic solution"

2.4 Simulation as a First-Class Medium

Simulation is treated as the primary laboratory for learning Physical AI.

Simulation must be framed as:

Safe

Inspectable

Repeatable

Scalable

Sim-to-real transfer is discussed conceptually, without exaggerated claims or unrealistic guarantees.

2.5 Beginner-Accessible, Expert-Respectful

All content must:

Be accessible to learners with basic programming knowledge

Avoid unnecessary mathematics and formal proofs

Maintain technical correctness and professional rigor

No black-box explanations, hype, or hand-waving are permitted.

2.6 Documentation Is the Product

The book itself is the primary artifact of the project.

This implies:

Clear, predictable structure

Explicit assumptions

Strong internal linking

Markdown-first authoring

Open-source friendliness

Slides, videos, demos, or external tooling are secondary and optional.

3. Success Criteria

This project is considered successful if:

Learners can explain Physical AI and embodied intelligence in their own words

Learners can modify simulations or system designs and predict behavioral changes

Concepts remain valid when applied to real humanoid robots

The documentation can be extended without rewriting foundations

The embedded RAG chatbot answers questions strictly from documented content

Selection-based RAG answers never leak external or unstated knowledge

4. Constraints
4.1 Scope Constraints

Focus is limited to Physical AI and humanoid robotics

Purely symbolic AI, web-scale AI, or general LLM theory is out of scope

Hardware discussion is conceptual, not vendor-specific

4.2 Technical Constraints

Content must be publishable using Docusaurus

Markdown / MDX is the primary format

Code examples must be:

Illustrative

Readable

Language-agnostic where possible

No dependency on proprietary simulation platforms without open alternatives

4.3 Pedagogical Constraints

Avoid deep mathematical derivations

Avoid academic jargon without explanation

Avoid theory-only chapters with no physical grounding

Each lesson must have a clear learning objective and outcome

5. Stakeholders
Primary Stakeholders

Beginner to intermediate learners

Students of AI, robotics, and embodied intelligence

Software engineers transitioning into robotics or Physical AI

Secondary Stakeholders

Educators using the book as curriculum

Open-source contributors

Researchers seeking system-level explanations

6. Brand Voice
Tone

Clear

Calm

Instructional

Engineering-oriented

Style

Precise language

Short, structured sections

Diagrams preferred over equations

Examples grounded in physical systems

Values Communicated

Curiosity over hype

Understanding over memorization

Systems over slogans

Reality over speculation

Marketing language, exaggerated claims, and futuristic hype are explicitly prohibited.

7. Enforcement

This
```

## Response snapshot

# Summary

I have successfully updated the project constitution for "Physical AI and Humanoid Robotics" based on your detailed input. Here's what was accomplished:

### Changes Made:

1. **Updated Constitution File**: `.specify/memory/constitution.md` has been completely revised with all the principles, constraints, success criteria, stakeholders, and brand voice from your input.

2. **Version**: Updated to 1.0.0 (initial version for this specific project)

3. **Constitution Structure**:
   - Added Vision section (1. Vision)
   - Added all 6 Core Principles (2.1-2.6)
   - Added Success Criteria (3. Success Criteria)
   - Added Stakeholders (5. Stakeholders)
   - Added Constraints (4. Constraints) with subsections
   - Added Brand Voice (6. Brand Voice) with subsections
   - Added Governance section

4. **Template Updates**: Updated 3 dependent templates to align with the new constitution:
   - `.specify/templates/plan-template.md` - Added Constitution Check aligned with Physical AI principles
   - `.specify/templates/spec-template.md` - Updated Success Criteria to match constitution
   - `.specify/templates/tasks-template.md` - Updated to emphasize "Learn by Building" outcomes

### Validation:
- All placeholder tokens have been replaced with concrete values
- No duplicate sections remain
- All content matches the user input specifications
- Proper formatting and structure maintained

### Suggested Commit Message:
`docs: create constitution for Physical AI and Humanoid Robotics project v1.0.0`

The constitution now fully reflects the vision of creating a documentation-first, system-level learning resource for Physical AI and humanoid robotics, with all the core principles you specified including embodiment-first approach, learn-by-building methodology, and systems thinking over isolated algorithms.

## Outcome

- ✅ Impact: Created complete constitution for Physical AI and Humanoid Robotics book project with all specified principles and aligned templates
- 🧪 Tests: No tests required for this documentation update
- 📁 Files: Updated constitution.md and 3 template files to align with new constitution
- 🔁 Next prompts: Ready for feature specification and planning work
- 🧠 Reflection: Successfully implemented the complete constitution with proper structure and alignment across templates

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin feature specification work using the new constitution