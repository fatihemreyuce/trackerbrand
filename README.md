# Tracker Landing

> Modern, responsive marketing website for **Tracker**, built with Next.js, TypeScript, and Tailwind CSS with a strong focus on product presentation, responsive design, accessibility, and maintainable frontend architecture.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vitest](https://img.shields.io/badge/Tests-Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-Screenshots-2EAD33?style=flat-square&logo=playwright&logoColor=white)

---

## 📌 Overview

Tracker Landing is the marketing website for **Tracker**.

The project presents the product through a structured landing-page experience combining product messaging, feature explanations, interface previews, comparison sections, FAQs, and a contact flow.

It was built as a production-oriented frontend rather than a static promotional page, with reusable components, form validation, server-side email handling, automated tests, and a screenshot pipeline.

---

## ✨ Features

- Responsive product landing page
- Modern component-based architecture
- Product hero section
- Problem and solution presentation
- Feature / product pillars
- Product comparison section
- Interactive screenshot showcase
- Step-by-step product explanation
- FAQ accordion
- Contact and demo request form
- Client-side form validation
- Server-side email delivery
- Submission rate limiting
- SEO-oriented metadata support
- Sitemap and robots configuration
- Automated tests
- Automated screenshot capture pipeline

---

## 🛠 Tech Stack

### Frontend

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Radix UI**
- **Lucide React**

### Forms & Validation

- **React Hook Form**
- **Zod**
- **Hookform Resolvers**

### Server & Services

- **Nodemailer**
- **Firebase Admin**
- **Gmail SMTP**

### Testing & Tooling

- **Vitest**
- **Playwright**
- **ESLint**
- **Prettier**

---

## 🧩 Page Architecture

The landing page is composed of independent sections:

```text
HomePage
│
├── ScrollProgress
├── Navigation
│
├── Hero
├── Problem
├── Pillars
├── Comparison
├── Screenshots
├── How It Works
├── Value Strip
├── FAQ
├── Contact
│
└── Footer
```

Each section is implemented as an independent component, keeping the page easier to maintain and extend.

---

## 🖥 Main Sections

### Hero

Introduces Tracker and communicates the main product value proposition.

### Problem

Explains the problem the product is designed to address.

### Pillars

Presents the core capabilities and benefits of the product.

### Comparison

Provides a structured comparison to communicate Tracker's approach and value.

### Screenshots

Displays product interface previews through an interactive screenshot section.

### How It Works

Explains the product workflow in a step-by-step format.

### FAQ

Uses an accordion-based interface to answer common product questions.

### Contact

Provides a validated contact and demo-request experience with server-side email delivery.

---

## 📝 Contact Flow

The contact system combines frontend validation with server-side processing.

```text
User
  │
  ▼
Contact Form
  │
  ▼
React Hook Form
  │
  ▼
Zod Validation
  │
  ▼
Server
  │
  ├── Rate Limit
  │
  └── Email Delivery
          │
          ▼
      Gmail SMTP
```

This prevents the contact experience from being purely visual and gives the landing page a functional server-side workflow.

---

## 🧪 Testing

The project includes automated testing with **Vitest**.

Run the test suite with:

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

---

## 📸 Screenshot Pipeline

A Playwright-based screenshot workflow is included for capturing Tracker product screens.

Run:

```bash
npm run screens
```

Generated screenshots are stored under:

```text
public/screenshots/
```

This makes it easier to keep the landing page's product previews synchronized with the actual Tracker interface.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/fatihemreyuce/trackerbrand.git
cd trackerbrand
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create:

```text
.env.local
```

Configure the required environment variables for the contact system.

Example:

```env
GMAIL_SMTP_USER=
GMAIL_SMTP_APP_PASSWORD=
DEMO_REQUEST_TO=
NEXT_PUBLIC_SITE_URL=
```

> Never commit SMTP passwords, private keys, or other credentials to the repository.

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 📜 Available Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm test` | Run Vitest tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Run ESLint |
| `npm run screens` | Capture product screenshots |
| `npm run format` | Format the codebase with Prettier |

---

## 🚢 Deployment

The application can be deployed to platforms supporting Next.js applications.

Before deploying, configure the required environment variables for the contact system and public site URL.

A production build can be created with:

```bash
npm run build
```

and started with:

```bash
npm start
```

---

## 🎯 Project Goals

Tracker Landing was developed with a focus on:

- building a polished product marketing experience,
- maintaining reusable frontend components,
- creating responsive layouts across screen sizes,
- implementing validated user interactions,
- integrating server-side functionality into a Next.js application,
- maintaining automated testing and visual workflows.

---

## 👤 Author

### Fatih Emre Yüce

**Software Engineering Student · Full-Stack Developer**

[GitHub](https://github.com/fatihemreyuce)
