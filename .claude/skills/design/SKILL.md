# design

Gather requirements and create a specification for a new feature or system

## Process

1. **Listen** – Receive the user's problem or idea description
2. **Ask clarifying questions** using the AskUserQuestion tool when genuine ambiguities exist:
   - Unclear scope or boundaries
   - Missing edge cases that could cause issues
   - Integration points with existing systems
   - Constraints (performance, security, compatibility)
   - User-facing behavior needing definition
3. **Stop asking** once sufficient information exists for a useful spec—avoid over-questioning
4. **Generate** a spec.md file using the spec-template.md template

## Key Guidelines

- Always use the AskUserQuestion tool for clarifications (provides better UX with selectable options)
- Support up to 4 questions simultaneously, each with 2-4 options
- Use concise option labels (1-5 words) with helpful descriptions
- Enable `multiSelect: true` when choices aren't mutually exclusive
- Allow users to select "Other" for custom input
- Group related questions in single tool calls when appropriate
- Accept "Other" responses gracefully
- Apply judgment—simple features need fewer questions
- Explore codebase if needed to understand existing patterns
- Ensure specs are actionable for implementation planning

## Output

Save the final specification to `spec.md` in the current working directory or project root. Subsequently, suggest the user review the spec and proceed to plan mode for creating an implementation plan.
