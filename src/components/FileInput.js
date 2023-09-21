import React, { useState } from 'react';

const FileInput = ({ accept, id, text, fileFun }) => {
  const [file, setFile] = useState(null);

  function onChange(e) {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    setFile(selectedFile ? selectedFile.name : null);
    fileFun(selectedFile);
  }

  return (
    <div className={`upload ${file ? 'active' : 'input-upload'}`}>
      <label htmlFor={id}>{file ? `${file}` : text}</label>
      <input
        type="file"
        accept={accept}
        id={id}
        style={{ display: 'none' }}
        onChange={onChange}
      />
    </div>
  );
};

export default FileInput;
