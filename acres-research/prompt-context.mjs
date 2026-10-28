// Extraction stub for the Arosa host interface used by meta.mjs. See host-stubs.md.
const host = (name) => () => { throw new Error(`Host stub: implement ${name} to run Meta research (see host-stubs.md).`); };
export const createPromptContext = host('createPromptContext');
export const contextReadTool = host('contextReadTool');
