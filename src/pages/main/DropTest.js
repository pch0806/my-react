import React, { memo, useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';

import useUploadFileSizeCheck from './useUploadFileSizeCheck';

const Storage = () => {
  
  const { fnUploadFileSizeCheck } = useUploadFileSizeCheck();
  
  const [draggedFolder, setDraggedFolder] = useState();

  const onDrop = useCallback(
    async (acceptedFiles, fileRejections) => {
      console.log('acceptedFiles',acceptedFiles);
      console.log('fileRejections',fileRejections);
      if (fileRejections && fileRejections.length !== 0) {
        toast.error('🚀 지원하지 않는 파일 형식입니다.');
      } else {
        let folderId = '';
        let uploadFiles = fnUploadFileSizeCheck(acceptedFiles, 'number');

        console.log('uploadFiles',uploadFiles);
      }
    },
    [fnUploadFileSizeCheck],
  );

  const { getRootProps } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, image/gif, video/mp4',
  });

  return (
    <Container>
      <div {...getRootProps()} style={{ outline: 'none' }}>
        <DropzoneWrapper>
          <UploadZone
            onDrop
          ></UploadZone>
        </DropzoneWrapper>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden overlay;
  width: 100%;
  height: 100%;
`;

const DropzoneWrapper = styled.div`
  border: 1px solid red;
  position: relative;
  width: 100%;
  min-height: 800px;
`;

const UploadZone = styled.div`
  height: 6rem;
  padding: 0 1.875rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default React.memo(Storage);
