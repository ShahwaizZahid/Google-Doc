interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>;
}
import Editor from "./editor";

export default async function Page({ params }: DocumentIdPageProps) {
  const { documentId } = await params;
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <Editor />
    </div>
  );
}
