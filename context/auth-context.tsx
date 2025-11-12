"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { UserClaims } from "@/interfaces/token";
import { UserProfile, UserRegistrationFormData } from "@/interfaces/user";
import { ResponseDto } from "@/interfaces/response-dto";
import { UserApi } from "@/axios/user";
import api from "@/axios/http";
import { StudentApi } from "@/axios/student";
import { useSonner } from "@/hooks/use-sonner";

interface AuthContextType {
  login: (email: string, password: string) => Promise<ResponseDto<any>>;
  register: (data: UserRegistrationFormData) => Promise<ResponseDto<any>>;
  logout: () => Promise<boolean>;
  sendVerificationEmail: (email: string) => Promise<ResponseDto<any>>;
  confirmVerificationEmail: (
    userId: string,
    token: string
  ) => Promise<ResponseDto<any>>;
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
  const { showToast } = useSonner();

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
      fetchUserInfo();
    }
  }, [accessTokenState]);

  const login = async (
    email: string,
    password: string
  ): Promise<ResponseDto<any>> => {
    try {
      const response = await api.post("/authentication/sign-in", {
        email: email,
        password: password,
      });
      const { accessToken } = response.data.result;
      localStorage.setItem("accessToken", accessToken);
      setAccessTokenState(accessToken);
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      const e: any = error;
      const message = e.response.data.message || "Please try again";
      showToast("error", {
        title: "Login Failed",
        description: message,
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("accessToken");
      setAccessTokenState(null);
      setCurrentUserClaims(null);
      setCurrentUserProfile(null);
      return true;
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  const register = async (
    data: UserRegistrationFormData
  ): Promise<ResponseDto<any>> => {
    const result = await StudentApi.studentRegister(data);
    return result;
  };

  const sendVerificationEmail = async (
    email: string
  ): Promise<ResponseDto<any>> => {
    try {
      const response = await api.post("/authentication/email/verification/send", {
        email: email,
      });
      showToast("success", {
        title: "Verification Sent successfully",
        description: response.data.message,
      });
      return response.data;
    } catch (error) {
      console.error("Verification failed:", error);
      const e: any = error;
      const message = e.response.data.message || "Please try again";
      showToast("error", {
        title: "Verification Failed",
        description: message,
      });
      throw error;
    }
  };

  const confirmVerificationEmail = async (
    userId: string,
    token: string
  ): Promise<ResponseDto<any>> => {
    try {
      const response = await api.post("/authentication/email/verification/confirm", {
        userId: userId,
        token: token,
      });
      return response.data;
    } catch (error) {
      console.error("Verification failed:", error);
      const e: any = error;
      const message = e.response.data.message || "Please try again";
      showToast("error", {
        title: "Verification Failed",
        description: message,
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        register,
        sendVerificationEmail,
        confirmVerificationEmail,
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
