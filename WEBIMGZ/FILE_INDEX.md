# Project File Index & Documentation

## 📋 Documentation Files

| File | Purpose |
|------|---------|
| `QUICKSTART.md` | ⚡ Start here! Quick setup and testing guide |
| `SETUP_GUIDE.md` | 🔧 Detailed setup, deployment, and customization |
| `FEATURES.md` | ✨ Complete feature list and implementation details |
| `CLAUDE.md` | 📝 Claude-specific information (auto-generated) |
| `README.md` | 📖 Project overview |
| `.env.example` | 🔐 Environment variables template |

---

## 🎨 Core Components

### Main Entry Points

| File | Type | Purpose |
|------|------|---------|
| `src/app/page.tsx` | Page | Main page that renders PageContent |
| `src/app/layout.tsx` | Layout | Root layout with TabProvider wrapper |
| `src/components/Navbar.tsx` | Component | Navigation bar with active tab highlighting & mobile menu |
| `src/components/PageContent.tsx` | Component | Tab router - renders correct tab based on activeTab |

### Tab Components (User-Facing)

| File | Purpose | Features |
|------|---------|----------|
| `src/components/tabs/OverviewTab.tsx` | Overview page | Timeline, country selector, hero section |
| `src/components/tabs/ProcessTab.tsx` | Process page | Step-by-step guide with Claude AI explanations |
| `src/components/tabs/VotingTab.tsx` | Voting page | How-to guide, FAQ, Q&A chatbot |
| `src/components/tabs/ResultsTab.tsx` | Results page | Glossary, quiz, score calculator |

### Utility Components

| File | Purpose |
|------|---------|
| `src/components/CanvasSequence.tsx` | Canvas animation (scroll-driven frame sequence) |
| `src/components/ScrollSections.tsx` | Scroll-triggered animation sections |

---

## 🧠 State Management

| File | Purpose | Exports |
|------|---------|---------|
| `src/context/TabContext.tsx` | Global tab state & country selection | TabProvider, useTab hook |

---

## 🔌 API Routes

| Path | Method | Purpose |
|------|--------|---------|
| `src/app/api/claude/route.ts` | POST | Claude API endpoint for AI features |

**Endpoint Details:**
- **Request:** `{ message: string, systemPrompt?: string }`
- **Response:** `{ message: string }`
- **Model:** claude-sonnet-4-20250514
- **Max Tokens:** 1000

---

## 🎯 Feature Locations Quick Reference

### Overview Tab Features
- **Timeline:** Lines 38-47 in OverviewTab.tsx
- **Country Selector:** Lines 62-77 in OverviewTab.tsx
- **Timeline Rendering:** Lines 85-139 in OverviewTab.tsx

### Process Tab Features
- **Steps Data:** Lines 11-37 in ProcessTab.tsx
- **Learn More Handler:** Lines 44-100 in ProcessTab.tsx
- **Step Selection:** Lines 127-167 in ProcessTab.tsx

### Voting Tab Features
- **How-to-Vote Sections:** Lines 14-48 in VotingTab.tsx
- **FAQ Data:** Lines 50-61 in VotingTab.tsx
- **Chatbot Component:** Lines 170-193 in VotingTab.tsx
- **Message Handler:** Lines 88-140 in VotingTab.tsx

### Results Tab Features
- **Glossary Terms:** Lines 7-33 in ResultsTab.tsx
- **Quiz Questions:** Lines 35-77 in ResultsTab.tsx
- **Quiz Handler:** Lines 95-107 in ResultsTab.tsx
- **Score Calculation:** Line 112 in ResultsTab.tsx

---

## 📦 Dependencies

### Framework & Runtime
- `next@16.2.4` - React framework
- `react@19.2.4` - UI library
- `react-dom@19.2.4` - React DOM

### Styling & UI
- `tailwindcss@4` - Utility CSS framework
- `@tailwindcss/postcss@4` - PostCSS plugin
- `clsx@2.1.1` - Class name utility
- `tailwind-merge@3.5.0` - Tailwind merge utility

### Animations
- `framer-motion@12.38.0` - Motion/animation library

### Icons
- `lucide-react@1.14.0` - Icon library

### Build Tools
- `typescript@5` - TypeScript
- `eslint@9` - Linter
- `eslint-config-next@16.2.4` - Next.js ESLint config

---

## 🔐 Environment Variables

```bash
ANTHROPIC_API_KEY=<your-api-key>
```

**Importance:** REQUIRED for Claude API features
- "Learn More" buttons in Process tab
- Q&A chatbot in Voting tab

---

## 🎨 Styling Reference

