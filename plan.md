# Fatawa Library — Redesign Execution Plan

> **Instructions for the AI executing this plan:**
> - Execute **one phase at a time**. Stop after each phase and wait for confirmation.
> - When a value is specified (hex, px, rem), use it **exactly** — do not substitute.
> - When you see **DO NOT**, treat it as a hard constraint, not a suggestion.
> - Do not add dark mode, animations beyond what's listed, or features not mentioned.
> - Do not combine phases. Do not refactor code not mentioned in the current phase.

---

## The Design Target

The site should look like this:

- **Background**: warm cream `#FAF7EE`, not white
- **Text**: very dark warm brown-black `#1A1208`, not pure black
- **Accent**: muted brass-gold `#B07D2A`, not yellow, not orange
- **Cards**: light cream `#FFFDF6` with a `2.5px solid #B07D2A` top border
- **Borders**: warm tan `#E2D5B8`
- **Typography**: Georgia for all serif text (headers + body); `system-ui` for labels, nav, badges, metadata
- **Feel**: scholarly, quiet, readable — like a well-printed book, not a modern SaaS app

---

## Complete CSS Variable Reference

These are the **only** custom properties you will define. Do not invent new ones.

```css
:root {
  --bg-page:        #FAF7EE;
  --bg-card:        #FFFDF6;
  --bg-hover:       #F5EDD8;
  --bg-pill:        #F4EBD6;

  --text-primary:   #1A1208;
  --text-secondary: #6B5535;
  --text-muted:     #9C7D55;

  --accent:         #B07D2A;
  --accent-light:   #EDE0C4;

  --border-default: #E2D5B8;

  --font-serif:     Georgia, 'Times New Roman', serif;
  --font-ui:        system-ui, -apple-system, sans-serif;

  --radius-card:    8px;
  --radius-pill:    99px;

  --transition:     0.15s ease-out;
}
```

DO NOT add `--paper`, `--hairline`, `--ink`, or any other variable not in this list.

---

## Phase 1 — CSS Foundation

**Goal**: Replace `src/styles/global.css` with the complete variable system. Nothing else.

### What to do

1. Open `src/styles/global.css`
2. **Delete everything** inside it (keep any `@tailwind` directives if present — put them back at the top)
3. Add the Google Fonts import:
   ```css
   @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
   ```
4. Paste the complete CSS variable block from the reference above
5. Add these base reset rules:
   ```css
   html, body {
     background-color: var(--bg-page);
     color: var(--text-primary);
     font-family: var(--font-serif);
     font-size: 16px;
     line-height: 1.7;
     margin: 0;
     padding: 0;
   }

   * {
     box-sizing: border-box;
   }

   a {
     color: var(--accent);
     text-decoration: none;
   }

   a:hover {
     text-decoration: underline;
   }

   :focus-visible {
     outline: 2px solid var(--accent);
     outline-offset: 2px;
   }
   ```

**DO NOT** modify any component files in this phase.
**DO NOT** add dark mode media queries.
**DO NOT** add any CSS beyond what is listed above.

### Verification
- Run `npm run dev`
- Page background should be cream `#FAF7EE`, not white
- No console errors about undefined CSS variables

---

## Phase 2 — Header & Footer (`src/layouts/Layout.astro`)

**Goal**: Style the site shell. No other files.

### Header spec

```
Height: 52px
Background: var(--bg-page)
Border-bottom: 2px solid var(--accent-light)
Padding: 0 2rem
Layout: flexbox, space-between, center-aligned
```

**Logo** (left side):
- Font: `var(--font-ui)`, `15px`, `font-weight: 400`
- Letter-spacing: `0.04em`
- Color: `var(--text-primary)`
- Add a decorative dot before the name: `width: 8px; height: 8px; background: var(--accent); border-radius: 50%; display: inline-block; margin-right: 8px; vertical-align: middle`

**Nav links** (right side):
- Font: `var(--font-ui)`, `13px`, `font-weight: 400`
- Color default: `var(--text-secondary)`
- Color hover: `var(--accent)`
- Active/current page: `color: var(--accent)` + `border-bottom: 1.5px solid var(--accent)` + `padding-bottom: 2px`
- Gap between links: `1.5rem`
- DO NOT bold nav links
- DO NOT add background colors to nav links on hover

### Footer spec

```
Background: var(--bg-page)
Border-top: 1px solid var(--border-default)
Padding: 2rem
Text: var(--font-ui), 12px, var(--text-muted)
Text-align: center
```

