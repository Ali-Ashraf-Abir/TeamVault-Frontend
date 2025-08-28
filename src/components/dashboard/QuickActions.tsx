export function QuickActions() {
  const actions = [
    { name: 'New Channel', icon: '➕', color: 'bg-blue-500' },
    { name: 'Start Call', icon: '📞', color: 'bg-green-500' },
    { name: 'Share File', icon: '📁', color: 'bg-purple-500' },
    { name: 'Send Message', icon: '✉️', color: 'bg-orange-500' },
  ]

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-primary mb-6">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className="flex flex-col items-center p-4 hover:bg-accent rounded-lg transition-colors group"
          >
            <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
              <span className="text-2xl">{action.icon}</span>
            </div>
            <span className="text-sm font-medium text-primary">{action.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}