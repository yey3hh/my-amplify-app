// pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const  RegisterPage_Old = () => {
  const navigate = useNavigate();
  
  // 폼 상태 관리
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: ''
  });
  
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  // 입력 변경 처리
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 회원가입 처리 - axios 직접 사용
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    setLoading(true);

    try {
      // 회원가입 API 호출
      const response = await axios.post(
        'http://localhost:8080/api/members',
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data.success) {
        // 성공 메시지 표시
        setMessage({ 
          text: '회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.', 
          type: 'success' 
        });
        
        // 2초 후 로그인 페이지로 이동
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
      // 에러 메시지 표시
      setMessage({ 
        text: error.response?.data?.message || '회원가입에 실패했습니다.', 
        type: 'danger' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <Card>
          <Card.Body>
            <h3 className="text-center mb-4">회원가입</h3>
            
            {/* 메시지 표시 (성공/실패) */}
            {message.text && (
              <Alert variant={message.type}>{message.text}</Alert>
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

              {/* 이름 입력 */}
              <Form.Group className="mb-3">
                <Form.Label>이름</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* 회원가입 버튼 */}
              <Button 
                variant="primary" 
                type="submit" 
                className="w-100"
                disabled={loading}
              >
                {loading ? '가입 중...' : '회원가입'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default RegisterPage_Old;