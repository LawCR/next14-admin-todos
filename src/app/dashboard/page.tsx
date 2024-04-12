import { WidgetItem } from "@/components";
import { redirect } from "next/navigation";
import { SummaryCard } from "@/features/shopping-cart";
import Image from "next/image";
import { getUserSessionServer } from "@/features/auth/actions/auth-actions";

const WIDGETS = [
  {
    title: 'Global Activities',
    amount: '$23,988',
    percentage: 2,
    compared: 'Compared to last week $13,988'
  },
  {
    title: 'Revenue',
    amount: '$12,135',
    percentage: 4,
    compared: 'Compared to last month $10,988'
  },
  {
    title: 'Sales',
    amount: '$6,388',
    percentage: -5,
    compared: 'Compared to last month $7,988'
  }
]

export default async function DashboardPage() {

  const user = await getUserSessionServer()
  if (!user) redirect('/api/auth/signin')
  
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {
        WIDGETS.map((item) => (
          <WidgetItem key={item.title} {...item} />
        ))
      }
      <SummaryCard
        title="Usuario conectado S-Side" 
      >
        <div className="flex flex-col w-full justify-center items-center">
          <Image 
            src={user?.image || ''}
            className="w-24 rounded-full" 
            width={96}
            height={32}
            alt="tailus logo"
          />
          <span className="text-center text-gray-600 mt-1">
            {user?.name}
          </span>
          <span className="text-center text-gray-400 text-sm">
            {user?.email}
          </span>
          <span className="text-center text-gray-400 text-sm">
            {JSON.stringify(user)}
          </span>
        </div>
      </SummaryCard>
    </div>
  );
}
