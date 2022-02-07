import React, { useState } from 'react';
import Scroll from 'react-scroll';
import FileInput from '@department-of-veterans-affairs/component-library/FileInput';
import PropTypes from 'prop-types';
import {
  readAndCheckFile,
  checkTypeAndExtensionMatches,
  checkIsEncryptedPdf,
  FILE_TYPE_MISMATCH_ERROR,
} from 'platform/forms-system/src/js/utilities/file';
import { getScrollOptions } from 'platform/utilities/ui';
import {
  isValidFile,
  isValidFileSize,
  isEmptyFileSize,
  isValidFileType,
  setFocus,
  FILE_TYPES,
} from '../utils/fileValidation';

const FileUploader = ({ files, requestLockedPdfPassword, onAddFile }) => {
  const acceptedFileTypes = FILE_TYPES.map(type => `${type}`).join(', ');
  const [errorMessage, setErrorMessage] = useState(null);

  const scrollToFile = position => {
    const options = getScrollOptions({ offset: -25 });
    Scroll.scroller.scrollTo(`documentScroll${position}`, options);
  };

  const handleChange = async uploadedFile => {
    const file = uploadedFile[0];
    const extraData = {};

    const checks = { checkTypeAndExtensionMatches, checkIsEncryptedPdf };
    const checkResults = await readAndCheckFile(file, checks);

    if (!checkResults.checkTypeAndExtensionMatches) {
      setErrorMessage(FILE_TYPE_MISMATCH_ERROR);
    } else if (isValidFile(file)) {
      // Check if the file is an encrypted PDF
      if (
        requestLockedPdfPassword && // feature flag
        file.name?.endsWith('pdf')
      ) {
        extraData.isEncrypted = checkResults.checkIsEncryptedPdf;
      }

      setErrorMessage(null);
      onAddFile([file], extraData);
      setTimeout(() => {
        scrollToFile(files.length - 1);
        setFocus(
          document.querySelectorAll('.document-item-container')[
            files.length - 1
          ],
        );
      });
    } else if (!isValidFileType(file)) {
      setErrorMessage('Please choose a file from one of the accepted types.');
    } else if (!isValidFileSize(file)) {
      setErrorMessage(
        'The file you selected is larger than the 50MB maximum file size and could not be added.',
      );
    } else if (isEmptyFileSize(file)) {
      setErrorMessage(
        'The file you selected is empty. Files uploaded must be larger than 0B.',
      );
    }
  };

  return (
    <>
      <p className="vads-u-padding-top--1">
        Please attach all relevant documentation about this bankruptcy.
      </p>
      <div className="vads-u-padding-top--1">
        <strong>Accepted file types: </strong>
      </div>
      <div>{acceptedFileTypes}</div>
      <div className="vads-u-padding-top--1">
        <strong>Maximum file size: </strong>
      </div>
      <div>50MB</div>
      <FileInput
        errorMessage={errorMessage}
        onChange={handleChange}
        buttonText="Add files"
        name="fileUpload"
        accept={acceptedFileTypes}
      />
    </>
  );
};

FileUploader.propTypes = {
  files: PropTypes.object,
  requestLockedPdfPassword: PropTypes.object,
  onAddFile: PropTypes.object,
};

export default FileUploader;
