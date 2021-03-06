import React from 'react';

export default function UploadStatus({ progress, files, onCancel }) {
  return (
    <div>
      <div className="claims-status-upload-header" id="upload-status-title">
        Uploading files
      </div>
      <div>
        <h4>
          Uploading {files} {files === 1 ? 'file' : 'files'}
          ...
        </h4>
        <va-progress-bar percent={progress * 100} />
        Your files are uploading. Please do not close this window.
        <p>
          <a
            onClick={evt => {
              evt.preventDefault();
              onCancel();
            }}
            href="#"
          >
            Cancel
          </a>
        </p>
      </div>
    </div>
  );
}
