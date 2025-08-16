'use server';

import { suggestInvoiceItem } from '@/ai/flows/suggest-invoice-item';

export async function getSuggestions(invoiceDraft: string): Promise<string[]> {
  try {
    const result = await suggestInvoiceItem({ invoiceDraft });
    return result.suggestedItems
      .split('\n')
      .map(s => s.trim().replace(/^- /, ''))
      .filter(Boolean);
  } catch (error) {
    console.error('AI suggestion failed:', error);
    return [];
  }
}
