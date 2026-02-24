import CrmSidebar from "@/components/crm/CrmSidebar";

export const metadata = {
  title: "CRM — Bluecore Studios",
};

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface">
      <CrmSidebar />
      <main className="lg:pl-56 min-h-screen">
        <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
