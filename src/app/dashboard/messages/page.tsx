export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary">Direct Messages</h1>
      
      <div className="card p-6">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center space-x-4 p-4 hover:bg-accent rounded-lg transition-colors cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">U{i}</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-primary">User {i}</h3>
                  <span className="text-xs text-muted">2 min ago</span>
                </div>
                <p className="text-sm text-secondary">Hey! How's the project coming along?</p>
              </div>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}