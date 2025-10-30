
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "next-themes"

const formSchema = z.object({
  theme: z.enum(["light", "dark", "system"], {
    required_error: "Please select a theme.",
  }),
  density: z.enum(["default", "comfortable", "compact"], {
    required_error: "Please select a density.",
  }),
  sidebarPosition: z.enum(["left", "right"], {
    required_error: "Please select a sidebar position.",
  }),
})

type FormValues = z.infer<typeof formSchema>

export function AppearanceSettings() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setTheme } = useTheme()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme: "system",
      density: "default",
      sidebarPosition: "left",
    },
  })

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)

    try {
      // Set theme using next-themes
      setTheme(values.theme)

      // In a real app, you would submit other settings to an API
      console.log(values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Appearance updated",
        description: "Your appearance settings have been updated.",
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Theme</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="light" />
                    </FormControl>
                    <FormLabel className="font-normal">Light</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="dark" />
                    </FormControl>
                    <FormLabel className="font-normal">Dark</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="system" />
                    </FormControl>
                    <FormLabel className="font-normal">System</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>Select your preferred theme or use your system settings.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <FormField
          control={form.control}
          name="density"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Density</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="default" />
                    </FormControl>
                    <FormLabel className="font-normal">Default</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="comfortable" />
                    </FormControl>
                    <FormLabel className="font-normal">Comfortable</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="compact" />
                    </FormControl>
                    <FormLabel className="font-normal">Compact</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>Adjust the density of the UI elements.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <FormField
          control={form.control}
          name="sidebarPosition"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Sidebar Position</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="left" />
                    </FormControl>
                    <FormLabel className="font-normal">Left</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="right" />
                    </FormControl>
                    <FormLabel className="font-normal">Right</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>Choose the position of the sidebar.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Preferences
        </Button>
      </form>
    </Form>
  )
}

