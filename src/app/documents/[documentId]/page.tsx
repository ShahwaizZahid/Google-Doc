interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>;
}
import Editor from "./editor";
import Navbar from "./navbar";
import Toolbar from "./toolbar";

export default async function Page({ params }: DocumentIdPageProps) {
  const { documentId } = await params;
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <Navbar />
      <Toolbar />
      <Editor />
    </div>
  );
}
