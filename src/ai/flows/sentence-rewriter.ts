'use server';
/**
 * @fileOverview A sentence rewriter AI agent.
 *
 * - rewriteSentence - A function that handles the sentence rewriting process.
 * - RewriteSentenceInput - The input type for the rewriteSentence function.
 * - RewriteSentenceOutput - The return type for the rewriteSentence function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const RewriteSentenceInputSchema = z.object({
  text: z.string().describe('The text to rewrite.'),
});
export type RewriteSentenceInput = z.infer<typeof RewriteSentenceInputSchema>;

const RewriteSentenceOutputSchema = z.object({
  rewrittenText: z.string().describe('The rewritten text.'),
  explanation: z.string().describe('An explanation of the changes made.'),
});
export type RewriteSentenceOutput = z.infer<typeof RewriteSentenceOutputSchema>;

export async function rewriteSentence(input: RewriteSentenceInput): Promise<RewriteSentenceOutput> {
  return rewriteSentenceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rewriteSentencePrompt',
  input: {
    schema: z.object({
      text: z.string().describe('The text to rewrite.'),
    }),
  },
  output: {
    schema: z.object({
      rewrittenText: z.string().describe('The rewritten text.'),
      explanation: z.string().describe('An explanation of the changes made.'),
    }),
  },
  prompt: `You are an AI expert in grammar and sentence structure.

You will be provided with a sentence, and your goal is to rewrite it to be more grammatically correct and stylistically appealing.

You should also provide a brief explanation of the changes you made.

Original Text: {{{text}}}

Rewritten Text:`,
});

const rewriteSentenceFlow = ai.defineFlow<
  typeof RewriteSentenceInputSchema,
  typeof RewriteSentenceOutputSchema
>({
  name: 'rewriteSentenceFlow',
  inputSchema: RewriteSentenceInputSchema,
  outputSchema: RewriteSentenceOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
});
