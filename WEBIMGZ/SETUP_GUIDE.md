# Election Education App - Setup Guide

## Getting Started

This is a Next.js election education app with Antigravity UI that provides interactive learning about elections with AI-powered features.

### Prerequisites

- Node.js 18+
- npm or yarn
- Anthropic API key (for Claude AI features)

### Installation & Setup

1. **Clone or navigate to the project:**
   ```bash
   cd WEBIMGZ
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env.local`
   - Add your Anthropic API key:
     ```
     ANTHROPIC_API_KEY=your_api_key_here
     ```
   - Get your API key from [Anthropic Console](https://console.anthropic.com)

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open browser:**
   - Navigate to `http://localhost:3000`

### Features

#### Overview Tab
- **Hero Section** - Explanation of what elections are
- **Interactive Timeline** - 6-stage election process (Voter Registration → Campaigning → Voting Day → Vote Counting → Results → Inauguration)
- **Clickable Stages** - Each stage expands with explanations
- **Country Selector** - Choose between India, USA, and UK to see localized content

#### Process Tab
- **Step-by-Step Breakdown** - 6 numbered steps of the election process
- **Step Details** - Title, description, and estimated duration for each step
- **Progress Indicator** - Visual bar showing your position
- **AI Explanations** - Click "Learn More with AI" to get Claude-powered detailed explanations

#### Voting Tab
- **How-to-Vote Guide** - 3 sections covering:
  - Voter registration checklist
  - What to bring on voting day
  - Step-by-step voting process
- **FAQ Section** - 6 pre-answered common voting questions
- **Interactive Q&A Chatbot** - Ask the Claude-powered election assistant any questions about voting and elections

#### Results Tab
- **Glossary** - 8 election terms with definitions (expandable):
  - Ballot, Constituency, Electoral College, FPTP, Proportional Representation, Polling Station, Voter Turnout, Mandate
- **Quiz** - 5 multiple-choice questions to test knowledge
  - Score display
  - Detailed answers for each question
  - "Try Again" button to retake

### Technology Stack

- **Framework:** Next.js 16.2.4 with App Router
- **UI Library:** React 19.2.4
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion 12
- **Icons:** Lucide React 1
- **AI:** Anthropic Claude API (Sonnet 4)

### API Integration

#### Claude API Route
- **Endpoint:** `POST /api/claude`
- **Request Body:**
  ```json
  {
    "message": "user question",
    "systemPrompt": "optional system prompt"
  }
  ```
- **Model:** claude-sonnet-4-20250514
- **Max Tokens:** 1000
- **Response:** JSON with message field containing Claude's response

### Responsive Design

- ✅ Mobile-first approach
- ✅ Hamburger menu on mobile (< 768px)
- ✅ Full navigation on desktop
- ✅ Touch-friendly buttons and inputs
- ✅ Optimized text and spacing for all screen sizes

### Customization

#### Adding Countries
Update the `COUNTRIES` array in [OverviewTab.tsx](src/components/tabs/OverviewTab.tsx):
```typescript
const COUNTRIES = [
  { name: "Country Name", flag: "🏳️" },
  // ... more countries
];
```

#### Modifying Quiz Questions
Edit the `QUIZ_QUESTIONS` array in [ResultsTab.tsx](src/components/tabs/ResultsTab.tsx)

#### Adjusting System Prompts
Update the `systemPrompt` in the fetch calls within each tab component

### Deployment

```bash
npm run build
npm start
```

Deploy to Vercel:
```bash
vercel
```

Make sure to set the `ANTHROPIC_API_KEY` environment variable in your deployment platform.

### Troubleshooting

**Claude API errors:**
- Verify your API key is correct in `.env.local`
- Check API key has sufficient quota
- Ensure environment variables are loaded: restart dev server after changing `.env.local`

**Quiz not working:**
- Clear browser cache
- Check browser console for errors
- Ensure JavaScript is enabled

**Mobile menu not appearing:**
- Check viewport width is < 768px
- Clear cache and refresh

### Project Structure

```
src/
├── app/
│   ├── api/claude/route.ts       # Claude API endpoint
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout with TabProvider
│   └── page.tsx                  # Main page
├── components/
│   ├── Navbar.tsx                # Navigation with active tab highlight
│   ├── PageContent.tsx           # Tab router component
│   ├── tabs/
│   │   ├── OverviewTab.tsx       # Overview with timeline
│   │   ├── ProcessTab.tsx        # Process with AI explanations
│   │   ├── VotingTab.tsx         # Voting guide + Q&A chatbot
│   │   └── ResultsTab.tsx        # Results glossary + quiz
│   ├── CanvasSequence.tsx        # Canvas animation
│   └── ScrollSections.tsx        # Scroll sections
├── context/
│   └── TabContext.tsx            # Tab state management
└── lib/
    └── utils.ts                  # Utility functions
```

### Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance Notes

- All tab content renders client-side without page reloads
- Claude API calls are debounced in quiz and process tabs
- Images are lazy-loaded in CanvasSequence
- Animations use GPU-accelerated properties

### License

This project is for educational purposes.

### Support

For issues or questions:
1. Check the troubleshooting section above
2. Review browser console for errors
3. Verify API key and environment setup
4. Check network tab for failed API calls
