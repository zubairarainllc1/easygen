
import type { CvData } from "@/lib/types";
import { Mail, Phone, Home, Globe, Star, Palette, Briefcase, GraduationCap } from "lucide-react";

const primaryColor = 'hsl(var(--primary-cv))';
const primaryColorLight = 'hsla(var(--primary-cv), 0.2)';
const primaryColorLighter = 'hsla(var(--primary-cv), 0.9)';
const primaryColorLightest = 'hsla(var(--primary-cv), 0.7)';

export default function CreativeTemplate({ cvData }: { cvData: CvData }) {
  return (
    <div className="p-8 font-sans bg-white text-gray-800 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-8">
        <div
          className="w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: primaryColorLight }}
        >
            {cvData.personalInfo.profileImage ? (
                <img src={cvData.personalInfo.profileImage} alt="Profile" data-ai-hint="person" className="w-full h-full object-cover"/>
            ) : (
                <span className="text-5xl font-bold" style={{ color: primaryColor }}>{cvData.personalInfo.name.charAt(0)}</span>
            )}
        </div>
        <h1 className="text-5xl font-extrabold tracking-tighter" style={{ color: primaryColor }}>
          {cvData.personalInfo.name}
        </h1>
        <p className="text-lg text-gray-500 mt-2">Creative Professional</p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="md:col-span-1 space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: primaryColor }}>
                <Palette size={20}/> About Me
            </h2>
            <p className="text-sm leading-relaxed">{cvData.summary}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>Contact</h2>
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
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>Skills</h2>
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
            <h2 className="text-2xl font-bold mb-6 border-b-2 pb-2 flex items-center gap-3" style={{color: primaryColorLighter, borderColor: primaryColorLight}}>
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
                          <Star className="mr-2 mt-1 h-3 w-3" style={{color: primaryColorLightest}} fill="currentColor"/>
                          {line.replace(/^- /, '')}
                        </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6 border-b-2 pb-2 flex items-center gap-3" style={{color: primaryColorLighter, borderColor: primaryColorLight}}>
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
