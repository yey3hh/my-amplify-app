
// pages/HomePage.jsx
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="text-center mt-5">
      <h1>Spring Boot + React 게시판</h1>
      <p className="lead mt-3">
        JWT 인증 기반 RESTful API 연동 예제입니다.
      </p>
      
      <div className="mt-4">
        <Link to="/posts">
          <Button variant="primary" size="lg">
            게시글 보러가기
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;