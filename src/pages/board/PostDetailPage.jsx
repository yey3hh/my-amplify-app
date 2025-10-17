// pages/board/PostDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import api from "../../config/apiConfig";
// 공통 컴포넌트 import
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorAlert from "../../components/common/ErrorAlert";

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 상태 관리
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 컴포넌트 마운트 시 게시글 조회
  useEffect(() => {
    // 게시글 조회 함수
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/api/posts/${id}`);
        if (response.data.success) {
          setPost(response.data.data);
        }
      } catch (error) {
        console.error("게시글 조회 실패:", error);
        const errorMessage =
          error.response?.data?.message || "게시글을 불러오는데 실패했습니다.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // 로딩 중일 때 - LoadingSpinner 컴포넌트 사용
  if (loading) {
    return <LoadingSpinner message="게시글을 불러오는 중..." />;
  }

  // 에러 발생 시 - ErrorAlert 컴포넌트 사용
  if (error) {
    return (
      <div className="mt-3">
        <ErrorAlert
          message={error}
          variant="danger"
          onRetry={fetchPost} // 재시도 함수 연결
          onGoBack={() => navigate("/posts")} // 목록으로 돌아가기
        />
      </div>
    );
  }

  // 게시글이 없을 때 - ErrorAlert 컴포넌트 사용
  if (!post) {
    return (
      <div className="mt-3">
        <ErrorAlert
          message="게시글을 찾을 수 없습니다."
          variant="warning"
          onGoBack={() => navigate("/posts")} // 목록으로만 제공
        />
      </div>
    );
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <Card>
          {/* 게시글 헤더 - 제목과 작성 정보 */}
          <Card.Header>
            <h3>{post.title}</h3>
            <div className="text-muted">
              <small>
                작성자: {post.authorName} | 작성일:{" "}
                {new Date(post.createdAt).toLocaleString()}
              </small>
            </div>
          </Card.Header>

          {/* 게시글 본문 */}
          <Card.Body>
            <div style={{ whiteSpace: "pre-wrap", minHeight: "200px" }}>
              {post.content}
            </div>
          </Card.Body>

          {/* 하단 버튼 영역 */}
          <Card.Footer>
            <div className="d-flex justify-content-start">
              <Button variant="secondary" onClick={() => navigate("/posts")}>
                목록으로
              </Button>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default PostDetailPage;
