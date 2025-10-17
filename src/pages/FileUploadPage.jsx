// src/pages/FileUploadPage.jsx
// 파일 업로드 테스트 페이지

import React from 'react';
import { Card } from 'react-bootstrap';
import FileUpload from '../components/FileUpload';

const FileUploadPage = () => {
  return (
    <div className="container mt-4">
      <Card>
        <Card.Body>
          <FileUpload />
        </Card.Body>
      </Card>
    </div>
  );
};

export default FileUploadPage;