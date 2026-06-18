# Creating pull requests

This file is the how-to for opening a PR against
`DevJuan001/Tracklinker-frontend-web`. It complements `AGENTS.md` and
the rest of this skill.

## Conventions that matter for PRs

- **Branches** are always `feat/<scope>` (e.g. `feat/products`,
  `feat/profile`, `feat/aside`, `feat/docs`). The scope is the
  module/area you're touching, not the type of change.
- **Commit messages** follow Conventional Commits:
  `type(scope): summary` — e.g. `feat(products): add brand filter`,
  `fix(profile): handle missing avatar`, `refactor(Modal): drop
  unused prop`. Allowed types: `feat`, `fix`, `refactor`, `style`,
  `docs`, `chore`, `perf`, `test`.
- **PR titles** mirror the commit message of the most important
  change, e.g. `feat(products): optimize useCatalog data freshness,
  standardize component IDs, and fix filter close handler`. Use
  sentence case, no period at the end.
- **PRs target `main`**. Open them from your `feat/<scope>` branch.
- **One PR per concern**. If your branch covers both `feat/products`
  and `feat/dashboard`, split it. Don't mix unrelated module work.

## The template

This repo ships a PR template at
`.github/PULL_REQUEST_TEMPLATE.md` that GitHub auto-applies when you
open a PR. It has three sections you must complete:

1. `## Description` — 1-3 sentences: what does this PR do and why?
2. `## Changes` — bullets grouped by `### Area` headings, with the
   WHAT and WHY (not the HOW). Match the style of past PRs
   (`feat(products): optimize useCatalog data freshness…` in PR #63
   is a good reference).
3. `## Type of change` — tick the right box. The PR title type and
   the box you tick should agree.

There are also optional sections (`How has this been tested?`,
`Screenshots`, `Checklist`) that you should fill in or at least skim.

## Workflow (the actual commands)

```bash
# 1. Make sure main is up to date
git checkout main
git pull --rebase origin main

# 2. Branch from main
git checkout -b feat/<scope>

# 3. Do the work, commit with conventional messages
git add -A
git commit -m "feat(<scope>): <summary>"

# 4. Push the branch
git push -u origin feat/<scope>

# 5. Open the PR (use the GitHub CLI; the template auto-loads)
gh pr create \
  --base main \
  --head feat/<scope> \
  --title "feat(<scope>): <summary>" \
  --body-file .github/PULL_REQUEST_TEMPLATE_BODY.md
```

### Using `gh` interactively

If you don't want to pass `--body-file`, just run `gh pr create` and
answer the prompts. GitHub will pre-fill the description with the
template; you fill in the placeholders.

### When the PR is reviewable

- `pnpm lint` must pass.
- `pnpm build` must succeed.
- If the change is visual, attach a screenshot or a short clip.

## Authoring the PR body — concrete recipe

Given a branch with N commits, the body typically looks like:

```markdown
## Description
<one paragraph that ties the bullets together; mention the user-facing
behaviour and the modules touched>

## Changes

### <Module / area>
- <Bullet 1: WHAT changed and WHY it matters>
- <Bullet 2: ...>
- <Bullet 3: ...>

### <Other area>
- <Bullet ...>
```

Tips that match this repo's voice:

- Mention concrete identifiers (file names, function names, prop
  names) — past PRs do this and reviewers appreciate it.
- Mention the numeric constants involved (e.g. `staleTime` 10 min →
  5 min, `refetchInterval` 20 s, `id` renamed from `brand` to
  `brand-menu`).
- Group by area, not by file. The reviewer reads "Categories
  Module", not `useCategories.js` + `AddCategoryModal.jsx`.
- Keep bullets to one line each. If a bullet needs two lines, it
  is probably two bullets.

## Common pitfalls

- ❌ PR titled `update stuff` or `fix bug` — be specific.
- ❌ PR body with no `## Changes` bullets.
- ❌ Mixing unrelated changes (e.g. a new module + a styling tweak
  in another module). Split into two PRs.
- ❌ Forgetting to add the new endpoint to `apiRoutes.js` if you
  added a new service.
- ❌ Forgetting to add the new route to `routesConfig.js` **and**
  the matching item to `asideMenuItems.js` **and** (if applicable)
  `homeSections.js` **and** `reportSections.js`.
- ❌ Forgetting the `dark:` variant on a new color class, or
  forgetting to add a dynamic class to the Tailwind `safelist`.

## After the PR is merged

GitHub auto-deletes the head branch if the repo setting
`Automatically delete head branches` is on. The branch
`feat/<scope>` is then gone locally only if you ran
`git remote prune origin`. No action required from you.

If you need to keep the branch (e.g. for stacked PRs), push it again
manually after the merge.
