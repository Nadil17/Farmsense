import React, { useState } from 'react';
import './App.css';

function Apps() {
  const [cropType, setCropType] = useState('');
  const [soilCondition, setSoilCondition] = useState('');
  const [pestProblem, setPestProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSolution('');
    
    try {
      const response = await fetch('http://localhost:8080/crop-solution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          csvData: `${cropType},${soilCondition},${pestProblem}`
        }),
      });
      
      const data = await response.text();
      setSolution(data);
    } catch (error) {
      console.error('Error:', error);
      setSolution('Error fetching solution. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Crop Solution Finder</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cropType">Crop Type:</label>
            <input
              type="text"
              id="cropType"
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="soilCondition">Soil Condition:</label>
            <input
              type="text"
              id="soilCondition"
              value={soilCondition}
              onChange={(e) => setSoilCondition(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="pestProblem">Pest Problem:</label>
            <input
              type="text"
              id="pestProblem"
              value={pestProblem}
              onChange={(e) => setPestProblem(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? 'Getting Solution...' : 'Get Solution'}
          </button>
        </form>
      </div>
      
      {solution && (
        <div className="solution-container">
          <h2>Solution</h2>
          <div className="solution-text">
            {solution}
          </div>
        </div>
      )}
    </div>
  );
}

export default Apps;