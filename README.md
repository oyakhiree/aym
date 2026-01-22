# AYM Connect - Adventist Youth Ministry Management System

![Status](https://img.shields.io/badge/Status-Development-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-green)
![Tech](https://img.shields.io/badge/Stack-Vue3%20%7C%20TypeScript%20%7C%20Vite%20%7C%20Tailwind-blueviolet)

> A modern, mobile-first web platform for managing the administrative and educational activities of the Adventist Youth Ministry (Pathfinder and Adventurer Clubs) within the Lagos Mainland Conference.

## 📱 Executive Summary

AYM Connect digitizes the manual reporting workflows of Youth Clubs. It serves as a unified source of truth for membership data, class tracking (Progressive/Honours), and automated reporting from the Club level up to the Area and Conference levels.

## ✨ Key Features

- **Mobile-First Design**: Native-app feel with bottom navigation for mobile and sidebar for desktop.
- **Role-Based Access**: Specialized views for Club Directors, Instructors, and Admins.
- **Club Management**:
  - Real-time roster management (Active/Inactive status).
  - Digital Member Service Records.
- **Educational Management**:
  - Track Progressive Class and Honour requirements.
  - Digital Attendance taking.
  - Readiness Score calculation for Exam eligibility (Coming Soon).

## 🛠️ Technology Stack

- **Frontend Framework**: [Vue.js 3](https://vuejs.org/) (Composition API)
- **Language**: [TypeScript](https://www.typescriptlang.org/) & JavaScript (Incremental Migration)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
  - **Typography**: [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Routing**: [Vue Router 4](https://router.vuejs.org/)
- **Icons**: [Lucide Vue Next](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd "aym"
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

### Running Locally

Start the development server:
```bash
npm run dev
# or
pnpm dev
```
Access the app at `http://localhost:5173`.

### Building for Production

Create an optimized production build:
```bash
npm run build
```

This will run `vue-tsc` for type check and `vite build`.

## 📂 Project Structure

```
src/
├── assets/          # Static assets (images, fonts, global CSS)
├── components/      # Vue Components
│   ├── club/        # Club-specific components (AddMemberModal, MemberTable, etc.)
│   ├── dashboard/   # Dashboard widgets (Metrics, Quick Actions, Charts)
│   ├── education/   # Education components (ClassCard, AttendanceTab, ExamsTab)
│   └── ui/          # Reusable atomic UI elements (BaseButton, StatsOverview)
├── composables/     # Vue Composition API utilities
│   ├── useDisclosure.ts   # Modal open/close state management
│   ├── useErrorHandler.ts # Standardized async error handling
│   └── useSearchable.ts   # Reusable search/filter logic
├── constants/       # Application constants and configuration
│   └── curriculum.ts      # Progressive classes, Honours, thresholds
├── layouts/         # App Layouts (AuthLayout, DashboardLayout)
├── mocks/           # Mock data for development/testing
│   ├── members.ts   # Sample member data
│   ├── classes.ts   # Sample class data
│   ├── events.ts    # Sample event data
│   └── index.ts     # Central export
├── router/          # Vue Router configuration
├── stores/          # Pinia State Stores
│   ├── auth.ts      # Authentication state
│   ├── club.ts      # Member management
│   ├── class.ts     # Class/education tracking
│   └── event.ts     # Event management
├── types/           # TypeScript type definitions
│   └── index.ts     # Centralized type exports (Member, ClassData, Event, etc.)
├── utils/           # Utility functions
│   └── idGenerator.ts # UUID generation utility
├── views/           # Page Views
│   ├── auth/        # Authentication pages (Login)
│   ├── club/        # Club pages (MemberList, MemberDetail)
│   ├── dashboard/   # Dashboard home page
│   └── education/   # Education pages (ClassList, ClassDetail, Events)
├── App.vue          # Root component
└── main.ts          # Application entry point
```

### Architecture Highlights

| Pattern | Implementation |
|---------|----------------|
| **Composables** | Reusable logic extracted into `useSearchable`, `useDisclosure`, `useErrorHandler` |
| **Separation of Concerns** | Mock data separated from Pinia stores into `/mocks` |
| **Type Safety** | Centralized TypeScript definitions in `/types` |
| **Constants** | Business rules (class names, thresholds) in `/constants` |

## 🧪 Quality Control

Run the linter to ensure code quality:
```bash
npm run lint
```

Run type checking:
```bash
npm run type-check
```

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Built with ❤️ for the Adventist Youth Ministry.*
