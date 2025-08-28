export function Testimonials() {
  const testimonials = [
    {
      content: "TeamVault has revolutionized how our team communicates. The interface is beautiful and intuitive.",
      author: "Sarah Johnson",
      role: "Product Manager at TechCorp",
      avatar: "SJ"
    },
    {
      content: "The best chat application we've used. Fast, reliable, and feature-rich.",
      author: "Michael Chen",
      role: "CTO at StartupXYZ",
      avatar: "MC"
    },
    {
      content: "Amazing user experience and great performance. Highly recommended!",
      author: "Emily Davis",
      role: "Team Lead at InnovateInc",
      avatar: "ED"
    }
  ]

  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Loved by teams worldwide
          </h2>
          <p className="text-lg text-secondary">
            See what our users have to say about TeamVault
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card p-6">
              <p className="text-primary mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{testimonial.avatar}</span>
                </div>
                <div>
                  <div className="font-semibold text-primary">{testimonial.author}</div>
                  <div className="text-sm text-secondary">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}