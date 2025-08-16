
'use client';

import type { CvData } from '@/lib/types';
import ClassicTemplate from './cv-templates/classic';
import ModernTemplate from './cv-templates/modern';

interface CvPreviewProps {
    cvData: CvData;
    template: 'classic' | 'modern';
}

export default function CvPreview({ cvData, template }: CvPreviewProps) {
  const templates = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
  };

  const SelectedTemplate = templates[template];

  return (
    <div className="p-0 bg-card text-card-foreground rounded-lg">
      <SelectedTemplate cvData={cvData} />
    </div>
  );
}
