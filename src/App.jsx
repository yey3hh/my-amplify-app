// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Context Provider
import { AuthProvider } from "./contexts/AuthProvider";

// 레이아웃 컴포넌트
import Navigation from "./components/common/Navigation";

// 페이지 컴포넌트
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/user/LoginPage";
import RegisterPage from "./pages/user/RegisterPage";
import PostListPage from "./pages/board/PostListPage";
import PostWritePage from "./pages/board/PostWritePage";
import PostDetailPage from "./pages/board/PostDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import FileUploadPage from "./pages/FileUploadPage"; // 추가

function App() {
  return (
    <BrowserRouter>
      {/* AuthProvider로 전체 앱 감싸기 - 모든 컴포넌트에서 인증 상태 사용 가능 */}
      <AuthProvider>
        <div className="App">
          {/* 네비게이션 바 */}
          <Navigation />

          {/* 메인 컨텐츠 영역 */}
          <Container className="mt-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/posts" element={<PostListPage />} />
              <Route path="/write" element={<PostWritePage />} />
              <Route path="/posts/:id" element={<PostDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/upload" element={<FileUploadPage />} /> {/* 추가 */}
            </Routes>
          </Container>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
