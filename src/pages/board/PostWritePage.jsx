// pages/board/PostWritePage.jsx
import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../config/apiConfig";
// 공통 컴포넌트 import
import ErrorAlert from "../../components/common/ErrorAlert";

const PostWritePage = () => {
  const navigate = useNavigate();

  // 폼 상태 관리
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [error, setError] = useState("");
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

  // 게시글 작성 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/api/posts", formData);

      if (response.data.success) {
        // 성공 시 목록 페이지로 이동
        navigate("/posts");
      }
    } catch (error) {
      console.error("게시글 작성 실패:", error);
      // 에러 메시지 설정
      const errorMessage =
        error.response?.data?.message ||
        "게시글 작성에 실패했습니다. 다시 시도해주세요.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // 재시도 함수
  const handleRetry = () => {
    setError("");
    // 폼 데이터는 유지 (사용자가 작성한 내용 보존)
  };

  // 목록으로 돌아가기
  const handleGoBack = () => {
    navigate("/posts");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <Card>
          <Card.Body>
            <h3 className="mb-4">게시글 작성</h3>

            {/* 에러 메시지 표시 - ErrorAlert 컴포넌트 사용 */}
            {error && (
              <ErrorAlert
                message={error}
                variant="danger"
                onRetry={handleRetry}
                onGoBack={handleGoBack}
              />
            )}

            <Form onSubmit={handleSubmit}>
              {/* 제목 입력 */}
              <Form.Group className="mb-3">
                <Form.Label>제목</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="제목을 입력하세요"
                  required
                  maxLength={100}
                />
                <Form.Text className="text-muted">
                  최대 100자까지 입력 가능합니다
                </Form.Text>
              </Form.Group>

              {/* 내용 입력 */}
              <Form.Group className="mb-3">
                <Form.Label>내용</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="내용을 입력하세요"
                  required
                  maxLength={5000}
                />
                <Form.Text className="text-muted">
                  {formData.content.length}/5000자
                </Form.Text>
              </Form.Group>

              {/* 버튼 영역 */}
              <div className="d-flex gap-2">
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? "작성 중..." : "작성완료"}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => navigate("/posts")}
                  disabled={loading}
                >
                  취소
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default PostWritePage;
