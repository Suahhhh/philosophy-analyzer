import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import 'chart.js/auto';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const quotes = [
  "God is dead. We have killed him. – Nietzsche",
  "Be yourself, through your own reason. – Kant",
  "To be is to think. – Descartes",
  "Nature is God, and you are nature. – Spinoza",
  "Man is condemned to be free. – Sartre"
];

function App() {
  const [quote, setQuote] = useState('');
  const [text, setText] = useState('');
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finalMessage, setFinalMessage] = useState('');

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      setAnalyzed(true);
      setLoading(false);
      const closing = quotes[Math.floor(Math.random() * quotes.length)];
      setFinalMessage(closing);
    }, 2000);
  };

  const emotionData = {
    labels: ['Start', 'Middle', 'End'],
    datasets: [{
      label: 'Emotional Flow',
      data: [0.2, 0.6, 0.9],
      borderColor: '#92400e',
      backgroundColor: 'rgba(251, 191, 36, 0.2)',
      tension: 0.4,
      fill: true
    }]
  };

  const emotionOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: false }
    },
    scales: {
      x: { type: 'category' },
      y: { beginAtZero: true }
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Georgia' }}>
      {!analyzed ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ textAlign: 'center' }}
        >
          <h2 style={{ fontStyle: 'italic', color: '#92400e' }}>{quote}</h2>
          <textarea
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your philosophical thoughts here..."
            style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}
          />
          <button onClick={handleAnalyze} style={{ marginTop: '1rem', padding: '1rem', background: '#92400e', color: 'white' }}>
            Analyze
          </button>
        </motion.div>
      ) : loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: 'center', color: '#92400e' }}
        >
          <h2>Analyzing...</h2>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '2rem' }}>
          <h2>🔍 Analysis Result</h2>
          <p><strong>Summary:</strong> (Summary goes here)</p>
          <p><strong>Highlighted Sentence:</strong> (Highlight goes here)</p>
          <p><strong>Theme:</strong> (Theme classification goes here)</p>
          <Line data={emotionData} options={emotionOptions} />
          <p style={{ marginTop: '2rem', fontStyle: 'italic', color: '#92400e' }}>“{finalMessage}”</p>
        </motion.div>
      )}
    </div>
  );
}

export default App;
