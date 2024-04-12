// Admin Dashboard https://tailwindcomponents.com/component/dashboard-12
import { Sidebar, TopMenu } from '@/components';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <div className="ml-auto lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">
        <TopMenu />
        <div className="px-6 py-6">
          {children}
        </div>
      </div>
    </>
  );
}