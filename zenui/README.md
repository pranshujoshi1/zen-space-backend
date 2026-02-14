# ZEN SPACE - Mental Health Application

A comprehensive mental wellness application built with React, TypeScript, and Vite.

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Installation & Running

#### Option 1: Automated Scripts (Recommended)
1. **Windows (Batch):** Double-click `start.bat`
2. **Manual:** Open terminal in this directory and run:
   ```bash
   npm install
   npm run dev
   ```

#### Option 2: Manual Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### AI Chatbot Backend

1. From the project root start the Flask server that lives in `bo/`:
   ```bash
   cd bo
   python app.py
   ```
   This exposes `POST /api/chat` on `http://127.0.0.1:5000` and keeps all AI logic in the `bo` service.
2. The Vite dev server automatically proxies `/api/*` requests to `http://127.0.0.1:5000`, so running `npm run dev` in `zenui/` will hit the Flask bot without extra configuration.
3. For production builds or if your API is hosted elsewhere, create a `.env` file inside the `zenui` folder and set the backend URL:
   ```
   VITE_AI_API_URL=https://your-production-domain.com
   ```
   When this variable is present, the UI will call `${VITE_AI_API_URL}/api/chat`. Leave it empty to use same-origin routing.

## 🌟 Features

- **Splash Screen** - Beautiful animated welcome screen
- **Authentication** - Multi-language login/signup system
- **Parent Details** - Comprehensive user onboarding
- **Daily Check-in** - Mood and wellness tracking
- **Dashboard** - Interactive mood charts and insights
- **AI Insights** - Personalized recommendations
- **Meditation Tools** - Guided meditation and journaling
- **Progress Analytics** - Detailed wellness analytics
- **Support Hub** - Resources and help
- **Profile Settings** - User preferences and settings

## 🛠️ Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible components
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **Lucide React** - Icons

## 📁 Project Structure

```
zenui/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── zen-tools/       # Specialized tools
│   └── ...              # Feature components
├── src/                 # Source files
├── styles/              # Global styles
├── dist/                # Built files
└── package.json         # Dependencies
```

## 🎨 Design System

The application uses a custom design system with:
- **Zen Gradient** - Soft, calming background gradients
- **Floating Animations** - Subtle background elements
- **Glass Morphism** - Modern card designs
- **Responsive Design** - Mobile-first approach

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Key Components
- `App.tsx` - Main application component
- `SplashScreen.tsx` - Welcome screen
- `AuthScreen.tsx` - Authentication
- `Dashboard.tsx` - Main dashboard
- `ZenTools.tsx` - Tool collection

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📱 Mobile Support

The application is fully responsive and works on:
- iOS Safari
- Android Chrome
- Progressive Web App (PWA) features

## 🚨 Troubleshooting

### Common Issues

1. **Node.js not found**
   - Download from [nodejs.org](https://nodejs.org)
   - Restart terminal after installation

2. **Dependencies not installing**
   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again

3. **Port 5173 already in use**
   - Kill process using port: `npx kill-port 5173`
   - Or change port in `vite.config.ts`

4. **Build errors**
   - Check TypeScript errors: `npx tsc --noEmit`
   - Ensure all imports are correct

### Getting Help

If you encounter issues:
1. Check the console for error messages
2. Ensure all dependencies are installed
3. Try clearing browser cache
4. Restart the development server

## 📄 License

This project is for educational and personal use.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Made with ❤️ for mental wellness**






