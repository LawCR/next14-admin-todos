import { Metadata } from "next";
import { cookies } from 'next/headers'
import { TabBar } from "@/components";

export const metadata: Metadata = {
  title: "Cookies Page",
  description: "Page to show cookies",
};

export default async function CookiesPage() {

  const cookieStore = cookies()
  const cookieTab = Number(cookieStore.get('selectedTab')?.value ?? '1');
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold mb-5">Cookies Page</h1>
        <TabBar currentTab={cookieTab} />
      </div>
    </div>
  );
}
