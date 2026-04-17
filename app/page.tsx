"use client"; // This tells the computer this page is interactive
import { useState } from "react";

export default function Home() {
  // These are "Variables" that hold the text the user types
  const [resume, setResume] = useState("");
  const [job, setJob] = useState("");
  const [score, setScore] = useState<number | null>(null);

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>AI Resume Matcher</h1>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        {/* Box 1: The Resume */}
        <textarea 
          placeholder="Paste Resume here..."
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          style={{ width: '50%', height: '300px', padding: '10px' }}
        />
        
        {/* Box 2: The Job Description */}
        <textarea 
          placeholder="Paste Job Description here..."
          value={job}
          onChange={(e) => setJob(e.target.value)}
          style={{ width: '50%', height: '300px', padding: '10px' }}
        />
      </div>

      <button 
        onClick={() => setScore(Math.floor(Math.random() * 100))} // Temporary "fake" math
        style={{ padding: '10px 20px', cursor: 'pointer' }}
      >
        Calculate Match
      </button>

      {/* This only shows up if a score exists */}
      {score !== null && (
        <h2 style={{ marginTop: '20px', color: 'blue' }}>
          Match Score: {score}%
        </h2>
      )}
    </div>
  );
}