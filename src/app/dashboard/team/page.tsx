export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Team Members</h1>
        <button className="btn-primary">Invite Members</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <div key={i} className="card p-6 text-center hover:scale-105 transition-transform duration-200">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">T{i}</span>
            </div>
            <h3 className="font-semibold text-primary mb-1">Team Member {i}</h3>
            <p className="text-sm text-secondary mb-2">member{i}@company.com</p>
            <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
              Online
            </span>
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 btn-secondary py-2 text-sm">Message</button>
              <button className="px-3 py-2 border border-primary rounded-lg hover:bg-accent transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}