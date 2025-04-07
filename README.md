# Real-Time Google Docs Clone

This project is a real-time Google Docs clone built with **Next.js**, **React**, and **Tailwind CSS**, allowing multiple users to collaborate and edit documents in real time. The project showcases advanced web development skills, including real-time synchronization, user authentication, and responsive UI design.

## Live Demo

You can check out the live version of the project here: [**google-docs**](https://google-doc-rosy.vercel.app/)

## Features

- **Real-Time Collaboration**: Multiple users can edit the document simultaneously, and changes are instantly reflected for all users.
- **User Authentication**: Secure user authentication using **Clerk** ensures that only authorized users can access and edit documents.
- **Responsive UI**: Built with **Tailwind CSS** to ensure the application works seamlessly across all screen sizes and devices.
- **Document Sharing**: Share documents with other users by sending them the document link.
- **Autosave**: All changes are automatically saved, so users never lose their progress.
- **Cloud Backend**: The application uses **Convex** for real-time data handling and database management.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Authentication**: Clerk
- **Real-Time Collaboration**: Liveblocks
- **Backend**: Convex (for real-time data synchronization and database)
- **Deployment**: Vercel

## Installation

Clone this repository and install the dependencies:

```bash
git clone https://github.com/ShahwaizZahid/Google-Doc
cd google-docs-clone
npm install
```

### Environment Variables

You'll need to configure the following environment variables for authentication and backend services:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= <your_clerk_publishable_key>
NEXT_PUBLIC_CONVEX_URL= <next_public_convex_url>
CONVEX_DEPLOYMENT= <convex_deployment>
CLERK_SECRET_KEY= <clerk_secret_key>
LIVEBLOCKS_SECERT_KEY= <liveblocks_secert_key>
```

## Usage

1. To run the application locally:
2. Start the Convex server:

```bash
npm run dev
npx convex dev
```

Visit http://localhost:3000 in your browser to view the app.
