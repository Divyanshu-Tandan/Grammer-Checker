'use server';
/**
 * @fileOverview Grammar correction AI agent.
 *
 * - correctGrammar - A function that handles the grammar correction process.
 * - CorrectGrammarInput - The input type for the correctGrammar function.
 * - CorrectGrammarOutput - The return type for the correctGrammar function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const CorrectGrammarInputSchema = z.object({
  text: z.string().describe('The text to correct.'),
});
export type CorrectGrammarInput = z.infer<typeof CorrectGrammarInputSchema>;

const CorrectGrammarOutputSchema = z.object({
  correctedText: z.string().describe('The corrected text.'),
  explanation: z.string().describe('Explanation of the corrections made.'),
});
export type CorrectGrammarOutput = z.infer<typeof CorrectGrammarOutputSchema>;

export async function correctGrammar(input: CorrectGrammarInput): Promise<CorrectGrammarOutput> {
  return correctGrammarFlow(input);
}

const prompt = ai.definePrompt({
  name: 'correctGrammarPrompt',
  input: {
    schema: z.object({
      text: z.string().describe('The text to correct.'),
    }),
  },
  output: {
    schema: z.object({
      correctedText: z.string().describe('The corrected text.'),
      explanation: z.string().describe('Explanation of the corrections made.'),
    }),
  },
  prompt: `You are a highly skilled AI trained in grammar correction and style improvement.

  Please review the following text and provide a corrected version along with a brief explanation of the changes you made.

  Text: {{{text}}}
  `,
});

const correctGrammarFlow = ai.defineFlow<
  typeof CorrectGrammarInputSchema,
  typeof CorrectGrammarOutputSchema
>({
  name: 'correctGrammarFlow',
  inputSchema: CorrectGrammarInputSchema,
  outputSchema: CorrectGrammarOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
