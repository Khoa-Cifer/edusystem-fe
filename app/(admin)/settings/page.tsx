import { AdminLayout } from "@/components/admin-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Save } from "lucide-react"

export default function AdminSettings() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">System Settings</h1>
          <p className="text-muted-foreground">Configure platform settings and preferences</p>
        </div>

        {/* General Settings */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold mb-6">General Settings</h3>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="platform-name" className="text-sm font-medium mb-2 block">
                  Platform Name
                </Label>
                <Input id="platform-name" defaultValue="EduFlow" className="bg-muted" />
              </div>
              <div>
                <Label htmlFor="support-email" className="text-sm font-medium mb-2 block">
                  Support Email
                </Label>
                <Input id="support-email" defaultValue="support@eduflow.com" className="bg-muted" />
              </div>
            </div>
            <div>
              <Label htmlFor="platform-url" className="text-sm font-medium mb-2 block">
                Platform URL
              </Label>
              <Input id="platform-url" defaultValue="https://eduflow.com" className="bg-muted" />
            </div>
          </div>
        </Card>

        {/* Feature Toggles */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold mb-6">Feature Toggles</h3>
          <div className="space-y-4">
            {[
              { label: "Enable User Registration", description: "Allow new users to sign up" },
              { label: "Enable Lesson Sharing", description: "Allow teachers to share lessons" },
              { label: "Enable Spaced Repetition", description: "Enable SM-2 algorithm for reviews" },
              { label: "Enable PWA Mode", description: "Allow offline access to platform" },
            ].map((feature, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">{feature.label}</p>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
        </Card>

        {/* Email Configuration */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold mb-6">Email Configuration</h3>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="smtp-host" className="text-sm font-medium mb-2 block">
                  SMTP Host
                </Label>
                <Input id="smtp-host" placeholder="smtp.gmail.com" className="bg-muted" />
              </div>
              <div>
                <Label htmlFor="smtp-port" className="text-sm font-medium mb-2 block">
                  SMTP Port
                </Label>
                <Input id="smtp-port" placeholder="587" className="bg-muted" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="smtp-user" className="text-sm font-medium mb-2 block">
                  SMTP Username
                </Label>
                <Input id="smtp-user" className="bg-muted" />
              </div>
              <div>
                <Label htmlFor="smtp-password" className="text-sm font-medium mb-2 block">
                  SMTP Password
                </Label>
                <Input id="smtp-password" type="password" className="bg-muted" />
              </div>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
    </AdminLayout>
  )
}
