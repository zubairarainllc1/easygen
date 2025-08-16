
'use client';

import type { CoverLetterData } from '@/lib/types';
import ClassicCoverLetter from './cover-letter-templates/classic';
import ModernCoverLetter from './cover-letter-templates/modern';
import SimpleCoverLetter from './cover-letter-templates/simple';

interface CoverLetterPreviewProps {
    data: CoverLetterData;
    template: 'classic' | 'modern' | 'simple';
    primaryColor: string;
}

export default function CoverLetterPreview({ data, template, primaryColor }: CoverLetterPreviewProps) {
  const templates = {
    classic: ClassicCoverLetter,
    modern: ModernCoverLetter,
    simple: SimpleCoverLetter,
  };

  const SelectedTemplate = templates[template] || ClassicCoverLetter;
  
  const letterStyle = {
    '--primary-cover-letter': primaryColor
  } as React.CSSProperties;

  return (
    <div className="p-0 bg-card text-card-foreground rounded-lg" style={letterStyle}>
      <SelectedTemplate data={data} />
    </div>
  );
}
