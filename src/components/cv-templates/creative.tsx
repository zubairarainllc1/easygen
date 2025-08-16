
import type { CvData } from "@/lib/types";
import { Mail, Phone, Home, Globe, Star, Palette, Briefcase, GraduationCap } from "lucide-react";

export default function CreativeTemplate({ cvData }: { cvData: CvData }) {
  return (
    <div className="p-8 font-sans bg-white text-gray-800 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-8">
        <div
          className="w-32 h-32 rounded-full mx-auto mb-4 bg-primary/20 flex items-center justify-center overflow-hidden"
        >
            {cvData.personalInfo.profileImage ? (
                <img src={cvData.personalInfo.profileImage} alt="Profile" data-ai-hint="person" className="w-full h-full object-cover"/>
            ) : (
                <span className="text-5xl font-bold text-primary">{cvData.personalInfo.name.charAt(0)}</span>
            )}
        </div>
        <h1 className="text-5xl font-extrabold text-primary tracking-tighter">
          {cvData.personalInfo.name}
        </h1>
        <p className="text-lg text-gray-500 mt-2">Creative Professional</p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="md:col-span-1 space-y-8">
          <div>
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <Palette size={20}/> About Me
            </h2>
            <p className="text-sm leading-relaxed">{cvData.summary}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary mb-4">Contact</h2>
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
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
                {cvData.skills.map((skill) => (
                    <span key={skill} className="bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-md">
                        {skill}
                    </span>
                ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-primary/90 mb-6 border-b-2 border-primary/20 pb-2 flex items-center gap-3">
              <Briefcase /> Experience
            </h2>
            <div className="space-y-6">
              {cvData.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-center mb-1">
                      <h3 className="text-lg font-semibold">{exp.title}</h3>
                      <p className="text-xs font-medium text-gray-500">
                        {exp.startDate} - {exp.endDate}
                      </p>
                  </div>
                  <p className="text-md italic text-gray-600 mb-2">{exp.company}</p>
                  <ul className="text-sm list-inside space-y-1 text-gray-700">
                    {exp.description.split('\n').map((line, i) => (
                        <li key={i} className="flex items-start">
                          <Star className="text-primary/70 mr-2 mt-1 h-3 w-3" fill="currentColor"/>
                          {line.replace(/^- /, '')}
                        </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary/90 mb-6 border-b-2 border-primary/20 pb-2 flex items-center gap-3">
              <GraduationCap /> Education
            </h2>
            <div className="space-y-5">
              {cvData.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{edu.degree}</h3>
                      <p className="text-xs font-medium text-gray-500">
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
    </div>
  );
}
