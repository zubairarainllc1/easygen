
import type { CvData } from "@/lib/types";
import { Mail, Phone, Home, Globe } from "lucide-react";
import { Separator } from "../ui/separator";

export default function ModernTemplate({ cvData }: { cvData: CvData }) {
  return (
    <div className="p-8 font-sans bg-white text-gray-800 flex gap-8">
      {/* Left Column */}
      <div className="w-1/3 bg-gray-100 p-6 rounded-lg">
        <h1 className="text-4xl font-extrabold text-primary mb-2">
          {cvData.personalInfo.name}
        </h1>
        <p className="text-lg text-gray-600 font-light mb-8">
            Professional Summary
        </p>
        
        <p className="text-sm leading-relaxed mb-8">{cvData.summary}</p>
        
        <Separator className="my-6 bg-gray-300"/>

        <h2 className="text-xl font-bold text-primary mb-4 uppercase tracking-wider">Contact</h2>
        <div className="space-y-3 text-sm">
          <p className="flex items-center gap-3">
            <Mail className="text-primary" size={16} /> {cvData.personalInfo.email}
          </p>
          <p className="flex items-center gap-3">
            <Phone className="text-primary" size={16} /> {cvData.personalInfo.phone}
          </p>
          <p className="flex items-center gap-3">
            <Home className="text-primary" size={16} /> {cvData.personalInfo.address}
          </p>
          {cvData.personalInfo.website && (
            <p className="flex items-center gap-3">
              <Globe className="text-primary" size={16} /> {cvData.personalInfo.website}
            </p>
          )}
        </div>
        
        <Separator className="my-6 bg-gray-300"/>

        <h2 className="text-xl font-bold text-primary mb-4 uppercase tracking-wider">Skills</h2>
         <div className="flex flex-wrap gap-2">
            {cvData.skills.map((skill) => (
                <span key={skill} className="bg-primary/20 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                    {skill}
                </span>
            ))}
         </div>
      </div>

      {/* Right Column */}
      <div className="w-2/3 p-6">
        {/* Experience */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-primary/90 mb-6 uppercase tracking-widest border-b-2 border-primary/20 pb-2">
            Work Experience
          </h2>
          <div className="space-y-6">
            {cvData.experience.map((exp) => (
              <div key={exp.id} className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-full before:w-0.5 before:bg-gray-200 after:absolute after:left-[-3px] after:top-2 after:h-2 after:w-2 after:rounded-full after:bg-primary">
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
                         <span className="text-primary mr-2 mt-1">&#8227;</span>
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
          <h2 className="text-2xl font-bold text-primary/90 mb-6 uppercase tracking-widest border-b-2 border-primary/20 pb-2">
            Education
          </h2>
          <div className="space-y-5">
            {cvData.education.map((edu) => (
               <div key={edu.id} className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-full before:w-0.5 before:bg-gray-200 after:absolute after:left-[-3px] after:top-2 after:h-2 after:w-2 after:rounded-full after:bg-primary">
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
