'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import Keycloak from 'keycloak-js';
import { ENV } from '@/shared/config/env';
import { apiClient } from '@/shared/api/api-client';

interface AuthContextType {
  isAuthenticated: boolean;
  isInitialized: boolean;
  keycloak: Keycloak | null;
  login: () => void;
  logout: () => void;
  register: () => void;
  token: string | undefined;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isInitialized: false,
  keycloak: null,
  login: () => {},
  logout: () => {},
  register: () => {},
  token: undefined,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
  
  // React 18 strict mode chạy useEffect 2 lần ở dev, dùng ref để chặn init lại
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    const kc = new Keycloak({
      url: ENV.KEYCLOAK_URL,
      realm: ENV.KEYCLOAK_REALM,
      clientId: ENV.KEYCLOAK_CLIENT_ID,
    });
    
    setKeycloak(kc);

    kc.init({
      onLoad: 'check-sso', // Kiểm tra xem user đã đăng nhập chưa, không tự động văng ra trang login
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      pkceMethod: 'S256',
    })
      .then((authenticated) => {
        setIsAuthenticated(authenticated);
        setIsInitialized(true);

        // Cập nhật Interceptor của Axios để nhét Token vào
        if (authenticated) {
          apiClient.interceptors.request.use(
            (config) => {
              if (kc.token) {
                config.headers.Authorization = `Bearer ${kc.token}`;
              }
              return config;
            },
            (error) => Promise.reject(error)
          );
        }
      })
      .catch((error) => {
        console.error('Keycloak initialization failed', error);
        setIsInitialized(true);
      });

    // Xử lý khi token sắp hết hạn
    kc.onTokenExpired = () => {
      kc.updateToken(30).then((refreshed) => {
        if (refreshed) {
          console.log('Token was successfully refreshed');
        } else {
          console.log('Token is still valid');
        }
      }).catch(() => {
        console.error('Failed to refresh token, forcing logout');
        kc.logout();
      });
    };
  }, []);

  const login = () => {
    if (keycloak) {
      keycloak.login().catch(console.error);
    } else {
      console.error("Keycloak instance not found or not initialized");
    }
  };

  const logout = () => {
    if (keycloak) {
      keycloak.logout({ redirectUri: window.location.origin });
    }
  };

  const register = () => {
    if (keycloak) {
      keycloak.register().catch(console.error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isInitialized,
        keycloak,
        login,
        logout,
        register,
        token: keycloak?.token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
