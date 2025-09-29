'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react'

// Define the global state structure
interface GlobalState {
  user: {
    userId: string | null
    firstName: string
    lastName: string
    email: string
    avatar?: string | null
  } | null
  notifications: Array<{
    id: string
    message: string
    type: 'success' | 'error' | 'info' | 'warning'
    timestamp: number
  }>
  ui: {
    theme: 'light' | 'dark'
    sidebarCollapsed: boolean
    loading: boolean
  }
  chat: {
    activeChannelId: string | null
    unreadCount: number
    onlineUsers: string[]
  }
  // Add any other global data you need
  [key: string]: any // Allow dynamic properties
}

// Define action types
type GlobalAction = 
  | { type: 'SET_USER'; payload: GlobalState['user'] }
  | { type: 'CLEAR_USER' }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<GlobalState['notifications'][0], 'id' | 'timestamp'> }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ACTIVE_CHANNEL'; payload: string | null }
  | { type: 'SET_UNREAD_COUNT'; payload: number }
  | { type: 'SET_ONLINE_USERS'; payload: string[] }
  | { type: 'SET_DATA'; payload: { key: string; value: any } } // Generic setter
  | { type: 'UPDATE_DATA'; payload: { key: string; value: Partial<any> } } // Generic updater
  | { type: 'DELETE_DATA'; payload: string } // Generic deleter

// Initial state
const initialState: GlobalState = {
  user: null,
  notifications: [],
  ui: {
    theme: 'light',
    sidebarCollapsed: false,
    loading: false,
  },
  chat: {
    activeChannelId: null,
    unreadCount: 0,
    onlineUsers: [],
  },
}

// Reducer function
function globalReducer(state: GlobalState, action: GlobalAction): GlobalState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    
    case 'CLEAR_USER':
      return { ...state, user: null }
    
    case 'ADD_NOTIFICATION':
      const newNotification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
      }
      return {
        ...state,
        notifications: [newNotification, ...state.notifications].slice(0, 50) // Keep only last 50
      }
    
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      }
    
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] }
    
    case 'SET_THEME':
      return {
        ...state,
        ui: { ...state.ui, theme: action.payload }
      }
    
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        ui: { ...state.ui, sidebarCollapsed: !state.ui.sidebarCollapsed }
      }
    
    case 'SET_LOADING':
      return {
        ...state,
        ui: { ...state.ui, loading: action.payload }
      }
    
    case 'SET_ACTIVE_CHANNEL':
      return {
        ...state,
        chat: { ...state.chat, activeChannelId: action.payload }
      }
    
    case 'SET_UNREAD_COUNT':
      return {
        ...state,
        chat: { ...state.chat, unreadCount: action.payload }
      }
    
    case 'SET_ONLINE_USERS':
      return {
        ...state,
        chat: { ...state.chat, onlineUsers: action.payload }
      }
    
    case 'SET_DATA':
      return {
        ...state,
        [action.payload.key]: action.payload.value
      }
    
    case 'UPDATE_DATA':
      return {
        ...state,
        [action.payload.key]: {
          ...(state[action.payload.key] || {}),
          ...action.payload.value
        }
      }
    
    case 'DELETE_DATA':
      const { [action.payload]: deleted, ...rest } = state
      return rest as GlobalState
    
    default:
      return state
  }
}

// Context type
interface GlobalContextType {
  state: GlobalState
  dispatch: React.Dispatch<GlobalAction>
  // Helper functions
  setUser: (user: GlobalState['user']) => void
  clearUser: () => void
  addNotification: (notification: Omit<GlobalState['notifications'][0], 'id' | 'timestamp'>) => void
  removeNotification: (id: string) => void
  setTheme: (theme: 'light' | 'dark') => void
  toggleSidebar: () => void
  setLoading: (loading: boolean) => void
  setActiveChannel: (channelId: string | null) => void
  setUnreadCount: (count: number) => void
  setOnlineUsers: (users: string[]) => void
  // Generic helpers
  setData: (key: string, value: any) => void
  updateData: (key: string, value: Partial<any>) => void
  getData: (key: string) => any
  deleteData: (key: string) => void
}

// Create context
const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

// Provider component
export function GlobalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(globalReducer, initialState)

  // Helper functions
  const setUser = (user: GlobalState['user']) => {
    dispatch({ type: 'SET_USER', payload: user })
  }

  const clearUser = () => {
    dispatch({ type: 'CLEAR_USER' })
  }

  const addNotification = (notification: Omit<GlobalState['notifications'][0], 'id' | 'timestamp'>) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification })
  }

  const removeNotification = (id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id })
  }

  const setTheme = (theme: 'light' | 'dark') => {
    dispatch({ type: 'SET_THEME', payload: theme })
  }

  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' })
  }

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading })
  }

  const setActiveChannel = (channelId: string | null) => {
    dispatch({ type: 'SET_ACTIVE_CHANNEL', payload: channelId })
  }

  const setUnreadCount = (count: number) => {
    dispatch({ type: 'SET_UNREAD_COUNT', payload: count })
  }

  const setOnlineUsers = (users: string[]) => {
    dispatch({ type: 'SET_ONLINE_USERS', payload: users })
  }

  // Generic helpers
  const setData = (key: string, value: any) => {
    dispatch({ type: 'SET_DATA', payload: { key, value } })
  }

  const updateData = (key: string, value: Partial<any>) => {
    dispatch({ type: 'UPDATE_DATA', payload: { key, value } })
  }

  const getData = (key: string) => {
    return state[key]
  }

  const deleteData = (key: string) => {
    dispatch({ type: 'DELETE_DATA', payload: key })
  }

  const value: GlobalContextType = {
    state,
    dispatch,
    setUser,
    clearUser,
    addNotification,
    removeNotification,
    setTheme,
    toggleSidebar,
    setLoading,
    setActiveChannel,
    setUnreadCount,
    setOnlineUsers,
    setData,
    updateData,
    getData,
    deleteData,
  }

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  )
}

// Custom hook to use the context
export function useGlobal() {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider')
  }
  return context
}

// Specific hooks for common use cases
export function useUser() {
  const { state, setUser, clearUser } = useGlobal()
  return {
    user: state.user,
    setUser,
    clearUser,
    isAuthenticated: !!state.user,
  }
}

export function useNotifications() {
  const { state, addNotification, removeNotification, dispatch } = useGlobal()
  return {
    notifications: state.notifications,
    addNotification,
    removeNotification,
    clearNotifications: () => dispatch({ type: 'CLEAR_NOTIFICATIONS' }),
  }
}

export function useUI() {
  const { state, setTheme, toggleSidebar, setLoading } = useGlobal()
  return {
    theme: state.ui.theme,
    sidebarCollapsed: state.ui.sidebarCollapsed,
    loading: state.ui.loading,
    setTheme,
    toggleSidebar,
    setLoading,
  }
}

export function useChat() {
  const { state, setActiveChannel, setUnreadCount, setOnlineUsers } = useGlobal()
  return {
    activeChannelId: state.chat.activeChannelId,
    unreadCount: state.chat.unreadCount,
    onlineUsers: state.chat.onlineUsers,
    setActiveChannel,
    setUnreadCount,
    setOnlineUsers,
  }
}