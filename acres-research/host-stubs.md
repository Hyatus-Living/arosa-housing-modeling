# Host interface for meta.mjs

`acres-research/meta.mjs` runs research on Meta's Model API under the same runner contract as Arosa's existing engine: registered tools, prompt context, follow-up turns, control signals, and run events. In Arosa those come from the private research service. This extraction ships the Meta client exactly as used, plus minimal stubs for the six host modules it imports, so the file loads and its contract is readable without the private service:

| Import | Host must provide |
|---|---|
| `./tools.mjs` | `skillPath(name)` resolving a named skill file; `reportingTables` formatting instruction text |
| `./execution-context.mjs` | `executionSignal()`, `withExecutionSignal(signal, run)`, `combinedSignal(...)`, `stoppedError()` abort composition |
| `./instructions.mjs` | `baseInstructions` system instruction text for a run |
| `./prompt-context.mjs` | `createPromptContext(...)` and `contextReadTool` for reading the run's shared context |
| `./codex.mjs` | `selectEffort`, `toolError`, `followUpTurns`, `followUpLimits`, `sanitizeAnswerFormatting`, `decisionInputs` run-shaping helpers |

The stub files beside `meta.mjs` export those names and throw if called for real work. To execute research, replace them with a host implementing the same shapes (the test file `meta.test.mjs` shows the expected call patterns with a stub fetcher). `meta-visual.mjs` has no host dependency: it needs only `@meta-sam/parser` (included under `node_modules/`, see `licenses/SAM-LICENSE.txt`) and a `MODEL_API_KEY` for live calls.