### Colors
- Primary: `#0050FF` (Blue)
- Secondary: `#00D6FF` (Cyan)
- Background: `#050505` (Dark)
- Text: `#FFFFFF` (White)
- Text Muted: `#FFFFFF/70` (White with 70% opacity)

### Breakpoints (Tailwind)
- Mobile: < 640px (sm)
- Tablet: 640px - 1024px (md)
- Desktop: 1024px+ (lg)

### Common Classes
- `backdrop-blur-xl` - Glass morphism
- `shadow-[0_0_20px_rgba(0,80,255,0.5)]` - Blue glow
- `transition-all` - Smooth transitions
- `rounded-2xl` - Large border radius
- `border border-white/10` - Subtle border

---

## 🚀 Development Workflow

### Running Locally
```bash
npm install
cp .env.example .env.local
# Edit .env.local with your API key
npm run dev
```

### Building
```bash
npm run build  # Creates optimized production build
npm start      # Runs production build
```

### Linting
```bash
npm run lint   # Run ESLint
```

### File Naming Conventions
- Components: PascalCase (e.g., `OverviewTab.tsx`)
- Folders: lowercase (e.g., `components/tabs/`)
- Constants: UPPER_SNAKE_CASE (e.g., `TIMELINE_STAGES`)

---

## 📱 Responsive Breakpoints in Use

- `hidden md:flex` - Hidden on mobile, visible on desktop
- `md:px-20` - More padding on desktop
- `text-4xl md:text-6xl` - Smaller on mobile, larger on desktop
- `md:grid-cols-3` - Single column on mobile, 3 columns on desktop

---

## 🧪 Testing Checklist

### Unit Testing (if needed)
- Create `__tests__` folder in each component directory
- Use Jest and React Testing Library
- Test: Tab switching, API calls, form submissions

### Manual Testing
- **Desktop:** Chrome, Firefox, Safari
- **Mobile:** iPhone, Android
- **Features:** All buttons, animations, API calls
- **Accessibility:** Keyboard navigation, screen reader

---

## 🔍 Important Code Patterns

### Using Tab Context
```typescript
import { useTab } from "@/context/TabContext";

export default function MyComponent() {
  const { activeTab, setActiveTab, selectedCountry } = useTab();
  
  // Use context values
  return <div>{activeTab}</div>;
}
```

### Calling Claude API
```typescript
const response = await fetch("/api/claude", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    message: "User input",
    systemPrompt: "Optional custom prompt",
  }),
});
const data = await response.json();
console.log(data.message); // Claude's response
```

### Framer Motion Animations
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

---

## 📊 Code Statistics

- **React Components:** 9 (Navbar, PageContent, OverviewTab, ProcessTab, VotingTab, ResultsTab, + 2 utility)
- **API Routes:** 1 (Claude endpoint)
- **Context Providers:** 1 (TabContext)
- **Total Lines of Code:** ~2000+
- **Tab Features:** 15+ (timeline, country selector, chatbot, quiz, glossary, etc.)

---

## 🚀 Performance Optimization

**Already Optimized:**
- ✅ Client-side routing (no page reloads)
- ✅ Code splitting by tab components
- ✅ Image lazy loading in CanvasSequence
- ✅ GPU-accelerated animations
- ✅ Debounced scroll events

**Recommendations:**
- Consider adding React.memo for tab components
- Cache Claude responses using React Query
- Implement PWA for offline functionality

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Module not found" errors | Run `npm install`, check file paths |
| Claude API errors | Verify `.env.local`, restart dev server |
| Animations lag | Reduce animation complexity, check browser performance |
| Mobile menu not working | Check viewport width, clear cache |
| API costs high | Reduce "Learn More" clicks, cache responses |

---

## 📚 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Anthropic API Docs](https://docs.anthropic.com)

---

## 📝 Code Locations for Customization

### Edit Election Content
- Stages: `src/components/tabs/OverviewTab.tsx` line 38
- Steps: `src/components/tabs/ProcessTab.tsx` line 11
- FAQ: `src/components/tabs/VotingTab.tsx` line 50
- Glossary: `src/components/tabs/ResultsTab.tsx` line 7
- Quiz: `src/components/tabs/ResultsTab.tsx` line 35

### Edit Colors & Styling
- Global styles: `src/app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component styles: Individual `.tsx` files

### Edit System Prompts
- Search for `systemPrompt` in any tab component
- Three instances total (ProcessTab and VotingTab)
- Modify the string values to customize AI behavior

---

## 🎓 Next Steps

1. ✅ Start with `QUICKSTART.md`
2. ✅ Run the app locally
3. ✅ Test all features
4. ✅ Customize content for your needs
5. ✅ Deploy to Vercel or your preferred platform

---

**Last Updated:** May 3, 2026
**Status:** ✅ Production Ready
