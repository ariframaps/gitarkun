import DashboardNavBar from "@/components/DashboardNavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <h1>Dashboard</h1>
      <DashboardNavBar />
      {children}
    </section>
  );
}
