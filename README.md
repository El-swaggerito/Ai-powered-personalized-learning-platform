# Learning Dashboard

A personalized learning dashboard that provides tailored recommendations based on user profiles using AI.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [License](#license)

## Features

- **User Authentication:** Secure sign-up and login functionality using Supabase Auth.
- **Personalized Profiles:** Users can create and update their profiles with information about their interests, academic performance, career aspirations, and skill-building needs.
- **AI-Powered Recommendations:** Leverages Google Gemini Pro to generate personalized learning recommendations.
- **Categorized Suggestions:** Recommendations are divided into academic resources (courses, online platforms) and extracurricular activities (workshops, events, volunteering).
- **Dynamic Content:** Recommendations include titles, detailed descriptions, and direct Google search links for easy access to resources.
- **Interactive UI:** A user-friendly interface with tabs for managing profiles and viewing recommendations, built with Next.js and Shadcn UI.
- **Database Integration:** Supabase is used for storing user profiles and their generated recommendations.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (v15+)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Backend & Database:** [Supabase](https://supabase.io/) (Authentication, PostgreSQL Database)
- **AI:** [Google Gemini Pro](https://ai.google.dev/) via `@google/generative-ai`
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Package Manager:** [pnpm](https://pnpm.io/)

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [pnpm](https://pnpm.io/installation)
- A [Supabase](https://supabase.com/) account (for backend and database)
- A [Google Cloud Platform](https://cloud.google.com/) account with the Generative AI API enabled (for AI recommendations)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```
    *(Replace `your-username/your-repo-name` with the actual repository URL if known, otherwise, this is a placeholder)*

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

### Environment Variables

Create a `.env.local` file in the root of your project by copying the example file if it exists, or by creating it manually:

```bash
cp .env.local.example .env.local
```
*(If `.env.local.example` doesn't exist, you can create `.env.local` manually with the content below)*

Add the following environment variables to your `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Generative AI
GEMINIAI=your_google_gemini_api_key
```

**How to get these values:**

-   **Supabase:**
    1.  Go to your Supabase project dashboard.
    2.  Navigate to `Project Settings` > `API`.
    3.  You'll find your `Project URL` (NEXT_PUBLIC_SUPABASE_URL) and `anon` `public` key (NEXT_PUBLIC_SUPABASE_ANON_KEY) there.

-   **Google Gemini API Key:**
    1.  Go to the [Google AI Studio](https://aistudio.google.com/app/apikey) or your Google Cloud Console.
    2.  Create an API key for the Generative Language API (Gemini).
    3.  Ensure the Generative Language API (or Vertex AI API, depending on how you access Gemini) is enabled for your project.

### Database Setup

The project uses Supabase for its database. The schema is defined in `scripts/setup-database.sql`.

1.  Go to your Supabase project dashboard.
2.  Navigate to the `SQL Editor`.
3.  Click on `+ New query`.
4.  Copy the entire content of `scripts/setup-database.sql` and paste it into the SQL editor.
5.  Click `Run`. This will create the necessary tables (`user_profiles`, `user_recommendations`) and set up row-level security policies.

### Running the Application

Once the installation and configuration are complete:

```bash
pnpm dev
```

This will start the development server, typically at `http://localhost:3000`. Open this URL in your browser to see the application.

## Project Structure

Here's an overview of the key directories in this project:

```
.
├── app/                      # Main Next.js application folder (App Router)
│   ├── actions/              # Server Actions (e.g., fetching AI recommendations)
│   ├── auth/                 # Authentication related pages and routes
│   ├── components/           # UI components specific to the application
│   │   └── auth/             # Auth specific components
│   ├── page.tsx              # Main entry page for the dashboard
│   └── layout.tsx            # Root layout for the application
├── components/               # Shared UI components (likely from Shadcn UI)
│   └── ui/                   # Shadcn UI primitive components
├── hooks/                    # Custom React hooks
├── lib/                      # Utility functions and library initializations
│   └── supabase/             # Supabase client and server configurations
├── public/                   # Static assets (images, fonts, etc.)
├── scripts/                  # Utility scripts (e.g., database setup)
├── styles/                   # Global styles
├── .env.local.example        # Example environment variables file (if you create one)
├── next.config.mjs           # Next.js configuration
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── tailwind.config.ts        # Tailwind CSS configuration
```

## Available Scripts

In the project directory, you can run the following commands using `pnpm`:

-   `pnpm dev`
    Runs the app in development mode.
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
    The page will reload if you make edits.

-   `pnpm build`
    Builds the app for production to the `.next` folder.
    It correctly bundles React in production mode and optimizes the build for the best performance.

-   `pnpm start`
    Starts the production server after a build has been made (`pnpm build`).

-   `pnpm lint`
    Runs Next.js's built-in ESLint configuration to lint the project files.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details (if one exists, otherwise, consider adding one).

*(Note: If a specific license is preferred or already exists in the project, this section should be updated accordingly.)*
