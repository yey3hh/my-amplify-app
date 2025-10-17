// components/board/PostItem.jsx
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/**
 * 게시글 아이템 컴포넌트
 * @param {Object} post - 게시글 데이터
 * @param {string} viewType - 표시 형태 ('table', 'card', 'list')
 */
const PostItem = ({ post, viewType = 'table' }) => {
  // 날짜 포맷팅 유틸 함수
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  // 테이블 행 형태
  if (viewType === 'table') {
    return (
      <tr>
        <td>{post.id}</td>
        <td>
          <Link to={`/posts/${post.id}`} className="text-decoration-none">
            {post.title}
          </Link>
        </td>
        <td>{post.authorName}</td>
        <td>{formatDate(post.createdAt)}</td>
      </tr>
    );
  }

  // 카드 형태 (격자 레이아웃용)
  if (viewType === 'card') {
    return (
      <Card className="h-100 shadow-sm">
        <Card.Body>
          <Card.Title>
            <Link to={`/posts/${post.id}`} className="text-decoration-none">
              {post.title}
            </Link>
          </Card.Title>
          <Card.Text className="text-muted small">
            작성자: {post.authorName} | {formatDate(post.createdAt)}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  // 리스트 형태 (모바일 친화적)
  if (viewType === 'list') {
    return (
      <div className="border-bottom py-3">
        <h5>
          <Link to={`/posts/${post.id}`} className="text-decoration-none">
            {post.title}
          </Link>
        </h5>
        <small className="text-muted">
          {post.authorName} · {formatDate(post.createdAt)}
        </small>
      </div>
    );
  }
};

export default PostItem;