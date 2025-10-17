import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext"; // Context import

// AuthProviderProvider 컴포넌트 - 실제 인증 상태를 관리하고 제공
export const AuthProvider = ({ children }) => {
  // 인증 상태 관리
  const [user, setUser] = useState(null); // 로그인한 사용자 정보
  const [loading, setLoading] = useState(true); // 초기 로딩 상태
  // 초기 로딩 상태(loading)를 Context에서 관리하는 이유
  //loading 상태는 애플리케이션이 Local Storage에서 사용자 인증 정보를 확인하고 복원하는 비동기 작업을 완료했는지 여부
  //만약 이 loading 상태가 없다면, 처음에는 user가 null이므로, 앱이 사용자에게 로그아웃된 화면 (예: 로그인 페이지)을 보여줌
  // 다시 useEffect가 실행된 후 user 정보가 발견되면, 앱은 갑자기 로그인된 화면으로 바뀜
  // loading이 true인 동안은 UI가 로딩 스피너로 사용자가 잠시 기다리도록 유도함

  // 앱 시작 시 localStorage에서 사용자 정보 복원
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false); // 사용자 정보를 로딩했으므로 상태 변경해서 알림
  }, []);

  // 로그인 처리 - 사용자 정보 저장
  // 사용자 정보를 상태(state)에 설정하고 로컬 저장소(localStorage)에 저장하는 로그인(login) 과정을 담당
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 로그아웃 처리 - 모든 정보 제거
  // 사용자 상태(state)를 초기화하고 로컬 저장소에서 인증 정보(token, user)를 제거하는 로그아웃(logout) 과정을 담당
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Context로 제공할 값
  const value = {
    user, // 현재 사용자 정보
    loading, // 로딩 상태
    login, // 로그인 함수
    logout, // 로그아웃 함수
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
