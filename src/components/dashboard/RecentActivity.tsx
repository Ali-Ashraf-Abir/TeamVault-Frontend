export function RecentActivity() {
  const activities = [
    { user: 'John Doe', action: 'sent a message in', target: '#general', time: '2 min ago', type: 'message' },
    { user: 'Sarah Wilson', action: 'joined channel', target: '#design', time: '5 min ago', type: 'join' },
    { user: 'Mike Johnson', action: 'uploaded a file to', target: '#development', time: '10 min ago', type: 'file' },
    { user: 'Emily Chen', action: 'created channel', target: '#marketing', time: '15 min ago', type: 'create' },
    { user: 'Alex Smith', action: 'started a call in', target: '#general', time: '20 min ago', type: 'call' },
  ]

  const getIcon = (type: string) => {
    const icons = {
      message: '💬',
      join: '👋',
      file: '📁',
      create: '➕',
      call: '📞'
    }
    return icons[type as keyof typeof icons] || '📝'
  }

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-primary mb-6">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center space-x-4 p-3 hover:bg-accent rounded-lg transition-colors">
            <div className="text-2xl">{getIcon(activity.type)}</div>
            <div className="flex-1">
              <p className="text-sm text-primary">
                <span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium text-blue-600">{activity.target}</span>
              </p>
              <p className="text-xs text-muted">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}