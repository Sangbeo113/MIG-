# Component Accessibility QA Report (WCAG AA)
*Status: All components passed automated and manual accessibility audits.*

## Component Status Checklist

| Component | ARIA Role / Label | Keyboard Navigation | Contrast | Status |
|---|---|---|---|---|
| **Navbar.tsx** | `<nav>`, `aria-label` | Tab focus, Esc closes mobile menu | ✅ | ✅ Passed |
| **Hero.tsx** | `<section aria-label="...">` | CTAs are focusable, decorative hidden | ✅ | ✅ Passed |
| **About.tsx** | Decorative elements hidden | Text is readable | ✅ | ✅ Passed |
| **Services.tsx** | `role="list"`, `aria-expanded` | Cards are focusable via keyboard | ✅ | ✅ Passed |
| **Values.tsx** | `aria-live="polite"` for numbers | Static elements structured | ✅ | ✅ Passed |
| **Team.tsx** | `role="dialog"`, `aria-modal` | Dialog traps focus, Esc to close | ✅ | ✅ Passed |
| **Contact.tsx** | `aria-required`, `role="alert"` | Form inputs properly labeled | ✅ | ✅ Passed |
| **Footer.tsx** | `<footer role="contentinfo">` | Links focusable | ✅ | ✅ Passed |

## Notes
- All components successfully implement `prefers-reduced-motion` logic.
- Target Lighthouse Accessibility Score (≥ 95) is fully supported by the codebase.
