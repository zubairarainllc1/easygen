
import type { CvData } from "@/lib/types";
import { Mail, Phone, Home, Globe, Briefcase, GraduationCap, Wrench } from "lucide-react";
import { Separator } from "../ui/separator";

export default function ProfessionalTemplate({ cvData }: { cvData: CvData }) {
  return (
    <div className="p-8 font-serif bg-gray-50 text-gray-800">
        <div className="grid grid-cols-12 gap-8">
            {/* Left Column */}
            <div className="col-span-4 pr-8 border-r-2 border-gray-200">
                <div className="text-center mb-8">
                     {cvData.personalInfo.profileImage && (
                        <img src={cvData.personalInfo.profileImage} alt="Profile" data-ai-hint="person" className="w-32 h-32 rounded-full object-cover mx-auto mb-4" />
                    )}
                    <h1 className="text-4xl font-bold text-primary">
                    {cvData.personalInfo.name}
                    </h1>
                </div>

                <div className="space-y-6">
                    <div>
                        <h2 className="font-bold text-primary/90 text-lg mb-3">CONTACT</h2>
                        <div className="text-sm space-y-2 text-gray-600">
                            <p className="flex items-center gap-3">
                                <Mail size={14} /> {cvData.personalInfo.email}
                            </p>
                            <p className="flex items-center gap-3">
                                <Phone size={14} /> {cvData.personalInfo.phone}
                            </p>
                            <p className="flex items-center gap-3">
                                <Home size={14} /> {cvData.personalInfo.address}
                            </p>
                            {cvData.personalInfo.website && (
                                <p className="flex items-center gap-3">
                                <Globe size={14} /> {cvData.personalInfo.website}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <h2 className="font-bold text-primary/90 text-lg mb-3">SKILLS</h2>
                        <ul className="space-y-1 list-disc list-inside text-sm">
                            {cvData.skills.map(skill => <li key={skill}>{skill}</li>)}
                        </ul>
                    </div>
                    
                    <div>
                        <h2 className="font-bold text-primary/90 text-lg mb-3">EDUCATION</h2>
                         {cvData.education.map((edu) => (
                            <div key={edu.id} className="mb-4">
                                <h3 className="text-md font-semibold">{edu.degree}</h3>
                                <p className="text-sm text-gray-700">{edu.school}</p>
                                <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="col-span-8">
                {/* Summary */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-primary tracking-widest mb-4 flex items-center gap-3"><Briefcase /> SUMMARY</h2>
                    <p className="text-base leading-relaxed">{cvData.summary}</p>
                </div>

                {/* Experience */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-primary tracking-widest mb-6 flex items-center gap-3"><Wrench/> WORK EXPERIENCE</h2>
                    <div className="space-y-6">
                    {cvData.experience.map((exp) => (
                        <div key={exp.id} className="pl-4 border-l-4 border-primary/30">
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-xl font-semibold">{exp.title}</h3>
                                <p className="text-sm font-light text-gray-600">
                                {exp.startDate} - {exp.endDate}
                                </p>
                            </div>
                            <p className="text-md font-semibold italic text-gray-700 mb-2">{exp.company}</p>
                            <ul className="text-sm list-disc list-inside text-gray-700 space-y-1">
                                {exp.description.split('\n').map((line, i) => (
                                <li key={i}>{line.replace(/^- /, '')}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
