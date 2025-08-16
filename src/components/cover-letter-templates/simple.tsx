
import type { CoverLetterData } from "@/lib/types";
import { format } from "date-fns";

export default function SimpleCoverLetter({ data }: { data: CoverLetterData }) {
    const { personalInfo, recipientInfo, date, subject, body, closing } = data;
  return (
    <div className="p-10 font-sans bg-white text-gray-900 text-sm leading-6">
        <div className="mb-8">
            <h1 className="text-3xl font-bold">{personalInfo.name}</h1>
            <p className="text-gray-600">{personalInfo.address} &bull; {personalInfo.phone} &bull; {personalInfo.email}</p>
        </div>
        
        <div className="mb-8">
            <p>{format(date, 'PPP')}</p>
        </div>

        <div className="mb-8">
            <p>{recipientInfo.name}</p>
            <p>{recipientInfo.title}</p>
            <p>{recipientInfo.company}</p>
            <p className="whitespace-pre-wrap">{recipientInfo.address}</p>
        </div>

        <div className="mb-6">
            <p className="font-bold">Subject: {subject}</p>
        </div>

        <div className="whitespace-pre-wrap mb-8">
            {body}
        </div>

        <div>
            <p>{closing}</p>
            <p className="mt-3 font-semibold">{personalInfo.name}</p>
        </div>
    </div>
  );
}
