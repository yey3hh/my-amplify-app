// pages/LoginPage.jsx
import React, { useState, useContext } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);  // Context에서 login 함수만 가져옴
  
  // 폼 상태 관리
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 입력 변경 처리
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 로그인 처리 - 4단계로 명확하게 구성
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. 로그인 API 호출 - 직접 axios 사용
      const loginResponse = await axios.post(
        'http://localhost:8080/api/auth/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      // 2. JWT 토큰 추출 및 저장
      const token = loginResponse.headers['authorization'];
      if (token) {
        // Bearer 제거하고 토큰만 저장
        const jwtToken = token.replace('Bearer ', '');
        localStorage.setItem('token', jwtToken);
      }

      // 3. 내 정보 조회 - 저장한 토큰을 포함하여 요청
      const userResponse = await axios.get(
        'http://localhost:8080/api/members/me',
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      // 4. Context에 사용자 정보 저장 후 홈으로 이동
      if (userResponse.data.success) {
        login(userResponse.data.data);  // Context의 login 함수 호출
        navigate('/');  // 홈 페이지로 이동
      }

    } catch (error) {
      console.error('로그인 실패:', error);
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <Card>
          <Card.Body>
            <h3 className="text-center mb-4">로그인</h3>
            
            {/* 에러 메시지 표시 */}
            {error && <Alert variant="danger">{error}</Alert>}
            
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
                {loading ? '로그인 중...' : '로그인'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;