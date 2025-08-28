import { DashboardStats } from "@/components/dashboard/DashboardState";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { TeamOverview } from "@/components/dashboard/TeamOverview";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Welcome back, John!</h1>
        <p className="text-secondary">Here's what's happening with your team today.</p>
      </div>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <RecentActivity />
        </div>
        
        <div className="space-y-8">
          <QuickActions />
          <TeamOverview />
        </div>
      </div>
    </div>
  )
}