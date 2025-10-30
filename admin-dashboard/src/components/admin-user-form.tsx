import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Loader2, Copy } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    role: z.enum(["admin", "super-admin", "editor"], {
      required_error: "Please select a role.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    permissions: z.array(z.string()).optional(),
    sendInvite: z.boolean().default(true),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

interface AdminUserFormProps {
  defaultValues?: Partial<FormValues>;
}

const permissions = [
  { id: "view_dashboard", label: "View Dashboard" },
  { id: "manage_clients", label: "Manage Clients" },
  { id: "manage_api_clients", label: "Manage API Clients" },
  { id: "manage_admin_users", label: "Manage Admin Users" },
  { id: "view_reports", label: "View Reports" },
  { id: "manage_settings", label: "Manage Settings" },
];

export function AdminUserForm({ defaultValues }: AdminUserFormProps = {}) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      email: "",
      role: "editor",
      password: "",
      confirmPassword: "",
      permissions: ["view_dashboard"],
      sendInvite: true,
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      console.log(values);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Admin user created",
        description: "The new admin user has been created successfully.",
      });

      navigate("/admin-users");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const generateRandomPassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setGeneratedPassword(password);
    form.setValue("password", password);
    form.setValue("confirmPassword", password);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
    toast({
      title: "Copied to clipboard",
      description: "Password has been copied to clipboard.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Info */}
        <div className="grid gap-6 md:grid-cols-2">
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
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="super-admin">Super Admin</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  The role determines the user's base permissions.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Password Section */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Password</h3>
                <Button
                  type="button"
                  variant="outline"
                  onClick={generateRandomPassword}
                >
                  Generate Random Password
                </Button>
              </div>

              {generatedPassword && (
                <div className="flex items-center gap-2 rounded-md bg-muted p-3">
                  <code className="text-sm">{generatedPassword}</code>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={copyToClipboard}
                    className="ml-auto"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormDescription>
                        Password must be at least 8 characters.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Permissions */}
        <div>
          <h3 className="text-lg font-medium mb-4">Permissions</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="permissions"
              render={() => (
                <FormItem>
                  {permissions.map((permission) => (
                    <FormField
                      key={permission.id}
                      control={form.control}
                      name="permissions"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(permission.id)}
                              onCheckedChange={(checked) =>
                                checked
                                  ? field.onChange([
                                      ...(field.value || []),
                                      permission.id,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (v) => v !== permission.id
                                      )
                                    )
                              }
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {permission.label}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Send Invite */}
        <FormField
          control={form.control}
          name="sendInvite"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Send invitation email</FormLabel>
                <FormDescription>
                  Send an email invitation to the new admin user.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {/* Actions */}
        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Admin User
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin-users")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
