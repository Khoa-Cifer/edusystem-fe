import { AdminLayout } from "@/components/admin-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Filter, MoreVertical, UserPlus } from "lucide-react"

export default function UserManagement() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">User Management</h1>
            <p className="text-muted-foreground">Manage teachers, students, and administrators</p>
          </div>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search users by name or email..." className="pl-9 bg-card" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admins</SelectItem>
              <SelectItem value="teacher">Teachers</SelectItem>
              <SelectItem value="student">Students</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="active">
            <SelectTrigger className="w-[140px] bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="all">All Status</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Users Table */}
        <Card className="p-6 bg-card border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">User</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Role</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Joined</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Last Active</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "Professor Smith",
                    email: "smith@school.edu",
                    initials: "PS",
                    role: "Admin",
                    status: "Active",
                    joined: "Jan 15, 2024",
                    lastActive: "2 min ago",
                  },
                  {
                    name: "Dr. Emily Chen",
                    email: "e.chen@school.edu",
                    initials: "EC",
                    role: "Teacher",
                    status: "Active",
                    joined: "Feb 20, 2024",
                    lastActive: "15 min ago",
                  },
                  {
                    name: "James Wilson",
                    email: "j.wilson@school.edu",
                    initials: "JW",
                    role: "Teacher",
                    status: "Active",
                    joined: "Mar 10, 2024",
                    lastActive: "1 hour ago",
                  },
                  {
                    name: "Emma Davis",
                    email: "emma.d@school.edu",
                    initials: "ED",
                    role: "Student",
                    status: "Active",
                    joined: "Apr 5, 2024",
                    lastActive: "30 min ago",
                  },
                  {
                    name: "Michael Johnson",
                    email: "m.johnson@school.edu",
                    initials: "MJ",
                    role: "Student",
                    status: "Inactive",
                    joined: "Apr 12, 2024",
                    lastActive: "5 days ago",
                  },
                ].map((user, i) => (
                  <tr key={i} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {user.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className={
                          user.role === "Admin"
                            ? "bg-primary/10 text-primary border-primary/20"
                            : user.role === "Teacher"
                              ? "bg-secondary/10 text-secondary border-secondary/20"
                              : "bg-accent/10 text-accent border-accent/20"
                        }
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {user.status === "Active" ? (
                          <>
                            <div className="w-2 h-2 bg-accent rounded-full" />
                            <span className="text-sm text-accent">{user.status}</span>
                          </>
                        ) : (
                          <>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                            <span className="text-sm text-muted-foreground">{user.status}</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{user.joined}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{user.lastActive}</td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  )
}
