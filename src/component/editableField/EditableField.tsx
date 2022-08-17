import React, { useState } from 'react';

interface EditableFieldProps {
    children: JSX.Element;
    onSave: (text: string) => any;
    text?: string;
}

const EditableField = ({ children, onSave, text = '' }: EditableFieldProps) => {
    const [isInEditMode, setIsInEditMode] = useState(false);
    const [value, setValue] = useState(text);
    if (!isInEditMode) {
        return <div onClick={() => setIsInEditMode(true)}>{children}</div>;
    } else {
        return (
            <div>
                <textarea defaultValue={text || children?.props?.children} onChange={(e) => setValue(e.target.value)} />
                <button
                    onClick={() => {
                        setIsInEditMode(false);
                        onSave(value);
                    }}
                >
                    Lagre
                </button>
            </div>
        );
    }
};

export default EditableField;
