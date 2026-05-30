## 🎯 Implementation Plan: Claude's Redesign

We'll implement the redesign in **5 phases**, each with clear deliverables and testing. After each phase, you'll run `npm run dev` to verify.

---

### Phase 1: Foundation (CSS Variables + Typography)

**Goal**: Replace the old theme system with Claude's refined palettes and typography.

**Files to update**:
- `src/styles/global.css` – replace all `:root` and `[data-theme="..."]` blocks with Claude's variables (parchment, slate, vellum, ink).
- Add the new font imports (`Libre Baskerville`, `DM Sans`, keep `Amiri`).
- Add the easing variables (`--ease-spring`, `--ease-out-quart`, etc.).

**Testing**:
- Run `npm run dev`. Site should look visually different (colors deeper, fonts changed).
- Theme switcher (4 themes) should work.
- No errors in console.

**Commit**: `feat: update global CSS variables and typography per redesign`

---

### Phase 2: Card Component Redesign

**Goal**: Replace `FatwaCard.astro` with Claude's version (serif italic titles, scholar avatar, spring hover, accent line).

**Files to update**:
- `src/components/FatwaCard.astro` – replace entire content with Claude's code (includes `<style>` block).
- **Important**: Ensure `scholar` prop is passed correctly (Claude's version uses `scholar` prop – your existing pages already pass it).
- Verify the `initials` logic works (it extracts first two letters from scholar name – fine).

**Potential issues**:
- The `<a>` tags for categories in Claude's card have a syntax error: `href=` missing opening quote. We'll fix.
- Claude used `@apply`? Actually he wrote raw CSS inside `<style>` – that's fine.

**Testing**:
- Homepage cards should show new design: serif italic titles, monogram avatar, gold line on hover, spring lift.
- Click on card → fatwa detail page works.
- Hover effects smooth.

**Commit**: `feat: redesign FatwaCard with serif titles, avatar, spring easing`

---

### Phase 3: FilterBar and Category Tags

**Goal**: Update filter bar to match the new gold‑ramp aesthetic (active states, borders, hover).

**Files to update**:
- `src/components/FilterBar.astro` – replace inline classes with gold‑ramp‑aware Tailwind classes.
- Use Claude's `--gold-*` variables for active buttons and category dropdown.
- Ensure active scholar button uses `bg-gold-300 text-page` or similar.

**Simpler approach**: Since Claude didn't provide a new FilterBar, we'll create a consistent one using Tailwind classes that reference the new CSS variables. I'll provide the updated code.

**Testing**:
- Filter buttons change correctly.
- Active scholar styling uses gold accent.
- Category dropdown matches design.

**Commit**: `feat: update FilterBar to gold-ramp design`

---

### Phase 4: Detail Page Components (FatwaHeader, SourceBlock, ShareMenu)

**Goal**: Ensure fatwa detail page components feel cohesive with the new design (no flat colors, consistent gold accents).

**Files to update**:
- `src/components/FatwaHeader.astro` – adjust background, borders, and typography to use new variables (e.g., `--accent` for header bg, `--gold-200` for tag borders). Minimal changes.
- `src/components/SourceBlock.astro` – same: use `--border-default` and `--accent-link`.
- `src/components/ShareMenu.astro` – already uses theme variables; verify button styling matches gold ramp.

**Testing**:
- Detail page header uses `--accent` (deep emerald for parchment, etc.).
- Category tags inside header use gold hairline borders.
- Source block details button uses `--accent-link`.

**Commit**: `feat: harmonize detail page components with new design system`

---

### Phase 5: Scholar Pages, Category Pages, Hero

**Goal**: Apply the new aesthetic to remaining pages (scholar list, scholar detail, category list, homepage hero).

**Files to update**:
- `src/pages/scholars.astro` – update card styles to match FatwaCard (already uses FatwaCard, so fine). But scholar cards (the list of scholars) need their own styling – use similar gold‑ramp card design.
- `src/pages/scholar/[scholar].astro` – the scholar header (accent background) and fatwa grid – already uses FatwaCard, so fine. Update the header styling to use `--accent` and `--gold-*` for Arabic watermark.
- `src/pages/categories.astro` – update category cards to use gold border on hover, gold text.
- `src/pages/category/[category].astro` – ensure breadcrumb and title use new variables.
- `src/pages/index.astro` – hero strip already uses `--hero-*` variables; they are defined in Claude's CSS, so no change needed.

**Testing**:
- Scholar list cards have consistent styling.
- Category list cards respond to hover with gold border.
- Hero strip colors adapt per theme.

**Commit**: `feat: apply redesign to scholar and category pages`

---

### Phase 6: Polish and Cleanup

**Goal**: Fix any remaining edge cases and remove unused code.

**Tasks**:
- Remove old `ShareBar.astro` component if not used anywhere.
- Ensure all inline `style` attributes are gone (except those using CSS variables – acceptable).
- Run `npm run build` and verify no errors.
- Test on mobile responsive.

**Commit**: `chore: cleanup old components and finalize redesign`

---

## 🚀 How we proceed

We'll execute **Phase 1** first. I'll provide the exact `global.css` replacement code (Claude's variables merged with your existing `@tailwind` directives). Then you'll test. Once confirmed, we move to Phase 2, etc.

Shall I start with **Phase 1** – the updated `global.css`?