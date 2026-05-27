# Techno Smart 🚀

A comprehensive full-stack e-commerce platform built with modern web technologies. This project features a dynamic product catalog, an integrated blog system, secure user authentication, client-side state management, and a seamless checkout process.

## ✨ Features

- **🛍️ E-commerce Catalog:** Browse products, categories, and brands dynamically fetched from the CMS.
- **📝 Integrated Blog:** Fully functional blog system with categories and authors to drive content marketing.
- **🔐 Secure Authentication:** Seamless user login and registration powered by Clerk.
- **🛒 Shopping Cart & Wishlist:** Persistent client-side state management using Zustand and Local Storage.
- **💳 Payment Integration:** Secure checkout and automated order management using Stripe webhooks.
- **⚡ Modern UI/UX:** Responsive, accessible components built with Radix UI, styled with Tailwind CSS, and enhanced with Framer Motion micro-animations.
- **⚙️ Headless CMS:** Content management for products, blogs, and site structure powered by Sanity.

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router, Server Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Radix UI
- **Animations:** Framer Motion
- **State Management:** Zustand
- **Authentication:** Clerk
- **CMS:** Sanity
- **Payments:** Stripe
- **Notifications:** React Hot Toast

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn or pnpm or bun

### 1. Clone the repository

```bash
git clone https://github.com/SnowAceAlex/techno-smart.git
cd techno-smart
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Environment Variables

Create a `.env.local` file in the root directory and add the necessary environment variables for Clerk, Sanity, and Stripe:

```env
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_READ_TOKEN=

# Stripe Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

### 4. Run Sanity Typegen

Generate TypeScript definitions for your Sanity schema:

```bash
npm run typegen
```

### 5. Start the development server

```bash
npm run dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.
- Open [http://localhost:3000/studio](http://localhost:3000/studio) to access the Sanity CMS Studio.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have any improvements or suggestions.

## 📄 License

This project is open-source and available under the MIT License.
