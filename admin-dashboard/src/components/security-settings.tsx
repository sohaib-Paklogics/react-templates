import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(1, {
      message: "Current password is required.",
    }),
    newPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })

type PasswordFormValues = z.infer<typeof passwordFormSchema>

export function SecuritySettings() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true)

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: PasswordFormValues) {
    setIsSubmitting(true)

    try {
      // In a real app, you would submit to an API
      console.log(values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      })

      form.reset()
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

  const handleTwoFactorToggle = async (checked: boolean) => {
    // In a real app, you would call an API to enable/disable 2FA
    setTwoFactorEnabled(checked)

    toast({
      title: checked ? "Two-factor authentication enabled" : "Two-factor authentication disabled",
      description: checked ? "Your account is now more secure." : "Two-factor authentication has been disabled.",
    })
  }

  const handleEmailNotificationsToggle = async (checked: boolean) => {
    // In a real app, you would call an API to update notification settings
    setEmailNotificationsEnabled(checked)

    toast({
      title: "Notification settings updated",
      description: checked
        ? "You will receive security notifications via email."
        : "Email security notifications have been disabled.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your password to keep your account secure.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormDescription>Password must be at least 8 characters long.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Password
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security to your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium">Two-factor authentication</h4>
              <p className="text-sm text-muted-foreground">Secure your account with two-factor authentication.</p>
            </div>
            <Switch checked={twoFactorEnabled} onCheckedChange={handleTwoFactorToggle} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Notifications</CardTitle>
          <CardDescription>Manage how you receive security alerts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium">Email notifications</h4>
              <p className="text-sm text-muted-foreground">Receive security alerts via email.</p>
            </div>
            <Switch checked={emailNotificationsEnabled} onCheckedChange={handleEmailNotificationsToggle} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

