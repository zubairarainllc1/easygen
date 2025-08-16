
import type { CvData } from "@/lib/types";
import { Mail, Phone, Home, Globe } from "lucide-react";

export default function ClassicTemplate({ cvData }: { cvData: CvData }) {
  return (
    <div className="p-8 font-serif bg-white text-gray-800">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-400 pb-4 mb-6 flex flex-col items-center">
        {cvData.personalInfo.profileImage && (
            <img src={cvData.personalInfo.profileImage} alt="Profile" data-ai-hint="person" className="w-32 h-32 rounded-full object-cover mb-4" />
        )}
        <h1 className="text-5xl font-bold tracking-wider uppercase">
          {cvData.personalInfo.name}
        </h1>
        <div className="flex justify-center items-center gap-x-6 gap-y-2 text-sm mt-4 flex-wrap">
          <a href={`mailto:${cvData.personalInfo.email}`} className="flex items-center gap-2 hover:text-primary">
            <Mail size={14} /> {cvData.personalInfo.email}
          </a>
          <a href={`tel:${cvData.personalInfo.phone}`} className="flex items-center gap-2 hover:text-primary">
            <Phone size={14} /> {cvData.personalInfo.phone}
          </a>
          <p className="flex items-center gap-2">
            <Home size={14} /> {cvData.personalInfo.address}
          </p>
          {cvData.personalInfo.website && (
            <a href={cvData.personalInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary">
              <Globe size={14} /> {cvData.personalInfo.website}
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2 mb-3 uppercase tracking-widest">
          Summary
        </h2>
        <p className="text-base leading-relaxed">{cvData.summary}</p>
      </div>

      {/* Experience */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2 mb-4 uppercase tracking-widest">
          Experience
        </h2>
        <div className="space-y-6">
          {cvData.experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-bold">{exp.title}</h3>
                <p className="text-sm font-light text-gray-600">
                  {exp.startDate} - {exp.endDate}
                </p>
              </div>
              <p className="text-md font-semibold italic">{exp.company}</p>
              <ul className="mt-2 list-disc list-inside text-base space-y-1">
                {exp.description.split('\n').map((line, i) => (
                  <li key={i}>{line.replace(/^- /, '')}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2 mb-4 uppercase tracking-widest">
          Education
        </h2>
        <div className="space-y-4">
          {cvData.education.map((edu) => (
            <div key={edu.id}>
               <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-bold">{edu.degree}</h3>
                <p className="text-sm font-light text-gray-600">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
              <p className="text-md italic">{edu.school}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2 mb-3 uppercase tracking-widest">
          Skills
        </h2>
        <p className="text-base leading-relaxed">
          {cvData.skills.join(" · ")}
        </p>
      </div>
    </div>
  );
}
