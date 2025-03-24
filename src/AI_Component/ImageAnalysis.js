import React, { useState } from 'react';
import './ImageAnalysis.css';

function ImageAnalysis() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prompt, setPrompt] = useState('Describe what you see in this image in detail.');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!selectedFile) {
      setError('Please select an image first.');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      setResult('');
      
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('prompt', prompt);
      
      const response = await fetch('http://localhost:8080/auth/image/analyze', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${await response.text()}`);
      }
      
      const data = await response.text();
      setResult(data);
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error('Upload failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult('');
    setError(null);
    // Keep the prompt text as it might be reused
  };

  return (
    <div className="image-analysis-container">
      <h1>Image Analysis</h1>
      <p className="description">
        Upload an image and get AI-powered analysis using Anthropic's Claude API
      </p>
      
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="file-upload-section">
          <label htmlFor="file-upload" className="file-upload-label">
            {preview ? 'Change Image' : 'Choose Image'}
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="file-input"
          />
          
          {preview && (
            <div className="image-preview-container">
              <img src={preview} alt="Preview" className="image-preview" />
              <button 
                type="button" 
                onClick={handleClear} 
                className="clear-button"
              >
                ✕
              </button>
            </div>
          )}
        </div>
        
        <div className="prompt-section">
          <label htmlFor="prompt">Prompt:</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={handlePromptChange}
            placeholder="Enter your prompt for image analysis"
            className="prompt-input"
          />
        </div>
        
        <div className="action-buttons">
          <button 
            type="submit" 
            disabled={isLoading || !selectedFile} 
            className="analyze-button"
          >
            {isLoading ? 'Analyzing...' : 'Analyze Image'}
          </button>
        </div>
      </form>
      
      {error && <div className="error-message">{error}</div>}
      
      {result && (
        <div className="result-section">
          <h2>Analysis Result</h2>
          <div className="result-content">
            {result.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageAnalysis;