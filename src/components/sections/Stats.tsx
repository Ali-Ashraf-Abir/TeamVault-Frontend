export function Stats() {
  const stats = [
    { number: '10,000+', label: 'Active Teams' },
    { number: '500K+', label: 'Messages Daily' },
    { number: '99.9%', label: 'Uptime' },
    { number: '50+', label: 'Countries' },
  ]

  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-secondary">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}