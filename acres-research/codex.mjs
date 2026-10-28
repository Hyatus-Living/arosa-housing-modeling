// Extraction stub for the Arosa host interface used by meta.mjs. See host-stubs.md.
const host = (name) => () => { throw new Error(`Host stub: implement ${name} to run Meta research (see host-stubs.md).`); };
export const selectEffort = host('selectEffort');
export const toolError = host('toolError');
export const followUpTurns = host('followUpTurns');
export const followUpLimits = host('followUpLimits');
export const sanitizeAnswerFormatting = (text) => text;
export const decisionInputs = host('decisionInputs');
