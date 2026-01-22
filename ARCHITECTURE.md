# System Architecture & Design Patterns

## Core Design Philosophy
We adhere to **SOLID principles** and **Composition over Inheritance** using Vue's Composition API. Our architecture prioritizes readability, maintainability, and clear separation of concerns.

## 1. Directory Structure Strategy

```
src/
├── composables/     # Logic Layer (Business Logic & State Logic)
├── components/      # Presentation Layer (UI only)
├── stores/          # Global State Layer (Pinia)
├── views/           # Page Layer (Route compositing)
└── mocks/           # Data Interface Layer
```

## 2. Key Design Patterns

### A. The Composable Pattern
We extract reusable stateful logic into composables (`use*` functions).
- **Rule**: If logic is used in more than one component, it belongs in a composable.
- **Example**: `useSearchable.ts` abstracts client-side search/filtering from UI components, adhering to the Single Responsibility Principle.

### B. Interface Segregation (Comes with TypeScript)
Components dealing with shared data models (e.g. `MemberTable` and `MemberCardList`) MUST implement the same strict interface.
- **Benefit**: Ensures mobile/desktop views never diverge in data requirements.

### C. Store vs. Mock Separation
- **Stores**: Responsible ONLY for state management (actions, mutation, derived state).
- **Mocks**: Static data is kept in `src/mocks/`, completely separate from store logic.
- **Benefit**: Stores remain clean and testable. Real API integration only requires changing the import source.

## 3. Component Hierarchy

- **Views (Page Level)**
  - Responsible for: Data fetching, layout, passing props to children.
  - *Should not contain heavy UI logic.*

- **Smart Components (e.g., `MemberTable`)**
  - Responsible for: Displaying data, emitting user intents (`@delete`, `@view`).
  - *Should not modify store state directly.*

- **Atomic Components (e.g., `BaseButton`, `StatsOverview`)**
  - Pure presentation. No business logic dependencies.

## 4. Linting & Code Quality
We enforce strict typing and code quality standard via:
- **ESLint**: Standard JS/TS rules + Vue recs.
- **TypeScript**: Strict mode enabled.
- **No Explicit Any**: Generally disallowed throughout the app.
