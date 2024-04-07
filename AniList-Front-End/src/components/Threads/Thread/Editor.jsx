import React, { useState } from 'react';

const Editor = () => {
  const [editorContent, setEditorContent] = useState('');
  const textareaRef = React.createRef();

  const handleTextareaInput = (e) => {
    setEditorContent(e.target.value);
  };

  const handleInsertImage = () => {
    const imageUrl = prompt('Enter image URL:');
    if (imageUrl) {
      const newContent = `${editorContent}\nimg220(${imageUrl})`;
      setEditorContent(newContent);
    }
  };

  // Extraer el texto y las imágenes del contenido del editor
  const extractTextAndImages = () => {
    const lines = editorContent.split('\n');
    const textAndImages = lines.map(line => {
      if (line.startsWith('img220(')) {
        return { type: 'image', content: line.slice(7, -1) };
      } else {
        return { type: 'text', content: line };
      }
    });
    return textAndImages;
  };

  const textAndImages = extractTextAndImages();
  const textArea = editorContent.split('\n').filter(line => line.trim() !== '');
  console.log(textArea);
  return (
    <div>
      <div className='input textarea'>
        <textarea
          autoComplete='off'
          style={{ minHeight: '120px', height: '120px' }}
          className='textarea__inner'
          placeholder='What are you thinking?'
          onInput={handleTextareaInput}
          rows={1}
          ref={textareaRef}
          value={editorContent}
        ></textarea>
        <button onClick={handleInsertImage}>Insert Image</button>
      </div>
      <div className='preview'>
        <h2 className='prev'>Preview:</h2>
        {textAndImages.map((item, index) => (
          item.type === 'text' ? (
            <p key={index} className='prev_content'>{item.content}</p>
          ) : (
            <img key={index} src={item.content} alt={`inserted image ${index + 1}`} />
          )
        ))}
      </div>
    </div>
  );
};

export default Editor;
