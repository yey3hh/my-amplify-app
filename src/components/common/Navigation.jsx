// components/Navigation.jsx
import React, { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Navigation = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext); // user와 logout만 필요

  // 로그아웃 처리
  const handleLogout = () => {
    logout(); // Context의 logout 함수 호출
    navigate("/"); // 홈으로 이동
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* 로고/홈 링크 */}
        <Navbar.Brand as={Link} to="/">
          Spring Boot Security + React
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* 왼쪽 메뉴 */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              홈
            </Nav.Link>
            <Nav.Link as={Link} to="/posts">
              게시글
            </Nav.Link>

            {/* user 객체가 있으면(로그인 상태) 글쓰기 메뉴 표시 */}
            {user && (
              <>
                <Nav.Link as={Link} to="/write">
                  글쓰기
                </Nav.Link>
                 {/* 파일 업로드 추가 */}
                <Nav.Link as={Link} to="/upload">
                  파일 업로드
                </Nav.Link>{" "}               
              </>
            )}
          </Nav>

          {/* 오른쪽 메뉴 */}
          <Nav>
            {user ? (
              // 로그인 상태 - user 객체가 있을 때
              <>
                <Navbar.Text className="me-3">
                  {user.name}님 환영합니다!
                </Navbar.Text>
                <Button variant="outline-light" onClick={handleLogout}>
                  로그아웃
                </Button>
              </>
            ) : (
              // 하나의 묶음으로 만들어 삼항 연산자의 결과로 반환하기 위해 Fragment 를 이용
              // 비로그인 상태 - user가 null일 때
              <>
                <Nav.Link as={Link} to="/login">
                  로그인
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  회원가입
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