### Verification
- Header visible with cream background and gold underline
- Logo has the gold dot prefix
- Nav links turn gold on hover
- Active page link has gold underline

---

## Phase 3 — Hero Section (`src/components/Hero.astro`)

**Goal**: Style the hero. No other files.

### Hero spec

```
Background: var(--bg-page)
Padding: 2.5rem 2rem 1.8rem
Border-bottom: 1px solid var(--border-default)
```

**Eyebrow label** (above the title):
```
Font: var(--font-ui)
Font-size: 11px
Letter-spacing: 0.12em
Text-transform: uppercase
Color: var(--accent)
Margin-bottom: 0.6rem
```

**H1 title**:
```
Font: var(--font-serif)
Font-size: 22px
Font-weight: 400  ← not bold
Line-height: 1.35
Color: var(--text-primary)
Margin: 0 0 0.6rem
Max-width: 520px
```

**Subtitle paragraph**:
```
Font: var(--font-serif)
Font-size: 14px
Color: var(--text-secondary)
Line-height: 1.7
Max-width: 480px
Margin: 0 0 1.4rem
```

**Stats row** (Rulings / Scholars / Categories):
```
Display: flex
Gap: 2.5rem
```

Each stat:
- Number: `font-size: 20px; font-weight: 400; color: var(--accent); letter-spacing: -0.01em`
- Label: `font-family: var(--font-ui); font-size: 11px; color: var(--text-muted); letter-spacing: 0.04em; margin-top: 2px`

**Arabic watermark** (if present in original): set `opacity: 0.04`. If it causes layout issues, remove it entirely.

**DO NOT** add a colored or gradient background to the hero.
**DO NOT** bold the H1.

### Verification
- Eyebrow text is gold and uppercase
- Title is serif, normal weight, dark color
- Stats numbers are gold

---

## Phase 4 — Filter Bar (`src/components/FilterBar.astro`)

**Goal**: Style the filter bar. No other files.

### Filter bar spec

```
Background: var(--bg-page)
Padding: 0.75rem 2rem
Border-bottom: 1px solid var(--border-default)
Display: flex
Align-items: center
Gap: 0.5rem
```

**"Filter" label**:
```
Font: var(--font-ui)
Font-size: 11px
Color: var(--text-muted)
Letter-spacing: 0.06em
Text-transform: uppercase
Margin-right: 0.3rem
```

**Inactive button**:
```
Font: var(--font-ui)
Font-size: 12px
Padding: 5px 14px
Border-radius: var(--radius-pill)
Border: 1px solid var(--border-default)
Background: transparent
Color: var(--text-secondary)
Letter-spacing: 0.02em
Cursor: pointer
Transition: var(--transition)
```

**Inactive button hover**:
```
Border-color: var(--accent)
Color: var(--accent)
Background: var(--bg-pill)
```

**Active button**:
```
Background: var(--accent)
Border-color: var(--accent)
Color: #FFFFFF
```

**DO NOT** use `<select>` dropdowns — use buttons only.
**DO NOT** add shadows to buttons.

### Verification
- "All" button starts active (gold background, white text)
- Other buttons show gold border + color on hover
- Transitions are smooth

---

## Phase 5 — Fatwa Registry List (`src/pages/index.astro`)

**Goal**: Style the homepage fatwa list. This is the **core** of the homepage UX.

### Section header (above the list)

```
Padding: 0.8rem 2rem 0.2rem
Font: var(--font-ui)
Font-size: 10px
Letter-spacing: 0.1em
Text-transform: uppercase
Color: var(--text-muted)
```

### Registry row layout

Each fatwa entry is a **3-column grid row**, not a card:

```css
.registry-row {
  display: grid;
  grid-template-columns: 80px 1fr 130px;
  gap: 1rem;
  align-items: baseline;
  padding: 1rem 0.5rem;
  border-bottom: 1px solid var(--border-default);
  cursor: pointer;
  border-radius: 6px;
  transition: background var(--transition), padding var(--transition);
}

.registry-row:hover {
  background: var(--bg-hover);
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
}
```

**Column 1 — Date**:
```
Font: var(--font-ui)
Font-size: 11px
Color: var(--accent)
Letter-spacing: 0.04em
Font-variant-numeric: tabular-nums
```

**Column 2 — Title**:
```
Font: var(--font-serif)
Font-size: 15px
Font-style: italic
Color: var(--text-primary)
Line-height: 1.4
Font-weight: 400
```

