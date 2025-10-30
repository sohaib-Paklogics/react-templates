import { ProfileForm } from "@/components/profile-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActivityLog } from "@/components/activity-log"
import { SecuritySettings } from "@/components/security-settings"

// In a real app, you would fetch the admin profile data from an API
const adminProfile = {
  id: "1",
  name: "John Doe",
  email: "john.doe@company.com",
  role: "admin",
  avatar: "/placeholder.svg",
  phone: "+1 (555) 123-4567",
  department: "Engineering",
  joinedDate: "2022-03-15",
  bio: "Experienced administrator with a background in software engineering and project management.",
}

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and profile settings.</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm defaultValues={adminProfile} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>View your recent account activity and login history.</CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityLog />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your password and security preferences.</CardDescription>
            </CardHeader>
            <CardContent>
              <SecuritySettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

