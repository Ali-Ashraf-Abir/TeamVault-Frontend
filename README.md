# TeamVault - Frontend

A real-time collaboration platform similar to Discord, built with Next.js and Socket.io for seamless communication and team management.

![TeamVault Banner](https://i.ibb.co.com/vCpGr4GT/banner.png)

## 🚀 Features

### Core Functionality
- **Server Creation & Management**: Create and customize your own servers for different teams or communities
- **Lobby System**: 
  - Separate lobby chat for general discussions
  - Public and private lobby options
  - Lobby invitation system for controlled access
  - Easy lobby add/join functionality
- **Real-time Communication**: 
  - Instant messaging powered by Socket.io
  - Live notifications for mentions, invites, and updates
  - Real-time user presence indicators
- **Invitation System**: Send and manage invitations to servers and lobbies

### Coming Soon
- Voice channels
- Screen sharing
- File sharing
- Advanced user roles and permissions
- Thread conversations
- And much more!

## 📸 Screenshots

### Server Dashboard
<img src="https://i.ibb.co.com/NdJGNP8b/dashboard.png" alt="Server Dashboard" width="100%"/>

*Manage your servers and see all available lobbies at a glance*

### Lobby Chat
<img src="https://i.ibb.co.com/DHjq4g4C/server.png" alt="Lobby Chat" width="100%"/>

*Real-time messaging with instant notifications and user presence*

### Invitation System
<img src="https://i.ibb.co.com/0RB7PTfp/invite.png" alt="Invitations" width="100%"/>

*Send and manage invitations to your servers and lobbies*

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (React)
- **Real-time Communication**: Socket.io Client
- **Styling**: Tailwind CSS
- **State Management**: React Context API / Zustand
- **HTTP Client**: Axios / Fetch API

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Backend server running (see backend README)

## 🚀 Quick Start

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Ali-Ashraf-Abir/teamvault-frontend.git
cd teamvault-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

That's it! You're ready to start using TeamVault.

## 🏗️ Project Structure

```
teamvault-frontend/
├── api/                      # API route handlers
├── app/                      # Next.js 14+ app directory
│   ├── (Auth)/              # Authentication routes (route group)
│   │   ├── login/          # Login page
│   │   └── register/       # Registration page
│   ├── dashboard/           # Main dashboard area
│   │   ├── messages/       # Direct messages view
│   │   ├── servers/        # Server list/management
│   │   ├── settings/       # User settings
│   │   └── team/           # Team management
│   ├── fonts/               # Custom font files
│   ├── invite/              # Invitation handling
│   │   └── [code]/         # Dynamic invite code route
│   ├── server/              # Server-specific routes
│   │   └── [server_id]/    # Dynamic server pages
│   │       └── lobbies/
│   │           └── [lobby_id]/  # Dynamic lobby chat
│   └── types/               # TypeScript type definitions
├── components/              # Reusable React components
│   ├── cards/              # Card components
│   ├── dashboard/          # Dashboard-specific components
│   ├── forms/              # Form components
│   ├── hooks/              # Custom React hooks
│   ├── modals/             # Modal dialogs
│   ├── providers/          # Context providers
│   ├── sections/           # Page sections
│   ├── server_ui/          # Server interface components
│   │   └── views/          # Different view layouts
│   └── ui/                 # Base UI primitives
├── context/                 # React context definitions
└── util/                    # Utility functions & helpers
```

## 🔌 Socket.io Events

The frontend listens to and emits the following socket events:

### Listening Events
- `message:new` - New chat message received
- `notification:new` - New notification received
- `user:online` - User came online
- `user:offline` - User went offline
- `lobby:updated` - Lobby information updated
- `invitation:received` - New invitation received

### Emitting Events
- `message:send` - Send a chat message
- `lobby:join` - Join a lobby
- `lobby:leave` - Leave a lobby
- `typing:start` - User started typing
- `typing:stop` - User stopped typing

## 🎨 Key Components

### Server Creation
Create new servers with custom names and settings. Choose between public or private visibility.

### Lobby Management
- Join public lobbies instantly
- Request access to private lobbies
- Create custom lobbies within your servers
- Manage lobby members and permissions

### Real-time Chat
- Send and receive messages instantly
- See who's typing in real-time
- Get notifications for mentions
- Message history with infinite scroll

### Invitation System
- Send invitations via email or shareable links
- Accept or decline incoming invitations
- Track invitation status
- Revoke sent invitations

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:5000` |
| `NEXT_PUBLIC_SOCKET_URL` | Socket.io server URL | `http://localhost:5000` |

## 📦 Build for Production

```bash
npm run build
npm run start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Backend Repository](https://github.com/Ali-Ashraf-Abir/teamvault_backend)
- [Documentation](https://docs.teamvault.com) (Coming Soon)
- [Live Demo](https://teamvault.demo.com) (Coming Soon)

## 💬 Support

For issues and questions, please open an issue on GitHub or contact the maintainers.

---

Built with ❤️ using Next.js and Socket.io
