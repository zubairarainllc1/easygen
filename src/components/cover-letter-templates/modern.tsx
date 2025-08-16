
import type { CoverLetterData } from "@/lib/types";
import { format } from "date-fns";
import { Mail, Phone, Home, Globe } from "lucide-react";

const primaryColor = 'hsl(var(--primary-cover-letter))';
const primaryColorLight = 'hsla(var(--primary-cover-letter), 0.1)';

export default function ModernCoverLetter({ data }: { data: CoverLetterData }) {
    const { personalInfo, recipientInfo, date, subject, body, closing } = data;
  return (
    <div className="p-8 font-sans bg-white text-gray-800 flex gap-8">
        <div className="w-1/3 p-6 rounded-lg" style={{ backgroundColor: primaryColorLight }}>
             {personalInfo.profileImage && (
                <img src={personalInfo.profileImage} alt="Profile" data-ai-hint="person" className="w-24 h-24 rounded-full object-cover mb-4" />
            )}
            <h1 className="text-3xl font-extrabold" style={{ color: primaryColor }}>{personalInfo.name}</h1>
            
            <div className="h-px bg-gray-300 my-6"></div>

            <h2 className="text-lg font-bold mb-4" style={{ color: primaryColor }}>Contact</h2>
            <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2"><Mail size={14} /> {personalInfo.email}</p>
                <p className="flex items-center gap-2"><Phone size={14} /> {personalInfo.phone}</p>
                <p className="flex items-center gap-2"><Home size={14} /> {personalInfo.address}</p>
            </div>
        </div>

        <div className="w-2/3 p-6">
            <div className="text-right text-sm text-gray-500 mb-8">
                <p>{format(date, 'PPP')}</p>
            </div>

            <div className="mb-8 text-sm">
                <p className="font-bold">{recipientInfo.name}</p>
                <p>{recipientInfo.title}</p>
                <p>{recipientInfo.company}</p>
                <p className="whitespace-pre-wrap">{recipientInfo.address}</p>
            </div>
            
            <h3 className="font-bold text-lg mb-4">Subject: {subject}</h3>

            <div className="text-sm leading-relaxed whitespace-pre-wrap mb-8">
                {body}
            </div>

            <div>
                <p className="text-sm">{closing}</p>
                <p className="mt-3 text-lg font-semibold" style={{ color: primaryColor }}>{personalInfo.name}</p>
            </div>

        </div>
    </div>
  );
}
