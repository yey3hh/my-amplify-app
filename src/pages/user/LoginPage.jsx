// pages/user/LoginPage.jsx
import React, { useState, useContext } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../config/apiConfig";
// 공통 컴포넌트 import
import ErrorAlert from "../../components/common/ErrorAlert";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // 폼 상태 관리
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(""); // 에러 메시지 상태 추가
  const [loading, setLoading] = useState(false);

  // 입력 변경 처리
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // 입력 시 에러 메시지 초기화
    if (error) setError("");
  };

  // 로그인 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // 에러 초기화
    setLoading(true);

    try {
      // 1. 로그인 API 호출
      const loginResponse = await api.post("/api/auth/login", formData);

      // 2. JWT 토큰 추출 및 저장
      const token = loginResponse.headers["authorization"];
      if (token) {
        const jwtToken = token.replace("Bearer ", "");
        localStorage.setItem("token", jwtToken);
      }

      // 3. 내 정보 조회
      const userResponse = await api.get("/api/members/me");

      // 4. Context에 사용자 정보 저장 후 홈으로 이동
      if (userResponse.data.success) {
        login(userResponse.data.data);
        navigate("/");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      // 에러 메시지 설정 (alert 대신 ErrorAlert 컴포넌트 사용)
      const errorMessage =
        error.response?.data?.message ||
        "아이디 또는 비밀번호가 올바르지 않습니다.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // 재시도 함수
  const handleRetry = () => {
    setError("");
    setFormData({ username: "", password: "" });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <Card>
          <Card.Body>
            <h3 className="text-center mb-4">로그인</h3>

            {/* 에러 메시지 표시 - ErrorAlert 컴포넌트 사용 */}
            {error && (
              <ErrorAlert
                message={error}
                variant="danger"
                onRetry={handleRetry}
              />
            )}

            <Form onSubmit={handleSubmit}>
              {/* 아이디 입력 */}
              <Form.Group className="mb-3">
                <Form.Label>아이디</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* 비밀번호 입력 */}
              <Form.Group className="mb-3">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* 로그인 버튼 */}
              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={loading}
              >
                {loading ? "로그인 중..." : "로그인"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
