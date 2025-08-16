
'use client';

import type { CvData } from '@/lib/types';
import ClassicTemplate from './cv-templates/classic';
import ModernTemplate from './cv-templates/modern';
import MinimalistTemplate from './cv-templates/minimalist';
import CreativeTemplate from './cv-templates/creative';
import ProfessionalTemplate from './cv-templates/professional';

interface CvPreviewProps {
    cvData: CvData;
    template: 'classic' | 'modern' | 'minimalist' | 'creative' | 'professional';
}

export default function CvPreview({ cvData, template }: CvPreviewProps) {
  const templates = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    minimalist: MinimalistTemplate,
    creative: CreativeTemplate,
    professional: ProfessionalTemplate,
  };

  const SelectedTemplate = templates[template] || ClassicTemplate;

  return (
    <div className="p-0 bg-card text-card-foreground rounded-lg">
      <SelectedTemplate cvData={cvData} />
    </div>
  );
}
