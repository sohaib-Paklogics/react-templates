
import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import { Loader2, Bell, Mail, MessageSquare, AlertTriangle } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface NotificationSetting {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  enabled: boolean
}

export function NotificationSettings() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: "email_notifications",
      title: "Email Notifications",
      description: "Receive email notifications for important updates.",
      icon: <Mail className="h-4 w-4" />,
      enabled: true,
    },
    {
      id: "push_notifications",
      title: "Push Notifications",
      description: "Receive push notifications in your browser.",
      icon: <Bell className="h-4 w-4" />,
      enabled: true,
    },
    {
      id: "in_app_notifications",
      title: "In-App Notifications",
      description: "Show notifications within the application.",
      icon: <MessageSquare className="h-4 w-4" />,
      enabled: true,
    },
    {
      id: "security_alerts",
      title: "Security Alerts",
      description: "Get notified about security-related events.",
      icon: <AlertTriangle className="h-4 w-4" />,
      enabled: true,
    },
  ])

  const toggleSetting = (id: string) => {
    setSettings(settings.map((setting) => (setting.id === id ? { ...setting, enabled: !setting.enabled } : setting)))
  }

  async function onSubmit() {
    setIsSubmitting(true)

    try {
      // In a real app, you would submit to an API
      console.log(settings)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {settings.map((setting) => (
          <div key={setting.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">{setting.icon}</div>
              <div className="space-y-0.5">
                <h4 className="font-medium">{setting.title}</h4>
                <p className="text-sm text-muted-foreground">{setting.description}</p>
              </div>
            </div>
            <Switch checked={setting.enabled} onCheckedChange={() => toggleSetting(setting.id)} />
          </div>
        ))}
      </div>

      <Separator />

      <Button onClick={onSubmit} disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save Preferences
      </Button>
    </div>
  )
}

