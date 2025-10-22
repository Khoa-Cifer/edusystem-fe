"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, CheckCircle, Mail, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { showNotification } from "@/components/notification-helper";

export default function SignupPage() {
  const { register, sendVerificationEmail } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    address: "",
    gender: "",
    birthDate: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSendEmail = async () => {
    if (!formData.email) {
      showNotification.error("Error", "Email not found");
      return;
    }

    await sendVerificationEmail(formData.email);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(
        formData.password
      )
    )
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.birthDate) newErrors.birthDate = "Birth date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsSubmitting(true);

        console.log("Form submitted:", formData);
        const response = await register(formData);
        if (response) {
          setIsRegistered(true);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-background dark flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 bg-card border-border text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-2">Registration Successful!</h1>
          <p className="text-muted-foreground mb-6">
            Welcome to EduFlow, {formData.fullName}! Your account has been
            created successfully.
          </p>

          {/* Success Details Card */}
          <div className="bg-background rounded-lg p-4 mb-6 text-left space-y-3 border border-border">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Email
              </p>
              <p className="text-sm font-medium">{formData.email}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Phone
              </p>
              <p className="text-sm font-medium">{formData.phoneNumber}</p>
            </div>
          </div>

          {/* Email Verification Notice */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6 flex gap-3">
            <Mail className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="text-sm font-medium text-blue-500">
                Verify your email
              </p>
              <p className="text-xs text-blue-400 mt-1">
                We&apos;ve sent a verification link to {formData.email}. Please
                check your inbox.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button onClick={handleSendEmail} className="w-full" size="lg">
              Send Email to {formData.email}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Link href="/login" className="block">
              <Button
                variant="outline"
                className="w-full bg-transparent"
                size="lg"
              >
                Back to Login
              </Button>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground mt-6">
            Already verified?{" "}
            <Link href="/dashboard" className="text-primary hover:underline">
              Go to dashboard
            </Link>
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 bg-card border-border">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
            <BookOpen className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Get started with EduFlow
          </p>
        </div>

        <div className="space-y-6">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-foreground">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full name *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="bg-background"
                />
                {errors.fullName && (
                  <p className="text-xs text-red-500">{errors.fullName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone number *</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="+84 (555) 000-000"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="bg-background"
                />
                {errors.phoneNumber && (
                  <p className="text-xs text-red-500">{errors.phoneNumber}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate">Birth date *</Label>
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="bg-background"
                />
                {errors.birthDate && (
                  <p className="text-xs text-red-500">{errors.birthDate}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground text-sm"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && (
                  <p className="text-xs text-red-500">{errors.gender}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                name="address"
                type="text"
                placeholder="123 Main Street, City, State 12345"
                value={formData.address}
                onChange={handleChange}
                className="bg-background"
              />
              {errors.address && (
                <p className="text-xs text-red-500">{errors.address}</p>
              )}
            </div>
          </div>

          {/* Account Information Section */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-foreground">
              Account Information
            </h2>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="bg-background"
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-background"
                />
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm password *</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-background"
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create account"}
          </Button>
        </div>

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">
            Already have an account?{" "}
          </span>
          <Link
            href="/login"
            className="text-primary hover:underline font-medium"
          >
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
}
