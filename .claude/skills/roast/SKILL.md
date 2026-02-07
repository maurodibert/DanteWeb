# roast

Critically analyze code changes to verify they're optimal, elegant, and correct. Challenges assumptions and proves the solution is the best approach for the problem.

## Overview
This skill thoroughly evaluates code modifications by examining whether they represent the best possible implementation approach.

## Scope Determination
The skill maps user inputs to specific git operations:

- `/roast` (no args) → `git diff main...HEAD`
- `/roast last commit` → `git diff HEAD~1`
- `/roast <file>` → Changes to that file on current branch
- `/roast staged` → `git diff --cached`
- `/roast <commit-ref>` → `git show <commit-ref>`

## Analysis Process

1. **Retrieve the diff** based on determined scope
2. **Read complete context** for each modified file to understand architecture, patterns, and integration points
3. **Understand intent** by identifying the problem being solved and any constraints
4. **Challenge assumptions** across four dimensions:
   - Correctness (edge cases, silent failures, wrong results)
   - Design (abstraction level, complexity, pattern reuse)
   - Efficiency (performance issues, unnecessary operations)
   - Idiom (codebase conventions, language best practices)

5. **Prove or disprove** each concern with concrete reasoning or alternative code

## Output Structure

**Verdict:** [GOOD | MID | BAD]

**What it does right:** Genuine strengths

**Concerns:** Per issue—problem description, why it matters, concrete fix

**Alternative approaches:** Brief explanation of other valid solutions

The skill emphasizes directness and specificity over softened criticism.
