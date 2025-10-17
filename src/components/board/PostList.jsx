// components/board/PostList.jsx
import React from 'react';
import { Table, Alert, Row, Col } from 'react-bootstrap';
import PostItem from './PostItem';

/**
 * 게시글 목록 컴포넌트
 * @param {Array} posts - 게시글 배열
 * @param {string} viewType - 표시 형태 ('table', 'card', 'list')
 * @param {string} emptyMessage - 게시글이 없을 때 메시지
 */
const PostList = ({ 
  posts = [], 
  viewType = 'table', 
  emptyMessage = '등록된 게시글이 없습니다.' 
}) => {
  
  // 게시글이 없을 때
  if (posts.length === 0) {
    return <Alert variant="info">{emptyMessage}</Alert>;
  }

  // 테이블 뷰
  if (viewType === 'table') {
    return (
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th width="10%">번호</th>
            <th width="50%">제목</th>
            <th width="20%">작성자</th>
            <th width="20%">작성일</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <PostItem key={post.id} post={post} viewType="table" />
          ))}
        </tbody>
      </Table>
    );
  }

  // 카드 뷰 (격자 레이아웃)
  if (viewType === 'card') {
    return (
      <Row xs={1} md={2} lg={3} className="g-4">
        {posts.map(post => (
          <Col key={post.id}>
            <PostItem post={post} viewType="card" />
          </Col>
        ))}
      </Row>
    );
  }

  // 리스트 뷰 (모바일 친화적)
  if (viewType === 'list') {
    return (
      <div>
        {posts.map(post => (
          <PostItem key={post.id} post={post} viewType="list" />
        ))}
      </div>
    );
  }
};

export default PostList;