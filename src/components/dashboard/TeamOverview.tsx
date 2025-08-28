export function TeamOverview() {
  const teamMembers = [
    { name: 'John Doe', status: 'online', avatar: 'JD' },
    { name: 'Sarah Wilson', status: 'busy', avatar: 'SW' },
    { name: 'Mike Johnson', status: 'away', avatar: 'MJ' },
    { name: 'Emily Chen', status: 'online', avatar: 'EC' },
    { name: 'Alex Smith', status: 'offline', avatar: 'AS' },
  ]

  const getStatusColor = (status: string) => {
    const colors = {
      online: 'bg-green-500',
      busy: 'bg-red-500',
      away: 'bg-yellow-500',
      offline: 'bg-gray-400'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-400'
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-primary">Team Overview</h3>
        <span className="text-sm text-secondary">145 members</span>
      </div>
      
      <div className="space-y-3">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{member.avatar}</span>
              </div>
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(member.status)} border-2 border-white rounded-full`}></div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-primary">{member.name}</p>
              <p className="text-xs text-secondary capitalize">{member.status}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 text-sm btn-secondary">View All Members</button>
    </div>
  )
}