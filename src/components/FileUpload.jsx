// src/components/FileUpload.jsx
// S3 파일 업로드 컴포넌트

import React, { useState } from 'react';
import { Form, Button, ProgressBar, Alert } from 'react-bootstrap';
import axios from 'axios';

const FileUpload = () => {
  // S3 버킷 정보 
  const S3_BUCKET = 'joy9-project-files'; // 여기에 자신의 실제 버킷 이름 입력
  const S3_REGION = 'ap-northeast-2';
  const S3_URL = `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com`;

  // 상태 관리
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [error, setError] = useState('');

  // 파일 선택 핸들러
  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
      setUploadedUrl('');
    }
  };

  // S3 업로드 핸들러
  const handleUpload = async () => {
    if (!file) {
      setError('파일을 선택해주세요.');
      return;
    }

    setUploading(true);
    setProgress(0);
    setError('');

    try {
      // 고유한 파일명 생성
      const timestamp = Date.now();
      const fileName = `uploads/${timestamp}_${file.name}`;

      // S3로 직접 업로드
      await axios.put(`${S3_URL}/${fileName}`, file, {
        headers: {
          'Content-Type': file.type
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percent);
        }
      });

      // 업로드 성공
      const fileUrl = `${S3_URL}/${fileName}`;
      setUploadedUrl(fileUrl);
      alert('파일 업로드 완료!');

    } catch (err) {
      console.error('업로드 실패:', err);
      setError('파일 업로드에 실패했습니다. S3 설정을 확인해주세요.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4">
      <h3 className="mb-4">파일 업로드</h3>

      {/* 에러 메시지 */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* 파일 선택 */}
      <Form.Group className="mb-3">
        <Form.Label>파일 선택</Form.Label>
        <Form.Control 
          type="file" 
          onChange={handleFileSelect}
          disabled={uploading}
        />
        {file && (
          <Form.Text className="text-muted">
            선택된 파일: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </Form.Text>
        )}
      </Form.Group>

      {/* 진행률 표시 */}
      {uploading && (
        <div className="mb-3">
          <ProgressBar 
            now={progress} 
            label={`${progress}%`}
            animated
          />
        </div>
      )}

      {/* 업로드 버튼 */}
      <Button 
        variant="primary" 
        onClick={handleUpload}
        disabled={!file || uploading}
      >
        {uploading ? '업로드 중...' : '업로드'}
      </Button>

      {/* 업로드 완료 시 이미지 표시 */}
      {uploadedUrl && (
        <div className="mt-4">
          <Alert variant="success">업로드 완료!</Alert>
          {file.type.startsWith('image/') && (
            <img 
              src={uploadedUrl} 
              alt="업로드된 파일"
              style={{ maxWidth: '100%', maxHeight: '300px' }}
              className="img-thumbnail"
            />
          )}
          <div className="mt-2">
            <small className="text-muted d-block" style={{ wordBreak: 'break-all' }}>
              {uploadedUrl}
            </small>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;