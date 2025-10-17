// pages/board/PostListPage.jsx
import React, { useState, useEffect } from "react";
import api from "../../config/apiConfig";
// 재사용 컴포넌트 import
import LoadingSpinner from "../../components/common/LoadingSpinner";
import PostList from "../../components/board/PostList";

const PostListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 컴포넌트 마운트 시 게시글 목록 조회
  useEffect(() => {
    fetchPosts();
  }, []);

  // 게시글 목록 조회 함수
  const fetchPosts = async () => {
    try {
      const response = await api.get("/api/posts");
      if (response.data.success) {
        setPosts(response.data.data);
      }
    } catch (error) {
      console.error("게시글 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  // 로딩 중일 때 - LoadingSpinner 컴포넌트 사용
  if (loading) {
    return <LoadingSpinner message="게시글을 불러오는 중..." />;
  }

  return (
    <div>
      {/* 헤더 영역 */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>게시글 목록</h2>
      </div>

      {/* PostList 컴포넌트 사용 - 기본은 table 뷰 */}
      <PostList 
        posts={posts} 
        viewType="table"  // 테이블 형태로 표시
        emptyMessage="아직 작성된 게시글이 없습니다." 
      />
    </div>
  );
};

export default PostListPage;