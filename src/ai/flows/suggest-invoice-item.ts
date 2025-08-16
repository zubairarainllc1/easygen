'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting invoice item descriptions.
 *
 * - suggestInvoiceItem - An async function that takes an incomplete invoice draft and suggests reasonable line item descriptions.
 * - SuggestInvoiceItemInput - The input type for the suggestInvoiceItem function.
 * - SuggestInvoiceItemOutput - The return type for the suggestInvoiceItem function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestInvoiceItemInputSchema = z.object({
  invoiceDraft: z
    .string()
    .describe('An incomplete invoice draft to suggest item descriptions for.'),
});
export type SuggestInvoiceItemInput = z.infer<typeof SuggestInvoiceItemInputSchema>;

const SuggestInvoiceItemOutputSchema = z.object({
  suggestedItems: z
    .string()
    .describe('Suggested item descriptions based on the invoice draft.'),
});
export type SuggestInvoiceItemOutput = z.infer<typeof SuggestInvoiceItemOutputSchema>;

export async function suggestInvoiceItem(input: SuggestInvoiceItemInput): Promise<SuggestInvoiceItemOutput> {
  return suggestInvoiceItemFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestInvoiceItemPrompt',
  input: {schema: SuggestInvoiceItemInputSchema},
  output: {schema: SuggestInvoiceItemOutputSchema},
  prompt: `You are an invoicing assistant. Given the following invoice draft, suggest some reasonable line item descriptions.

Invoice Draft: {{{invoiceDraft}}}

Suggest item descriptions that would fit well in the invoice.`,
});

const suggestInvoiceItemFlow = ai.defineFlow(
  {
    name: 'suggestInvoiceItemFlow',
    inputSchema: SuggestInvoiceItemInputSchema,
    outputSchema: SuggestInvoiceItemOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
