# Contributing to tsclear

Thanks for considering a contribution! This doc covers how to work on the project,
including how commits and releases are handled.

## Commit messages: Conventional Commits

All commits should follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(optional scope): <short description>

feat(patterns): add explanation for TS2531
fix(parser): handle Windows-style file paths
docs(readme): clarify install instructions
test(explainer): cover fallback for unknown codes
chore(deps): bump vitest to 2.1.0
refactor(cli): extract stdin reader into its own function
```

Common types:

- `feat` — a new feature (new error pattern, new CLI flag, etc.)
- `fix` — a bug fix
- `docs` — documentation only changes
- `test` — adding or fixing tests
- `refactor` — code change that doesn't add a feature or fix a bug
- `chore` — tooling, dependencies, CI config
- `perf` — performance improvements

It's fine — encouraged, even — to make many small commits (one per logical change:
adding a type, adding a test, updating docs) rather than one giant commit per feature.
Small, well-labeled commits make the history easy to read and easy to bisect.

## Versioning & releases

**The version in `package.json` is not bumped on every commit.** Day-to-day commits
(features, fixes, refactors, docs, tests) land on `main` without touching the version
number at all. Bumping it constantly creates noisy diffs and meaningless git history.

Instead:

- Versioning follows [SemVer](https://semver.org/): `MAJOR.MINOR.PATCH`.
- New error patterns and small fixes are usually `MINOR` or `PATCH` bumps.
- Breaking changes to the public API (`src/index.ts` exports) or CLI behavior are
  `MAJOR` bumps.
- A release (version bump + git tag + npm publish + changelog entry) is cut
  **periodically, in a single dedicated commit**, once enough changes have
  accumulated on `main` — not after every merged PR.
- The release commit message itself follows Conventional Commits too, e.g.
  `chore(release): v0.2.0`.

If this project later adopts an automated release tool (e.g. `changesets` or
`semantic-release`), this section will be updated accordingly — until then, releases
are cut manually following the rules above.

## Adding a new error pattern

Most contributions are new entries in `src/patterns.ts`. To add one:

1. Find the `TSxxxx` code (`tsc` prints it in the error output).
2. Add an entry to the `patterns` array with a regex that captures the relevant
   parts of the message, and an `explain()` function that turns it into a plain
   sentence with a suggested next step.
3. Add a test in `tests/explainer.test.ts` covering at least one real example.
4. Update the table in `README.md`.

## Local development

```bash
npm install
npm run dev   # run the CLI against local TS files via tsx
npm test      # run the test suite
npm run build # compile to dist/
```
