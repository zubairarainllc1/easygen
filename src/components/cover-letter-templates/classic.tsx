
import type { CoverLetterData } from "@/lib/types";
import { format } from "date-fns";
import { Separator } from "../ui/separator";

export default function ClassicCoverLetter({ data }: { data: CoverLetterData }) {
    const { personalInfo, recipientInfo, date, subject, body, closing } = data;
  return (
    <div className="p-10 font-serif bg-white text-gray-800 text-base leading-relaxed">
        <div className="text-center mb-10">
            {personalInfo.profileImage && (
                <img src={personalInfo.profileImage} alt="Profile" data-ai-hint="person" className="w-28 h-28 rounded-full object-cover mx-auto mb-4" />
            )}
            <h1 className="text-4xl font-bold tracking-wider">{personalInfo.name}</h1>
            <p className="text-sm text-gray-600 mt-2">
                {personalInfo.address} &bull; {personalInfo.phone} &bull; {personalInfo.email}
            </p>
        </div>

        <Separator className="my-8" />
        
        <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
                <p className="font-bold">{recipientInfo.name}</p>
                <p>{recipientInfo.title}</p>
                <p>{recipientInfo.company}</p>
                <p className="whitespace-pre-wrap">{recipientInfo.address}</p>
            </div>
             <div className="text-right">
                <p>{format(date, 'PPP')}</p>
            </div>
        </div>

        <div className="mb-6">
            <p className="font-bold">Subject: {subject}</p>
        </div>

        <div className="whitespace-pre-wrap mb-8">
            {body}
        </div>

        <div>
            <p>{closing}</p>
            <p className="mt-4 font-semibold">{personalInfo.name}</p>
        </div>
    </div>
  );
}
