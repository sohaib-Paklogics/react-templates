import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LogIn, Settings, UserCog, ShieldAlert, FileEdit } from "lucide-react"

// Sample activity data - in a real app, this would come from an API
const activityData = [
  {
    id: "1",
    type: "login",
    description: "Logged in from 192.168.1.1",
    timestamp: "2023-05-15T10:30:00Z",
    ipAddress: "192.168.1.1",
    userAgent: "Chrome on Windows",
  },
  {
    id: "2",
    type: "settings",
    description: "Updated notification settings",
    timestamp: "2023-05-14T15:45:00Z",
    ipAddress: "192.168.1.1",
    userAgent: "Chrome on Windows",
  },
  {
    id: "3",
    type: "profile",
    description: "Changed profile picture",
    timestamp: "2023-05-13T09:15:00Z",
    ipAddress: "192.168.1.1",
    userAgent: "Chrome on Windows",
  },
  {
    id: "4",
    type: "security",
    description: "Enabled two-factor authentication",
    timestamp: "2023-05-12T16:20:00Z",
    ipAddress: "192.168.1.1",
    userAgent: "Chrome on Windows",
  },
  {
    id: "5",
    type: "login",
    description: "Logged in from 192.168.1.2",
    timestamp: "2023-05-11T11:10:00Z",
    ipAddress: "192.168.1.2",
    userAgent: "Safari on macOS",
  },
  {
    id: "6",
    type: "profile",
    description: "Updated profile information",
    timestamp: "2023-05-10T14:30:00Z",
    ipAddress: "192.168.1.2",
    userAgent: "Safari on macOS",
  },
  {
    id: "7",
    type: "login",
    description: "Logged in from 192.168.1.3",
    timestamp: "2023-05-09T09:45:00Z",
    ipAddress: "192.168.1.3",
    userAgent: "Firefox on Linux",
  },
  {
    id: "8",
    type: "security",
    description: "Password changed",
    timestamp: "2023-05-08T16:15:00Z",
    ipAddress: "192.168.1.3",
    userAgent: "Firefox on Linux",
  },
]

const getActivityIcon = (type: string) => {
  switch (type) {
    case "login":
      return <LogIn className="h-4 w-4" />
    case "settings":
      return <Settings className="h-4 w-4" />
    case "profile":
      return <UserCog className="h-4 w-4" />
    case "security":
      return <ShieldAlert className="h-4 w-4" />
    default:
      return <FileEdit className="h-4 w-4" />
  }
}

const getActivityBadge = (type: string) => {
  switch (type) {
    case "login":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-50">
          Login
        </Badge>
      )
    case "settings":
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-600 hover:bg-purple-50">
          Settings
        </Badge>
      )
    case "profile":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">
          Profile
        </Badge>
      )
    case "security":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-600 hover:bg-red-50">
          Security
        </Badge>
      )
    default:
      return <Badge variant="outline">Other</Badge>
  }
}

export function ActivityLog() {
  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-8">
        {activityData.map((activity) => {
          const date = new Date(activity.timestamp)
          return (
            <div key={activity.id} className="flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-muted">
                {getActivityIcon(activity.type)}
              </div>
              <div className="ml-4 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium leading-none">{activity.description}</p>
                  {getActivityBadge(activity.type)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {date.toLocaleString()} • {activity.ipAddress} • {activity.userAgent}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}

