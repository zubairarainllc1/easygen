
import type { CvData } from "@/lib/types";

export default function MinimalistTemplate({ cvData }: { cvData: CvData }) {
  return (
    <div className="p-10 font-sans bg-white text-gray-900">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-6xl font-extrabold tracking-tighter mb-2">
          {cvData.personalInfo.name}
        </h1>
        <div className="flex items-center gap-x-6 text-sm text-gray-500">
          <span>{cvData.personalInfo.email}</span>
          <span>&middot;</span>
          <span>{cvData.personalInfo.phone}</span>
           <span>&middot;</span>
          <span>{cvData.personalInfo.address}</span>
          {cvData.personalInfo.website && (
            <>
                <span>&middot;</span>
                <a href={cvData.personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: 'hsl(var(--primary-cv))' }}>
                    {cvData.personalInfo.website}
                </a>
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="mb-10">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
          Summary
        </h2>
        <p className="text-base leading-relaxed">{cvData.summary}</p>
      </div>
      
      <div className="grid grid-cols-3 gap-x-12">
        <div className="col-span-2">
            {/* Experience */}
            <div className="mb-10">
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
                Experience
                </h2>
                <div className="space-y-6">
                {cvData.experience.map((exp) => (
                    <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                        <div>
                            <h3 className="text-lg font-semibold">{exp.title}</h3>
                            <p className="text-md text-gray-700">{exp.company}</p>
                        </div>
                        <p className="text-sm text-gray-500">
                        {exp.startDate} - {exp.endDate}
                        </p>
                    </div>
                    <ul className="mt-2 text-sm text-gray-600 space-y-1">
                        {exp.description.split('\n').map((line, i) => (
                        <li key={i}>{line.replace(/^- /, '')}</li>
                        ))}
                    </ul>
                    </div>
                ))}
                </div>
            </div>
        </div>
        <div className="col-span-1 space-y-10">
             {/* Education */}
            <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
                Education
                </h2>
                <div className="space-y-4">
                {cvData.education.map((edu) => (
                    <div key={edu.id}>
                        <h3 className="text-lg font-semibold">{edu.school}</h3>
                        <p className="text-md text-gray-700">{edu.degree}</p>
                        <p className="text-sm text-gray-500">
                            {edu.startDate} - {edu.endDate}
                        </p>
                    </div>
                ))}
                </div>
            </div>

            {/* Skills */}
            <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                Skills
                </h2>
                <p className="text-sm leading-relaxed">
                {cvData.skills.join(", ")}
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
