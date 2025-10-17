// config/apiConfig.js
import axios from "axios";

// 1. axios 인스턴스 생성 및 기본 설정
// axios 인스턴스 생성 - 공통 설정을 담은 axios 복사본을 만들어 'api'라는 이름으로 사용
const api = axios.create({  
   // baseURL: "http://localhost:8080", // 로컬 Spring API 서버 주소
  baseURL: "https://joy9.store", // AWS EC2 Spring API 서버 주소
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. 요청 인터셉터 설정 (Request Interceptor)
// 요청 인터셉터 - API 호출 직전에 가로채서 공통 로직(JWT 토큰 추가)을 처리합니다.
/*
api.interceptors.request.use(
  (config) => {  성공 처리  },
  (error) => { 오류 처리  }
);
첫 번째 함수 (성공 핸들러)
두 번째 함수 (오류 핸들러)
*/

api.interceptors.request.use(
  (config) => {
    // 요청이 서버로 전달되기 직전에 실행됩니다.

    // localStorage에서 JWT 토큰 가져오기
    const token = localStorage.getItem("token");

    //JWT 토큰이 있으면 Authorization 헤더에 추가
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 요청시 발생한 오류를 프로미스로 반환하여 해당 API 호출의 catch() 블록으로 전달
    // 이렇게 해야 호출한 쪽에서 추가적인 오류 처리(예: 특정 필드 에러 처리)를 할 수 있음, java의 throw new Exception() 가 같은 역할
    return Promise.reject(error); // **Promise (프로미스)**는 자바스크립트에서 비동기 작업의 최종 완료 또는 실패를 나타내는 객체
  }
);

// 응답 인터셉터 - 401/403 에러 처리 (토큰 만료)
api.interceptors.response.use(
  (response) => response, // 성공 시 그대로 반환
  (error) => {
    // 응답 실패(4xx, 5xx 등) 시에만 실행됩니다
    const status = error.response?.status;

    // 리다이렉션을 건너뛸 특정 URL 패턴
    const EXCLUDE_REDIRECT_URL = "/api/auth/login";
    // 인증 오류 (401/403) 처리 로직
    if (status === 401 || status === 403) {
      // 요청 설정(config)에서 요청 URL과 HTTP 상태 코드(status) 추출
      const originalRequestUrl = error.config?.url;

      console.warn("인증/인가 Error (401/403). Redirecting to login.");
      // 사용자에게 알림
      //alert("사용자 인증이 필요합니다. 다시 로그인해주세요.");
      // 1. 인증 정보 제거: 잘못된(만료된) 토큰과 사용자 정보를 로컬 저장소에서 제거
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // 2. 페이지 이동: 사용자에게 재로그인을 요청하기 위해 로그인 페이지로 강제 리다이렉트

      //현재 요청 URL이 리다이렉트를 건너뛸 URL인지 확인
      const isLoginRequest = originalRequestUrl?.includes(EXCLUDE_REDIRECT_URL);

      if (!isLoginRequest) {
        window.location.href = "/login";
      } else {
        // 로그인 요청일 경우 리다이렉션은 건너뛰고 경고만 표시
        console.log(
          `Login API (${originalRequestUrl}) failed with ${status}. Redirect skipped.`
        );
      }
    }
    // 인증 오류를 포함하여 발생한 모든 오류를 프로미스로 반환하여 해당 API 호출의 catch() 블록으로 전달
    // 이렇게 해야 호출한 쪽에서 추가적인 오류 처리(예: 특정 필드 에러 처리)를 할 수 있음
    return Promise.reject(error);
  }
);

export default api;