**Category pill** (inline, after title text):
```
Display: inline-block
Font: var(--font-ui)
Font-size: 10px
Padding: 2px 8px
Border-radius: var(--radius-pill)
Background: var(--bg-pill)
Color: var(--accent)
Border: 1px solid var(--accent-light)
Margin-left: 8px
Font-style: normal  ← override the italic from parent
Vertical-align: middle
Letter-spacing: 0.04em
```

**Column 3 — Scholar name**:
```
Font: var(--font-ui)
Font-size: 11px
Color: var(--text-muted)
Text-align: right
Letter-spacing: 0.06em
Text-transform: uppercase
```

**DO NOT** wrap rows in cards or add borders to individual rows (only the `border-bottom` divider).
**DO NOT** add shadows to rows.

### Verification
- List is scannable: date | italic title | scholar name
- Hover shows warm cream highlight with slight indent animation
- Category pills appear inline in the title column
- No cards, no shadows, clean list

---

## Phase 6 — Fatwa Card Component (`src/components/FatwaCard.astro`)

**Goal**: Restyle the card for use on scholar/category/search pages. Not used on the homepage list.

### Card spec

```css
.fatwa-card {
  background: var(--bg-card);
  border: 0.5px solid var(--border-default);
  border-top: 2.5px solid var(--accent);   /* ← the signature gold top bar */
  border-radius: var(--radius-card);
  padding: 1.2rem 1.4rem;
  cursor: pointer;
  transition: transform var(--transition), box-shadow var(--transition);
}

.fatwa-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}
```

**Category label** (top of card):
```
Font: var(--font-ui)
Font-size: 10px
Color: var(--accent)
Letter-spacing: 0.08em
Text-transform: uppercase
Margin-bottom: 0.4rem
```

**Title**:
```
Font: var(--font-serif)
Font-size: 15px
Font-style: italic
Font-weight: 400
Line-height: 1.5
Color: var(--text-primary)
Margin-bottom: 0.5rem
```

**Card footer row** (`display: flex; justify-content: space-between; align-items: center`):
- Scholar name: `var(--font-ui); 11px; var(--accent); letter-spacing: 0.06em; text-transform: uppercase`
- Date: `var(--font-ui); 11px; var(--text-muted)`

**Remove** any reference to `var(--paper)`, `var(--hairline)`, `var(--ink)`, or `var(--parchment)`.

**Grid layout** for card grids (on scholar/category pages):
```css
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  padding: 0 2rem 2rem;
}
```

### Verification
- Gold top bar visible (2.5px, not thin)
- Card lifts 2px on hover with a faint shadow
- Scholar name gold, date muted gray

---

## Phase 7 — Fatwa Detail Page (`src/components/FatwaHeader.astro` + `src/pages/fatwa/[slug].astro`)

**Goal**: Make detail pages comfortable to read.

### FatwaHeader spec

```
Background: var(--bg-page)
Padding: 2.5rem 2rem 2rem
Border-bottom: 2px solid var(--accent-light)
```

**Title** (the fatwa question):
```
Font: var(--font-serif)
Font-size: 22px
Font-weight: 400
Line-height: 1.45
Color: var(--text-primary)
Max-width: 65ch
Margin-bottom: 1rem
```

**Metadata row** (scholar, date, category):
```
Display: flex
Gap: 1.5rem
Align-items: center
Font: var(--font-ui)
Font-size: 12px
Color: var(--text-muted)
```

Category tags in metadata:
```
Border: 1px solid var(--accent-light)
Color: var(--accent)
Background: var(--bg-pill)
Padding: 3px 10px
Border-radius: var(--radius-pill)
Font-size: 11px
Letter-spacing: 0.04em
```

**DO NOT** add a dark or colored background to the header.

### Main content area

Add these rules to the detail page's content container:

```css
.content-body {
  max-width: 65ch;
  margin: 0 auto;
  padding: 2rem;
  font-family: var(--font-serif);
  font-size: 17px;
  line-height: 1.8;
  color: var(--text-primary);
}

.content-body p {
  margin-bottom: 1.5rem;
}

.content-body h2, .content-body h3 {
  font-weight: 400;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
}
```

### SourceBlock spec (`src/components/SourceBlock.astro`)

Use the same card style as Phase 6:
- `border-top: 2.5px solid var(--accent)`
- `background: var(--bg-card)`
- `border-radius: var(--radius-card)`
- `padding: 1rem 1.25rem`

### ShareBar / ShareMenu

Buttons:
```
Background: transparent
Border: 1px solid var(--border-default)
Border-radius: var(--radius-pill)
Padding: 6px 16px
Font: var(--font-ui), 12px
Color: var(--text-secondary)
Transition: var(--transition)
```

