import HomePage from "@/components/HomePage";
import { getReportsByTag } from "@/lib/api";

export default async function Page() {
  const defaultTag = "israel";
  const reports = await getReportsByTag("he", defaultTag);

  return (

    <HomePage defaultTag={defaultTag} initialReports={reports} />
    
  );
}
