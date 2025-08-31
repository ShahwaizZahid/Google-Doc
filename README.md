# 📝 Real-Time Google Docs Clone

A feature-rich, real-time collaborative document editor built with modern web technologies. This project replicates the core functionality of Google Docs, enabling multiple users to collaborate seamlessly on documents with real-time synchronization, advanced text editing capabilities, and comprehensive sharing features.

![Google Docs Clone](https://img.shields.io/badge/Next.js-15.0.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0--rc-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🚀 Live Demo

Experience the application live: [**Google Docs Clone**](https://google-doc-rosy.vercel.app/)

## ✨ Key Features

### 🤝 Real-Time Collaboration

- **Multi-user editing**: Multiple users can edit documents simultaneously
- **Live cursors**: See other users' cursors and selections in real-time
- **Instant synchronization**: Changes are reflected immediately across all connected clients
- **Conflict resolution**: Automatic handling of concurrent edits

### 🔐 Authentication & Security

- **Secure authentication** via Clerk with multiple sign-in options
- **Organization support**: Create and manage documents within organizations
- **Permission-based access**: Control who can view or edit documents
- **Session management**: Secure user sessions with automatic token refresh

### 📄 Advanced Document Features

- **Rich text editing** powered by TipTap editor
- **Document templates**: Pre-designed templates for quick document creation
- **Auto-save functionality**: Never lose your work with automatic saving
- **Document search**: Find documents quickly with full-text search
- **Version history**: Track changes and document evolution

### 🎨 Rich Text Editor Capabilities

- **Text formatting**: Bold, italic, underline, strikethrough
- **Headings**: Multiple heading levels with proper hierarchy
- **Lists**: Ordered and unordered lists with nesting
- **Tables**: Create and edit tables with resizable columns
- **Links**: Insert and manage hyperlinks
- **Images**: Upload and embed images with resizing capabilities
- **Text alignment**: Left, center, right, and justify alignment
- **Color customization**: Text and highlight colors
- **Font families**: Multiple font options
- **Task lists**: Interactive checkboxes for to-do items

### 🔗 Sharing & Collaboration

- **Document sharing**: Share documents via email invitations
- **Permission levels**: Read-only or edit access for shared users
- **Share tokens**: Secure, time-limited access tokens
- **Public sharing**: Generate shareable links for broader access

### 📱 User Experience

- **Responsive design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light themes**: Toggle between themes for comfortable viewing
- **Intuitive UI**: Clean, Google Docs-inspired interface
- **Keyboard shortcuts**: Efficient editing with familiar shortcuts
- **Real-time presence**: See who's currently viewing/editing documents

## 🛠️ Tech Stack

### Frontend

- **[Next.js 15.0.3](https://nextjs.org/)** - React framework with App Router
- **[React 19.0.0-rc](https://react.dev/)** - UI library with latest features
- **[TypeScript 5.0](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS 3.4.1](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives

### Real-Time & Collaboration

- **[Liveblocks](https://liveblocks.io/)** - Real-time collaboration infrastructure
- **[TipTap](https://tiptap.dev/)** - Headless rich-text editor
- **[Y.js](https://github.com/yjs/yjs)** - Conflict-free replicated data types (CRDTs)

### Backend & Database

- **[Convex](https://www.convex.dev/)** - Real-time backend with automatic scaling
- **[Clerk](https://clerk.com/)** - Authentication and user management

### UI Components & Styling

- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[Zustand](https://zustand-demo.pmnd.rs/)** - State management

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[Vercel](https://vercel.com/)** - Deployment platform

## 📦 Installation & Setup

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm package manager
- Git for version control

### 1. Clone the Repository

```bash
git clone https://github.com/ShahwaizZahid/Google-Doc.git
cd Google-Doc
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory and add the following environment variables:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Convex Backend
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url
CONVEX_DEPLOYMENT=your_convex_deployment_id

# Liveblocks Real-time Collaboration
LIVEBLOCKS_SECRET_KEY=your_liveblocks_secret_key
```

### 4. Set Up Services

#### Clerk Authentication

1. Create an account at [Clerk](https://clerk.com/)
2. Create a new application
3. Copy the publishable key and secret key to your `.env.local`
4. Configure sign-in/sign-up options in the Clerk dashboard

#### Convex Backend

1. Install Convex CLI: `npm install -g convex`
2. Create account at [Convex](https://www.convex.dev/)
3. Initialize Convex: `npx convex dev`
4. Follow the setup prompts to link your project

#### Liveblocks Collaboration

1. Create an account at [Liveblocks](https://liveblocks.io/)
2. Create a new project
3. Copy the secret key to your `.env.local`

### 5. Run the Development Server

```bash
# Start the Next.js development server
npm run dev

# In a separate terminal, start Convex
npx convex dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application running.

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com/)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push to main branch

### Manual Deployment

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## 📁 Project Structure

```
Google-Doc/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (home)/                   # Home page group
│   │   │   ├── document-menu.tsx     # Document context menu
│   │   │   ├── document-row.tsx      # Document list item
│   │   │   ├── documents-table.tsx   # Documents table view
│   │   │   ├── navbar.tsx            # Home navigation
│   │   │   ├── page.tsx              # Home page
│   │   │   ├── search-input.tsx      # Document search
│   │   │   └── templates-gallery.tsx # Document templates
│   │   ├── api/                      # API routes
│   │   │   ├── liveblocks-auth/      # Liveblocks authentication
│   │   │   └── ownerAuth/            # Owner authentication
│   │   ├── documents/                # Document pages
│   │   │   ├── [documentId]/         # Dynamic document routes
│   │   │   │   ├── action.ts         # Document actions
│   │   │   │   ├── avatars.tsx       # User avatars
│   │   │   │   ├── document-input.tsx # Document title input
│   │   │   │   ├── document.tsx      # Document component
│   │   │   │   ├── editor.tsx        # TipTap editor
│   │   │   │   ├── inbox.tsx         # Comments inbox
│   │   │   │   ├── navbar.tsx        # Document navigation
│   │   │   │   ├── page.tsx          # Document page
│   │   │   │   ├── room.tsx          # Liveblocks room
│   │   │   │   ├── ruler.tsx         # Document ruler
│   │   │   │   ├── threads.tsx       # Comment threads
│   │   │   │   └── toolbar.tsx       # Editor toolbar
│   │   │   └── page.tsx              # Documents listing
│   │   ├── globals.css               # Global styles
│   │   └── layout.tsx                # Root layout
│   ├── components/                   # Reusable components
│   │   ├── ui/                       # UI components (Radix UI)
│   │   ├── convex-client-provider.tsx # Convex provider
│   │   ├── fullscreen-loader.tsx     # Loading component
│   │   ├── remove-dialog.tsx         # Delete confirmation
│   │   ├── rename-dialog.tsx         # Rename dialog
│   │   ├── share-dialog.tsx          # Share dialog
│   │   └── tooltip.tsx               # Custom tooltip
│   ├── constants/                    # App constants
│   ├── extensions/                   # TipTap extensions
│   ├── hooks/                        # Custom React hooks
│   ├── lib/                          # Utility functions
│   ├── store/                        # Zustand stores
│   └── middleware.ts                 # Next.js middleware
├── convex/                           # Convex backend
│   ├── _generated/                   # Generated files
│   ├── auth.config.ts                # Auth configuration
│   ├── documents.ts                  # Document mutations/queries
│   └── schema.ts                     # Database schema
├── public/                           # Static assets
│   ├── template-images/              # Template thumbnails
│   └── *.svg                         # Icon files
├── liveblocks.config.ts              # Liveblocks configuration
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind configuration
└── tsconfig.json                     # TypeScript configuration
```

## 🔧 Configuration Files

### Database Schema (Convex)

The application uses two main tables:

- **documents**: Store document metadata, ownership, and organization info
- **documentShares**: Manage document sharing permissions and tokens

### Liveblocks Configuration

Defines TypeScript types for real-time collaboration:

- **Presence**: User cursor positions and selections
- **Storage**: Document margins and layout settings
- **UserMeta**: User information (name, avatar, color)
- **ThreadMetadata**: Comment thread positioning

## 🎯 Usage Guide

### Creating Documents

1. **From Templates**: Choose from pre-designed templates on the home page
2. **Blank Document**: Start with an empty document
3. **Import**: Upload existing documents (future feature)

### Editing Features

- **Text Formatting**: Use the toolbar or keyboard shortcuts
- **Tables**: Insert tables and resize columns by dragging
- **Images**: Upload images and resize them within the document
- **Lists**: Create numbered or bulleted lists with nesting
- **Links**: Add hyperlinks to text selections

### Collaboration

- **Real-time Editing**: See changes from other users instantly
- **Comments**: Add comments and reply to discussions
- **Presence Indicators**: View who's currently editing
- **Cursor Tracking**: See other users' cursor positions

### Sharing Documents

1. Click the "Share" button in the document toolbar
2. Enter email addresses of collaborators
3. Set permissions (view or edit)
4. Send invitations or copy shareable links

### Keyboard Shortcuts

- **Ctrl/Cmd + B**: Bold text
- **Ctrl/Cmd + I**: Italic text
- **Ctrl/Cmd + U**: Underline text
- **Ctrl/Cmd + K**: Insert link
- **Ctrl/Cmd + Z**: Undo
- **Ctrl/Cmd + Y**: Redo
- **Ctrl/Cmd + S**: Save (auto-save is enabled)

## 🧪 Testing

### Running Tests

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Testing Strategy

- **Unit Tests**: Component and utility function testing
- **Integration Tests**: API route and database operation testing
- **E2E Tests**: Full user workflow testing with Playwright
- **Real-time Tests**: Collaboration feature testing

## 🔍 Troubleshooting

### Common Issues

#### Environment Variables Not Loading

```bash
# Ensure .env.local is in the root directory
# Restart the development server after adding variables
npm run dev
```

#### Convex Connection Issues

```bash
# Reinitialize Convex
npx convex dev --reset
```

#### Liveblocks Authentication Errors

- Verify your secret key in the environment variables
- Check that the key has the correct permissions in Liveblocks dashboard

#### Build Errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Performance Optimization

- **Image Optimization**: Images are automatically optimized by Next.js
- **Code Splitting**: Components are lazy-loaded for better performance
- **Caching**: Convex provides automatic caching for database queries
- **Bundle Analysis**: Use `npm run analyze` to analyze bundle size

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write tests for new features
- Update documentation for significant changes
- Follow conventional commit messages

### Code Style

- Use functional components with hooks
- Implement proper error boundaries
- Follow accessibility guidelines (WCAG 2.1)
- Use semantic HTML elements
- Implement proper loading states

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Vercel](https://vercel.com/)** for hosting and deployment
- **[Clerk](https://clerk.com/)** for authentication services
- **[Convex](https://www.convex.dev/)** for real-time backend
- **[Liveblocks](https://liveblocks.io/)** for collaboration features
- **[TipTap](https://tiptap.dev/)** for the rich text editor
- **[Radix UI](https://www.radix-ui.com/)** for accessible components

## 📞 Support

If you encounter any issues or have questions:

1. **Check the [Issues](https://github.com/ShahwaizZahid/Google-Doc/issues)** page
2. **Create a new issue** with detailed information
3. **Join our community** discussions
4. **Contact the maintainer**: [Shahwaiz Zahid](https://github.com/ShahwaizZahid)

## 🔮 Future Enhancements

- [ ] **Offline Support**: Work on documents without internet connection
- [ ] **Advanced Permissions**: Role-based access control
- [ ] **Document History**: Version control and change tracking
- [ ] **Export Options**: PDF, Word, and other format exports
- [ ] **Advanced Search**: Full-text search across all documents
- [ ] **Mobile App**: Native mobile applications
- [ ] **API Integration**: Third-party service integrations
- [ ] **Advanced Analytics**: Document usage and collaboration metrics

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/ShahwaizZahid">Shahwaiz Zahid</a></p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
