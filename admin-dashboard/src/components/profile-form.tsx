
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Loader2, Upload } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  department: z.string().optional(),
  bio: z
    .string()
    .max(500, {
      message: "Bio must not exceed 500 characters.",
    })
    .optional(),
})

type FormValues = z.infer<typeof formSchema>

interface ProfileFormProps {
  defaultValues?: Partial<FormValues> & {
    id?: string
    avatar?: string
    role?: string
    joinedDate?: string
  }
}

export function ProfileForm({ defaultValues }: ProfileFormProps = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [avatar, setAvatar] = useState(defaultValues?.avatar || "/placeholder.svg")

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      email: defaultValues?.email || "",
      phone: defaultValues?.phone || "",
      department: defaultValues?.department || "",
      bio: defaultValues?.bio || "",
    },
  })

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)

    try {
      // In a real app, you would submit to an API
      console.log(values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatar} alt={defaultValues?.name || "Profile"} />
              <AvatarFallback>
                {defaultValues?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("") || "AD"}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" className="gap-2">
              <Upload className="h-4 w-4" />
              Change Avatar
            </Button>
          </div>
          <div className="flex-1 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input placeholder="Engineering" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us about yourself..." className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormDescription>Brief description for your profile. URLs are hyperlinked.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}

