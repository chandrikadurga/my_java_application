# 🎨 UI/UX Guide & Visual Components

## 🌈 Color Scheme

### Light Mode (Default)
```
Primary: #FF6B9D (Pink) - CTA, highlights
Secondary: #FFA502 (Orange) - Secondary actions
Accent: #00D4FF (Cyan) - Alternate highlights
Background: Gradient from purple → pink → blue
Text: Dark gray (#1A1A2E)
```

### Dark Mode
```
Primary: #FF6B9D (Pink) - Same
Background: Dark gradient gray-900 → gray-800
Text: Light gray/white
Cards: Dark gray with subtle borders
```

---

## 📱 Layout Structure

### Desktop View (>= 1024px)
```
┌─────────────────────────────────────────────┐
│  🌙 [Menu]     Header        [⚙️ Settings]  │
├──────────────────────────────────────────────┤
│  ┌─────────────┐  ┌──────────────────────┐  │
│  │   FORM      │  │  SUMMARY & STATS     │  │
│  │  (Sticky)   │  ├──────────────────────┤  │
│  │             │  │  LIST OF ENTRIES     │  │
│  │  ┌────────┐ │  │  (Sorted by Calories)│  │
│  │  │ +Input │ │  │                      │  │
│  │  │ +Type  │ │  │  [Card] [Card]       │  │
│  │  │ +Scoop │ │  │  [Card] [Card]       │  │
│  │  │ +Prev  │ │  │  [Card]              │  │
│  │  │ +Btn   │ │  └──────────────────────┘  │
│  │  └────────┘ │                             │
│  └─────────────┘                             │
└──────────────────────────────────────────────┘
```

### Mobile View (< 768px)
```
┌──────────────────────┐
│ 🌙  Header      [☰]  │
├──────────────────────┤
│  FORM (Full Width)   │
│  ┌────────────────┐  │
│  │ Name Input     │  │
│  │ Type Dropdown  │  │
│  │ Scoop Counter  │  │
│  │ Calorie Preview│  │
│  │ Add Button     │  │
│  └────────────────┘  │
├──────────────────────┤
│ SUMMARY & STATS      │
│ ┌────────────────┐   │
│ │ Total: 1250    │   │
│ │ Daily Bar      │   │
│ │ Type Breakdown │   │
│ └────────────────┘   │
├──────────────────────┤
│ LIST (Scrollable)    │
│ [Card]               │
│ [Card]               │
│ [Card]               │
└──────────────────────┘
```

---

## 🎯 Component Details

### 1. Header Section
```
┌─────────────────────────────────────────────────────┐
│ 🌙 (Dark Mode Toggle)    🍦 IceCream Calorie       │
│                          Tracker                    │
│                                                     │
│                 Track your ice cream                │
│                 calories and stay healthy!         │
└─────────────────────────────────────────────────────┘
```

**Features**:
- Logo/Title in center
- Gradient text effect
- Dark mode toggle (top-left)
- Tagline below title
- Responsive text size

---

### 2. Ice Cream Form Component

```
┌─────────────────────────────────┐
│  ➕ New Entry                   │
├─────────────────────────────────┤
│                                 │
│  Ice Cream Name                 │
│  ┌──────────────────────────┐   │
│  │ e.g., Vanilla, Chocolate │   │
│  └──────────────────────────┘   │
│  [###############] 15/50        │
│                                 │
│  Type                           │
│  ┌──────────────────────────┐   │
│  │ 🍦 Cone - 120 kcal/sco...│   │
│  │ 🥣 Cup - 100 kcal/scoop  │   │
│  │ 🍨 Sundae - 110 kcal/...  │   │
│  └──────────────────────────┘   │
│                                 │
│  Number of Scoops              │
│  ┌────┐                        │
│  │ - │  [2]  │ + │   │
│  └────┘───────────────┘   │
│                                 │
│  ┌──────────────────────────┐   │
│  │ Estimated Calories:      │   │
│  │        290 kcal          │   │
│  └──────────────────────────┘   │
│                                 │
│  [✅ Add Ice Cream]             │
│  (Loading state: [⏳ Adding...]) │
│                                 │
└─────────────────────────────────┘
```

**Interactions**:
- Input text triggers character count
- Type selector shows emoji + formula
- Scoop +/- buttons update preview
- Preview calculates in real-time
- Button shows loading state

---

