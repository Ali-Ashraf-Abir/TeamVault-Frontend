export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-primary">Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="font-semibold text-primary mb-4">Profile</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">JD</span>
                </div>
                <div>
                  <button className="text-sm btn-secondary">Change Photo</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Display Name</label>
                <input type="text" value="John Doe" className="w-full px-3 py-2 border border-primary rounded-lg bg-primary text-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Status</label>
                <select className="w-full px-3 py-2 border border-primary rounded-lg bg-primary text-primary">
                  <option>Available</option>
                  <option>Busy</option>
                  <option>Away</option>
                  <option>Do not disturb</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold text-primary mb-4">Notifications</h3>
            <div className="space-y-3">
              {[
                'Direct messages',
                'Channel mentions',
                'File uploads',
                'Team updates'
              ].map((item) => (
                <label key={item} className="flex items-center justify-between">
                  <span className="text-sm text-primary">{item}</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h3 className="font-semibold text-primary mb-4">Account Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Email</label>
                <input type="email" value="john@example.com" className="w-full px-3 py-2 border border-primary rounded-lg bg-primary text-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Phone</label>
                <input type="tel" value="+1 (555) 123-4567" className="w-full px-3 py-2 border border-primary rounded-lg bg-primary text-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Time Zone</label>
                <select className="w-full px-3 py-2 border border-primary rounded-lg bg-primary text-primary">
                  <option>UTC-5 (Eastern Time)</option>
                  <option>UTC-8 (Pacific Time)</option>
                  <option>UTC+0 (GMT)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Language</label>
                <select className="w-full px-3 py-2 border border-primary rounded-lg bg-primary text-primary">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
            </div>
            <div className="mt-6">
              <button className="btn-primary mr-3">Save Changes</button>
              <button className="btn-secondary">Cancel</button>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold text-primary mb-4">Privacy & Security</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-primary">Two-factor Authentication</h4>
                  <p className="text-sm text-secondary">Add an extra layer of security to your account</p>
                </div>
                <button className="btn-secondary">Enable</button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-primary">Session Management</h4>
                  <p className="text-sm text-secondary">Manage your active sessions</p>
                </div>
                <button className="btn-secondary">View Sessions</button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-primary">Data Export</h4>
                  <p className="text-sm text-secondary">Download your data</p>
                </div>
                <button className="btn-secondary">Request Export</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}