Hover:
```
Border-color: var(--accent)
Color: var(--accent)
Background: var(--bg-pill)
```

### Verification
- Open 3 fatwa detail pages
- Text is comfortable at ~65 characters per line
- Header not visually dominant — content is the focus
- Share buttons are understated

---

## Phase 8 — Secondary Pages

**Goal**: Apply consistent styling to scholars, categories, search.

### Scholars page (`src/pages/scholars.astro`)

- Use the cards grid from Phase 6
- Each scholar card: name (serif, 16px, normal weight), fatwa count (ui font, 12px, muted), short bio if available
- No avatar images needed — name only is fine

### Categories page (`src/pages/categories.astro`)

- Same card grid
- Each card: category name (serif italic, 16px), fatwa count (ui font, muted)
- Gold top border (same card spec from Phase 6)

### Scholar/Category detail pages

Header:
```
Padding: 2rem 2rem 1.5rem
Border-bottom: 1px solid var(--border-default)
```
- Name: serif, 22px, normal weight, `var(--text-primary)`
- Count/subtitle: ui font, 13px, `var(--text-muted)`

Below header: use the cards grid from Phase 6.

### Search page (`src/pages/search.astro`)

Search input:
```
Background: var(--bg-card)
Border: 1px solid var(--border-default)
Border-radius: var(--radius-pill)
Padding: 10px 1.25rem
Font: var(--font-serif), 15px
Color: var(--text-primary)
Width: 100%
Max-width: 560px
Transition: var(--transition)
```

Focus state:
```
Border-color: var(--accent)
Outline: 2px solid var(--accent-light)
Outline-offset: 2px
```

Results: reuse FatwaCard component from Phase 6.

---

## Phase 9 — Final Polish

**Goal**: Verify everything. Fix inconsistencies. Run build.

### Checklist

**Typography**
- [ ] All headings use `var(--font-serif)`, `font-weight: 400`
- [ ] All labels/badges/metadata use `var(--font-ui)`
- [ ] No `font-weight: 600` or `700` anywhere
- [ ] No italic on UI-font text

**Colors**
- [ ] No hardcoded hex values in components (all go through `var(--...)`)
- [ ] No `var(--paper)`, `var(--hairline)`, `var(--ink)` anywhere
- [ ] Gold accent `#B07D2A` is only referenced through `var(--accent)`

**Spacing**
- [ ] Consistent `2rem` side padding on all page sections
- [ ] Cards grid uses `gap: 1rem`
- [ ] Registry rows use `padding: 1rem 0.5rem`

**Borders**
- [ ] Card top border: exactly `2.5px solid var(--accent)` — not `1px`, not `3px`
- [ ] Row dividers: `1px solid var(--border-default)`
- [ ] Header bottom: `2px solid var(--accent-light)`

**Interactions**
- [ ] Card hover: `translateY(-2px)` + `box-shadow: 0 4px 12px rgba(0,0,0,0.06)`
- [ ] Row hover: warm cream bg + left indent
- [ ] Button hover: gold border + gold text + pill bg
- [ ] All transitions use `var(--transition)` (0.15s ease-out)

**Accessibility**
- [ ] All interactive elements reachable by Tab key
- [ ] Focus ring visible: `2px solid var(--accent)` on all inputs and buttons
- [ ] Text contrast: `#1A1208` on `#FAF7EE` passes WCAG AA (verified ✓)
- [ ] Gold text `#B07D2A` on cream `#FAF7EE` — use only for labels/accents, not body text (contrast ~4.1:1)

**Build**
- [ ] `npm run build` completes with no errors
- [ ] No unused CSS variables
- [ ] No console warnings

---

## Common Mistakes to Avoid

| Wrong | Correct |
|-------|---------|
| `color: gold` or `color: #FFD700` | `color: var(--accent)` → `#B07D2A` |
| `font-weight: 700` on headings | `font-weight: 400` — the serif does the work |
| Dark header background on hero | `background: var(--bg-page)` — cream only |
| White `#FFFFFF` background | `var(--bg-page)` → `#FAF7EE` |
| Adding dark mode | Not in scope — skip entirely |
| `border-top: 1px solid gold` on cards | `border-top: 2.5px solid var(--accent)` |
| Italic on scholar/category labels | `font-style: normal` on UI-font elements |
| Bold nav links | `font-weight: 400` on all nav links |
| Implementing multiple phases at once | One phase, then stop and confirm |