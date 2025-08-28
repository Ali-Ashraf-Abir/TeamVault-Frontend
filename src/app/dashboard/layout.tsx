import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { Sidebar } from "@/components/dashboard/Sidebar"
import { ThemeProvider } from "@/components/providers/ThemeProvider"



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-secondary">
      <ThemeProvider>
        <div className="flex">
        <Sidebar />
        
        <div className="flex-1 lg:ml-4">
          <DashboardHeader />
          
          <main className="p-4 lg:p-8">
            {children}
          </main>
        </div>
      </div>
      </ThemeProvider>
    </div>
  )
}