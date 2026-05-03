import Navbar from "@/components/Navbar";
import PageContent from "@/components/PageContent";

export default function Home() {
  return (
    <main className="relative bg-[#050505] min-h-screen selection:bg-[#0050FF]/30 selection:text-white">
      <Navbar />
      <PageContent />
    </main>
  );
}
