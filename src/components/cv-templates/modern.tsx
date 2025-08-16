
import type { CvData } from "@/lib/types";
import { Mail, Phone, Home, Globe } from "lucide-react";
import { Separator } from "../ui/separator";

const primaryColor = 'hsl(var(--primary-cv))';
const primaryColorLight = 'hsla(var(--primary-cv), 0.2)';
const primaryColorLighter = 'hsla(var(--primary-cv), 0.9)';

export default function ModernTemplate({ cvData }: { cvData: CvData }) {
  return (
    <div className="p-8 font-sans bg-white text-gray-800 flex gap-8">
      {/* Left Column */}
      <div className="w-1/3 bg-gray-100 p-6 rounded-lg flex flex-col items-center text-center">
        {cvData.personalInfo.profileImage && (
            <img src={cvData.personalInfo.profileImage} alt="Profile" data-ai-hint="person" className="w-32 h-32 rounded-full object-cover mb-4" />
        )}
        <h1 className="text-4xl font-extrabold mb-2" style={{ color: primaryColor }}>
          {cvData.personalInfo.name}
        </h1>
        <p className="text-lg text-gray-600 font-light mb-8">
            Professional Summary
        </p>
        
        <p className="text-sm leading-relaxed mb-8">{cvData.summary}</p>
        
        <Separator className="my-6 bg-gray-300"/>

        <h2 className="text-xl font-bold uppercase tracking-wider mb-4" style={{ color: primaryColor }}>Contact</h2>
        <div className="space-y-3 text-sm">
          <p className="flex items-center gap-3">
            <Mail size={16} style={{ color: primaryColor }}/> {cvData.personalInfo.email}
          </p>
          <p className="flex items-center gap-3">
            <Phone size={16} style={{ color: primaryColor }}/> {cvData.personalInfo.phone}
          </p>
          <p className="flex items-center gap-3">
            <Home size={16} style={{ color: primaryColor }}/> {cvData.personalInfo.address}
          </p>
          {cvData.personalInfo.website && (
            <p className="flex items-center gap-3">
              <Globe size={16} style={{ color: primaryColor }}/> {cvData.personalInfo.website}
            </p>
          )}
        </div>
        
        <Separator className="my-6 bg-gray-300"/>

        <h2 className="text-xl font-bold uppercase tracking-wider mb-4" style={{ color: primaryColor }}>Skills</h2>
         <div className="flex flex-wrap gap-2 justify-center">
            {cvData.skills.map((skill) => (
                <span key={skill} className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: primaryColorLight, color: primaryColor}}>
                    {skill}
                </span>
            ))}
         </div>
      </div>

      {/* Right Column */}
      <div className="w-2/3 p-6">
        {/* Experience */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold uppercase tracking-widest mb-6 border-b-2 pb-2" style={{ color: primaryColorLighter, borderColor: primaryColorLight }}>
            Work Experience
          </h2>
          <div className="space-y-6">
            {cvData.experience.map((exp) => (
              <div key={exp.id} className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-full before:w-0.5 before:bg-gray-200 after:absolute after:left-[-3px] after:top-2 after:h-2 after:w-2 after:rounded-full" style={{'--after-bg-color': primaryColor} as React.CSSProperties}>
                 <style jsx>{`
                    .after\\:absolute::after {
                        background-color: var(--after-bg-color);
                    }
                `}</style>
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{exp.title}</h3>
                    <p className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {exp.startDate} - {exp.endDate}
                    </p>
                </div>
                <p className="text-md italic text-gray-600 mb-2">{exp.company}</p>
                <ul className="text-sm list-inside space-y-1 text-gray-700">
                   {exp.description.split('\n').map((line, i) => (
                      <li key={i} className="flex items-start">
                         <span className="mr-2 mt-1" style={{ color: primaryColor }}>&#8227;</span>
                         {line.replace(/^- /, '')}
                      </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-widest mb-6 border-b-2 pb-2" style={{ color: primaryColorLighter, borderColor: primaryColorLight }}>
            Education
          </h2>
          <div className="space-y-5">
            {cvData.education.map((edu) => (
               <div key={edu.id} className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-full before:w-0.5 before:bg-gray-200 after:absolute after:left-[-3px] after:top-2 after:h-2 after:w-2 after:rounded-full" style={{'--after-bg-color': primaryColor} as React.CSSProperties}>
                 <style jsx>{`
                    .after\\:absolute::after {
                        background-color: var(--after-bg-color);
                    }
                `}</style>
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{edu.degree}</h3>
                    <p className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {edu.startDate} - {edu.endDate}
                    </p>
                </div>
                <p className="text-md italic text-gray-600">{edu.school}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
