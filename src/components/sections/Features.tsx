export function Features() {
  const features = [
    {
      title: 'Real-time Messaging',
      description: 'Lightning-fast messaging with instant delivery and read receipts.',
      icon: '💬',
      color: 'bg-blue-500'
    },
    {
      title: 'Video & Voice Calls',
      description: 'Crystal clear HD video calls and voice messaging for seamless communication.',
      icon: '📹',
      color: 'bg-green-500'
    },
    {
      title: 'File Sharing',
      description: 'Share files, documents, and media with drag-and-drop simplicity.',
      icon: '📁',
      color: 'bg-purple-500'
    },
    {
      title: 'Team Channels',
      description: 'Organize conversations into channels for better team collaboration.',
      icon: '👥',
      color: 'bg-orange-500'
    },
    {
      title: 'Smart Notifications',
      description: 'Stay updated with intelligent notifications that learn your preferences.',
      icon: '🔔',
      color: 'bg-red-500'
    },
    {
      title: 'Advanced Security',
      description: 'End-to-end encryption and enterprise-grade security features.',
      icon: '🔒',
      color: 'bg-indigo-500'
    }
  ]

  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Everything you need for team success
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Powerful features designed to enhance your team's productivity and collaboration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card p-6 group hover:scale-105 transition-all duration-300">
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-primary mb-2">{feature.title}</h3>
              <p className="text-secondary">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}