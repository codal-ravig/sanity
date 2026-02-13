# Day One Content Operations

This project is a monorepo containing multiple applications developed while following lessons on [sanity.io/learn](https://www.sanity.io/learn). It focuses on building a content-driven event management system.

## Project Structure

The project is organized as a monorepo using `pnpm` workspaces:

- `apps/studio`: [Sanity Studio](https://www.sanity.io/studio) (v3) for managing content.
- `apps/web`: A [Next.js](https://nextjs.org/) frontend that displays events and event details.
- `apps/tickets`: A custom [Sanity UI](https://www.sanity.io/ui) application for ticket management.

## Applications

### 🎨 Sanity Studio (`apps/studio`)
The central content management hub. It defines the schema and provides a UI for editing:
- **Artists**: Details about performers.
- **Venues**: Locations where events take place.
- **Events**: The core content type, linking artists and venues with dates, ticket links, and more.

### 🌐 Web Frontend (`apps/web`)
A modern frontend built with Next.js and Tailwind CSS.
- **Live Content**: Uses `next-sanity` with Live Content API support for real-time updates.
- **Dynamic Routing**: Automatically generates pages for events based on their Sanity slugs.
- **Responsive Design**: Styled with Tailwind CSS (v4).

### 🎫 Tickets App (`apps/tickets`)
A specialized application built using `@sanity/ui` and `@sanity/sdk-react`. It provides a custom interface for managing or viewing event tickets, demonstrating how to build standalone apps that interact with Sanity data.

## Tech Stack

- **Monorepo Manager**: [pnpm](https://pnpm.io/)
- **CMS**: [Sanity.io](https://www.sanity.io/)
- **Frontend**: [Next.js](https://nextjs.org/), [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Sanity UI](https://www.sanity.io/ui) (for Studio and Tickets app)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or higher)
- [pnpm](https://pnpm.io/) (version 10 or higher)

### Installation

Install dependencies for all applications from the root directory:

```bash
pnpm install
```

### Development

Run all applications in parallel in development mode:

```bash
pnpm dev
```

This will start:
- Sanity Studio: Usually at [http://localhost:3333](http://localhost:3333)
- Next.js Web: Usually at [http://localhost:3000](http://localhost:3000)
- Tickets App: Usually at [http://localhost:3334](http://localhost:3334) (or next available port)

### Build

To build all applications for production:

```bash
pnpm build
```

## License

UNLICENSED
