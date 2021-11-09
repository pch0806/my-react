import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { placeSelector } from '../../module/placeSlice';
import { contentsSelector } from '../../module/contentsSlice';

const useUploadFileSizeCheck = () => {
  const { totalFileSize } = useSelector(contentsSelector.storagePlaceFileInfo);
  const { storageMax } = useSelector(placeSelector.placeInfo);

  const fnUploadFileSizeCheck = useCallback((acceptedFiles, toastType, mediaTotalSize) => {
    if (acceptedFiles.length > 1) {
      acceptedFiles.sort((a, b) => {
        return a.size - b.size;
      });
    }

    let addUploadFileSize = mediaTotalSize ? mediaTotalSize : totalFileSize;
    let uploadFiles = [];
  
    for (let i = 0; i < acceptedFiles.length; i++) {
      addUploadFileSize += acceptedFiles[i].size;
      uploadFiles.push(acceptedFiles[i]);
      if (storageMax / 1000 < 1) {
        if (addUploadFileSize / (1024 * 1024) > Number(storageMax)) {
          uploadFiles.splice(i, 1);
          const restMB = Math.round((Number(storageMax) - totalFileSize / (1024 * 1024)) * 1000) / 1000;
          if (toastType === 'number') {
            toast.error('업로드 용량 초과 (' + acceptedFiles.length + '개 중 ' + i + '개 업로드 가능)');
          } else {
            toast.error('업로드 용량 초과 (여유: ' + restMB + 'MB)');
          }
          break;
        }
      } else {
        if (addUploadFileSize / (1024 * 1024 * 1024) > Number(storageMax) / 1000) {
          uploadFiles.splice(i, 1);
          const restMB = Math.round((Number(storageMax) - totalFileSize / (1024 * 1024)) * 1000) / 1000;
          if (toastType === 'number') {
            toast.error('업로드 용량 초과 (' + acceptedFiles.length + '개 중 ' + i + '개 업로드 가능)');
          } else {
            toast.error('업로드 용량 초과 (여유: ' + restMB + 'MB)');
          }
          break;
        }
      }
    }
    return uploadFiles;
  }, [totalFileSize, storageMax]);
  
  return { fnUploadFileSizeCheck };
}

export default useUploadFileSizeCheck;