## Description

<!-- Describe the high-level intent and motivation of this change in 1-3
sentences. Mention which module(s) or area(s) of the app it touches. -->

## Changes

<!-- List the relevant changes grouped by area or module. Use `### Area`
headings and concise `-` bullets that describe the WHAT and WHY, not the
HOW. Keep one bullet per logical change. -->

### Area

- Change one.
- Change two.

## Type of change

<!-- Pick the most relevant option and delete the others. The PR title
should also follow `type(scope): summary` (see CONTRIBUTING). -->

- [ ] feat (new feature)
- [ ] fix (bug fix)
- [ ] refactor (no behavior change)
- [ ] style (formatting / CSS only)
- [ ] docs (documentation only)
- [ ] chore (build / tooling / config)

## How has this been tested?

<!-- Describe the manual or automated tests you ran. If there are no
tests in the repo (this repo currently has none), describe the manual
verification: `pnpm lint`, `pnpm build`, the pages you clicked
through, etc. -->

- [ ] `pnpm lint` passes
- [ ] `pnpm build` succeeds
- [ ] Manually verified in the browser

## Screenshots (if applicable)

<!-- Add screenshots or short clips when the change is visual. -->

## Checklist

- [ ] My code follows the project conventions (see `AGENTS.md` and
      `.agents/skills/tracklinker-frontend/`).
- [ ] New colors / dynamic classes include a `dark:` variant and, when
      dynamic, are added to `tailwind.config.js` `safelist`.
- [ ] Endpoints go through `apiRoutes` and `fetchWithAuth` (no hardcoded
      URLs or raw `fetch` outside of `loginService`).
- [ ] Routes / menu items / home cards / report cards / status config
      stay in sync with the role lists in
      `src/router/constants/routesConfig.js`,
      `src/globals/constants/asideMenuItems.js`,
      `src/modules/home/constants/homeSections.js`,
      `src/modules/reports/constants/reportSections.js` and any
      `<module>StatusConfig.js`.
- [ ] I did not introduce comments in the code (project rule).
- [ ] I did not commit secrets or `.env` values.
