import DashboardNavBar from "@/components/DashboardNavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-screen-xl mx-auto mt-32 p-4 sm:p-8 flex flex-col gap-7">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <DashboardNavBar />
      {children}
    </section>
  );
}
