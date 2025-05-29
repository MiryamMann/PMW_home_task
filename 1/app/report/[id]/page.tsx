import ReportDetails from "@/components/ReportDetails";
import AddFootnote from "@/components/AddFootnote";
interface PageProps {
  params: {
    id: string;
  };
}
export default function ReportPage({ params }: PageProps) {
   const lang: "en" | "he" = "he"; 
  return (
    <div className="p-6">
      <ReportDetails reportId={params.id} lang={lang} />
      <AddFootnote reportId={params.id} />

    </div>
  );
}
