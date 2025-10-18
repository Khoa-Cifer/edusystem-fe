"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import http from "@/axios/http";
import { jwtDecode } from "jwt-decode";
import { UserClaims } from "@/interfaces/token";
import { UserApi } from "@/axios/user";
import { UserProfile, UserRegistrationFormData } from "@/interfaces/user";
import { convertDateString } from "@/lib/utils";
import { ResponseDto } from "@/interfaces/response-dto";
import { showNotification } from "@/components/notification-helper";

interface AuthContextType {
  login: (email: string, password: string) => Promise<any>;
  register: (data: UserRegistrationFormData) => Promise<any>;
  logout: () => Promise<void>;
  authenticatedUser: UserProfile | null;
  userClaims: UserClaims | null;
  accessToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessTokenState, setAccessTokenState] = useState<string | null>(null);
  const [currentUserClaims, setCurrentUserClaims] = useState<UserClaims | null>(
    null
  );
  const [currentUserProfile, setCurrentUserProfile] =
    useState<UserProfile | null>(null);

  const fetchUserInfo = async () => {
    const response = await UserApi.getUserInfo();
    setCurrentUserProfile(response.result);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessTokenState(token);
      const user = jwtDecode<UserClaims>(token);
      setCurrentUserClaims(user);
    }
    fetchUserInfo();
  }, [accessTokenState]);

  const login = async (email: string, password: string) => {
    try {
      const response = await http.post("/auth/sign-in", {
        email: email,
        password: password,
      });
      const { accessToken } = response.data.result.accessToken;
      localStorage.setItem("accessToken", accessToken);
      setAccessTokenState(accessToken);
      window.location.href = "/";
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("accessToken");
      setAccessTokenState(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const register = async (
    data: UserRegistrationFormData
  ): Promise<ResponseDto<any>> => {
    try {
      let url = null;
      if (data.role == "student") {
        url = "/auth/students-register";
      } else if (data.role == "teacher") {
        url = "/auth/teacher-register";
      } else {
        console.error("Invalid role");
        throw "Invalid role";
      }
      const response = await http.post(url, {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        phoneNumber: data.phoneNumber,
        fullName: data.fullName,
        address: data.address,
        gender: data.gender,
        birthDate: convertDateString(data.birthDate),
      });
      const { accessToken } = response.data.result.accessToken;
      localStorage.setItem("accessToken", accessToken);
      setAccessTokenState(accessToken);
      return response.data;
    } catch (error) {
      console.error("Register failed:", error);
      showNotification.error("Registration Failed", "Please try again");
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        register,
        userClaims: currentUserClaims,
        accessToken: accessTokenState,
        authenticatedUser: currentUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
