import React, { RefObject } from 'react';

interface FileUploadProps {
    onFileSelect: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
    const fileInput: RefObject<HTMLInputElement> = React.createRef();

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = fileInput.current?.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    };

    return (
        <div>
            <input type="file" ref={fileInput} onChange={handleFileSelect} />
        </div>
    );
};

export default FileUpload;
