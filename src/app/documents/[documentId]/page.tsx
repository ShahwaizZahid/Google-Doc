interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>;
}
import Editor from "./editor";
import Navbar from "./navbar";
import { Room } from "./room";
import Toolbar from "./toolbar";

export default async function Page({ params }: DocumentIdPageProps) {
  const { documentId } = await params;
  console.log(documentId);
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 right-0 left-0 z-10 bg-[#FAFBFC] print:hidden">
        <Navbar />
        <Toolbar />
      </div>
      <div className="pt-[114px] print:pt-0">
        <Room>
          <Editor />
        </Room>
      </div>
    </div>
  );
}