### 3. Summary Stats Component

```
┌────────────────────────────────────────────────────┐
│                                                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────┐ │
│  │  TOTAL       │  │  TOTAL       │  │ AVERAGE  │ │
│  │  CALORIES    │  │  ENTRIES     │  │ CALORIES │ │
│  │    1250      │  │      5       │  │   250    │ │
│  │    kcal      │  │  ice creams  │  │ per item │ │
│  └──────────────┘  └──────────────┘  └──────────┘ │
│                                                    │
├────────────────────────────────────────────────────┤
│                                                    │
│  Daily Limit Progress                             │
│  ┌────────────────────────────────────────────┐   │
│  │ 1250 / 2000 kcal            ⚠️ Heavy       │   │
│  │ ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░ 62%         │   │
│  │                                             │   │
│  │ ✅ 750 kcal remaining                       │   │
│  └────────────────────────────────────────────┘   │
│                                                    │
├────────────────────────────────────────────────────┤
│  Type Breakdown                                   │
│                                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────┐  │
│  │  🍦 Cones   │  │ 🥣 Cups    │  │ 🍨 Sund  │  │
│  │     2       │  │     2      │  │    1     │  │
│  └─────────────┘  └─────────────┘  └──────────┘  │
│                                                    │
└────────────────────────────────────────────────────┘
```

**Features**:
- 3 key metrics prominently displayed
- Daily limit with color-coded progress bar
- Health status indicator (Light/Moderate/Heavy/Very Heavy)
- Type breakdown with emojis
- Dynamic calculations

---

### 4. Ice Cream Card Component

```
┌──────────────────────────────────┐
│ 🍦 Vanilla         [#1]          │
│     Cone                         │
│                                  │
│  ┌─────────────┐  ┌──────────┐  │
│  │  SCOOPS    │  │ CALORIES │  │
│  │     2      │  │   290    │  │
│  └─────────────┘  └──────────┘  │
│                                  │
│  Calorie Load                    │
│  ▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░   58%│
│                                  │
│  [🗑️ Delete]                     │
│                                  │
└──────────────────────────────────┘
```

**Features**:
- Type emoji (🍦🥣🍨)
- Entry name and type
- Scoops and calories display
- Color-coded progress bar
- Delete button
- Hover effects (scale up, shadow)

**Colors by Calorie Load**:
- < 200 kcal: Green (Low)
- 200-400 kcal: Orange (Medium)
- > 400 kcal: Red (High)

---

### 5. List View

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│ ⚠️ 5 entries    Showing sorted by calories ↓       │
│                                                     │
│ ┌──────────────────┐  ┌──────────────────┐        │
│ │ 🍨 Strawberry    │  │ 🍦 Chocolate Cone│        │
│ │ Sundae           │  │ 3 scoops         │        │
│ │ 3 scoops         │  │ 410 kcal         │        │
│ │ ▓▓▓▓▓▓▓▓░░░░░░   │  │ ▓▓▓▓▓▓░░░░░░░░░  │        │
│ │ [🗑️ Delete]      │  │ [🗑️ Delete]      │        │
│ └──────────────────┘  └──────────────────┘        │
│                                                     │
│ ┌──────────────────┐  ┌──────────────────┐        │
│ │ 🍦 Vanilla Cone  │  │ 🥣 Mint Cup      │        │
│ │ 2 scoops         │  │ 2 scoops         │        │
│ │ 290 kcal         │  │ 200 kcal         │        │
│ │ ▓▓▓▓▓░░░░░░░░░░  │  │ ▓▓▓░░░░░░░░░░░░░ │        │
│ │ [🗑️ Delete]      │  │ [🗑️ Delete]      │        │
│ └──────────────────┘  └──────────────────┘        │
│                                                     │
│ ┌──────────────────┐                               │
│ │ 🍦 Pistachio Cone│                               │
│ │ 1 scoop          │                               │
│ │ 170 kcal         │                               │
│ │ ▓░░░░░░░░░░░░░░░ │                               │
│ │ [🗑️ Delete]      │                               │
│ └──────────────────┘                               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Sorting**: Highest calories first (descending)
**Grid**: 2 columns on desktop, 1 on mobile
**Animations**: Fade in, hover scale up

---

### 6. Empty State

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│                      🍦                             │
│                                                     │
│         No ice creams yet!                         │
│                                                     │
│      Add your first ice cream to get started 🎉   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

