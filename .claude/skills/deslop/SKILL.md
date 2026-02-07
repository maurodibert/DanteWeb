# deslop

Remove AI-generated code slop from current branch

## Overview
This skill reviews git diffs and eliminates AI-generated artifacts introduced in a feature branch compared to the main branch.

## Process

1. **Retrieve the diff** using `git diff main...HEAD`

2. **Analyze each modified file** by reading the complete context to understand existing style patterns

3. **Identify and eliminate slop** across four categories:
   - **Unnecessary comments:** Explanations of obvious code, style inconsistencies, or redundant documentation
   - **Defensive over-engineering:** Abnormal try/catch blocks, excessive null checks, duplicated validation, or impossible-case error handling
   - **Type system workarounds:** Dynamic type casts, assertions, or suppression directives like `@ts-ignore`
   - **Style inconsistencies:** Naming conventions, formatting, or unnecessary abstraction layers that diverge from surrounding code

4. **Execute surgical edits** preserving intended functionality while removing bloat

## Output
Provide a concise 1-3 sentence summary describing what was changed, remaining specific yet brief.
