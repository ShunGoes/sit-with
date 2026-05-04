# Sit With PD - Holistic Wellness & Personal Development Platform

Sit With PD is a comprehensive platform designed to facilitate holistic wellness, personal growth, and professional development through curated programs, immersive camps, and expert consultations.

## 🌟 Overview

The platform serves as a bridge between individuals seeking growth and expert facilitators providing guidance. It offers a structured environment for participants to engage in various development tracks while providing administrators with robust tools to manage content, bookings, and platform activity.

## 🚀 Key Features

### 📅 Consultation Management
- **Expert Booking**: Seamlessly book one-on-one sessions with experts.
- **Cal.com Integration**: Real-time scheduling and availability management via Cal.com.
- **Service Management**: Admin-defined consultation services with custom durations and pricing.

### 🏕️ Immersive Camps
- **Retreat Planning**: Discover and register for upcoming holistic camps and retreats.
- **Location-Based**: Filter and find camps based on location and specific themes.
- **Tiered Registration**: Flexible registration options for different participant needs.

### 🎓 Educational Programs
- **Structured Learning**: Multi-week programs covering Leadership, Professional, and Student tracks.
- **Progress Tracking**: User-friendly dashboard to monitor learning journey and milestones.
- **Rich Media**: Integrated video players (Vimeo/YouTube) for interactive learning.

### ✍️ Insightful Blog
- **Wellness Stories**: A space for sharing insights, reflection, and community stories.
- **Rich Text Editor**: Powerful Tiptap-based editor for creating engaging content.

### 🛠️ Robust Administration
- **Global Settings**: Manage platform features, currency, timezones, and maintenance mode.
- **User Management**: Track and manage all registered users and their activity.
- **Testimonial System**: Curate and display user feedback to build trust.

## 💻 Technology Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Data Fetching**: [TanStack Query v5](https://tanstack.com/query/latest)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 🛠️ Development

### Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=your_api_url
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

### Project Structure

- `/app`: Next.js pages and layouts (organized by route groups: `(admin)`, `(auth)`, `(public)`, `(user)`)
- `/components`: Reusable UI components, forms, and layout elements
- `/hooks`: Custom React hooks for data fetching and platform logic
- `/lib`: Utility functions and API service definitions
- `/schemas`: Zod validation schemas
- `/store`: Zustand state stores

## 📄 License

This project is private and proprietary.
