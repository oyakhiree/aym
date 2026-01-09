# AYM Connect - Adventist Youth Ministry Management System

![Status](https://img.shields.io/badge/Status-Development-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-green)
![Tech](https://img.shields.io/badge/Stack-Vue3%20%7C%20Vite%20%7C%20Tailwind-blueviolet)

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
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Routing**: [Vue Router 4](https://router.vuejs.org/)
- **Icons**: [Lucide Vue](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd "AYM Connect/frontend"
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

## 📂 Project Structure

```
src/
├── assets/          # Static assets and global styles
├── components/      # Vue Components
│   └── ui/          # Reusable atomic UI elements (Buttons, Inputs, Cards)
├── layouts/         # App Layouts (AuthLayout, DashboardLayout)
├── router/          # Route definitions and navigation guards
├── stores/          # Pinia State Stores (Auth, Club, Education)
├── views/           # Page Views
│   ├── auth/        # Authentication pages
│   ├── club/        # Club management pages
│   └── education/   # Education/Class pages
├── App.vue          # Root component
└── main.js          # Entry point
```

## 🧪 Quality Control

Run the linter to ensure code quality:
```bash
npm run lint
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