### 7. Toast Notifications

```
┌────────────────────────────────────┐
│ 🍦 Added Vanilla - 290 kcal        │  ← Success
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ ❌ Please enter an ice cream name  │  ← Error
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ 🗑️ Vanilla removed                 │  ← Delete
└────────────────────────────────────┘
```

**Duration**: 3 seconds, auto-dismiss
**Position**: Top-right corner
**Animation**: Fade in/out

---

### 8. Loading States

```
Button Loading:
[⏳ Adding...] or [🗑️ Deleting...]

List Loading:
[Loading with spinner animation]

Form Disabled:
All inputs grayed out during submission
```

---

## 🎭 Responsive Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| Mobile | < 640px | Single column, full width |
| Tablet | 640-1024px | 2 columns, stacked |
| Desktop | > 1024px | Original 3-column grid |

---

## ✨ Animation Details

### Hover Effects
- Cards: Scale up 1.05x, shadow gets stronger
- Buttons: Scale 1.05x, color shift
- Links: Color change + underline

### Transitions
- Time: 300ms cubic-bezier(0.4, 0, 0.2, 1)
- Properties: All

### Entrance Animations
- Forms: Fade in + slide down
- Cards: Fade in staggered
- Toasts: Slide in from top-right

### Dark Mode
- Transition: 300ms smooth fade
- All elements update color together

---

## 🌙 Dark Mode Details

### Color Palette Dark Mode

| Element | Light | Dark |
|---------|-------|------|
| Background | Gradient purple-pink-blue | Dark gray 900-800 |
| Text | Gray 900 | White/Gray 100 |
| Cards | White | Gray 800 |
| Borders | Pink 200 | Gray 700 |
| Buttons | Pink 500 | Pink 600 |
| Inputs | White/Pink100 | Gray 700 |

---

## 📊 Typography

### Font Family
- **Family**: Poppins (Google Fonts)
- **Weights**: 300 (light), 400 (normal), 600 (semibold), 700 (bold)

### Sizing
```
Header (H1): 48px (responsive: 36px mobile)
Title (H2): 32px
Subtitle (H3): 24px
Body: 16px
Small: 14px
Tiny: 12px
```

### Line Heights
- Headings: 1.3
- Body: 1.6
- Form: 1.5

---

## 🎨 Spacing System

All values are in pt (padding/margin):
```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
```

---

## 🔘 Button Styles

### Primary Button
```
Background: Gradient pink-500 → purple-500
Text: White, Bold
Padding: 12px 24px
Border Radius: 8px
Hover: Stronger shadow
Active: Scale 0.95x
Disabled: Gray, cursor not-allowed
```

### Secondary Button
```
Background: Gray
Text: Dark
Padding: 8px 16px
Border Radius: 6px
```

---

## 📝 Input Styles

### Text Input
```
Border: 2px pink-200 (light) / gray-600 (dark)
Focus: Border pink-500, box-shadow
Background: White (light) / Gray-700 (dark)
Padding: 12px
Border Radius: 8px
```

### Select Dropdown
```
Same as inputs
Arrow: Native browser
```

---

## 🎯 Accessibility

- ✅ Color contrast: WCAG AA compliant
- ✅ Focus indicators: Visible on all interactive elements
- ✅ Labels: Present on all form inputs
- ✅ Alt text: On emoji descriptions
- ✅ Keyboard: All features keyboard accessible
- ✅ Touch: Buttons sized for mobile (44px minimum)

---

## 📐 Layout Dimensions

### Max Content Width
- Desktop: 1280px
- Container padding: 16px

### Card Sizes
- Desktop: 2-3 columns, auto height
- Mobile: 1 column, min-height: 200px
- Max height: None (content-driven)

---

## 🎬 Animation Timings

| Action | Duration | Easing |
|--------|----------|--------|
| Hover | 300ms | ease-in-out |
| Click | 150ms | ease-out |
| Load | 600ms | ease-in |
| Toast | 3000ms | linear |
| Theme Toggle | 300ms | ease |

---

**UI Built With**: UnoCSS (Utility Classes) + Tailwind Philosophy
**Framework**: React 18
**Responsive**: Mobile-first approach
**Accessibility**: WCAG AA Compliant
**Performance**: CSS optimized, zero layout shifts

---

**Status**: ✅ **Production Ready UI**
