import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const quotes = [
  "God is dead. We have killed him. – Nietzsche",
  "Become yourself, by your own reason. – Kant",
  "To exist is to think. – Descartes",
  "Nature is divine, and you are nature. – Spinoza",
  "Man is condemned to be free. – Sartre"
];

export default function PhilosophyApp() {
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
    datasets: [
      {
        label: 'Emotional Flow',
        data: [0.2, 0.6, 0.9],
        tension: 0.4,
        borderColor: '#92400e',
        backgroundColor: 'rgba(251, 191, 36, 0.2)',
        fill: true
      }
    ]
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
    <div style={{
      minHeight: '100vh',
      background: 'url(https://images.unsplash.com/photo-1616627785730-c2393a1f0af1?auto=format&fit=crop&w=1950&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '2rem',
      fontFamily: 'serif'
    }}>
      {!analyzed ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ textAlign: 'center', maxWidth: '600px', margin: 'auto' }}
        >
          <motion.div
            style={{ fontSize: '1.25rem', color: '#fff', fontStyle: 'italic', marginBottom: '1rem' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            “{quote}”
          </motion.div>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Enter Your Philosophy</h1>
            <textarea
              rows={10}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your thoughts on existence, the world, and being..."
              style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}
            />
            <button
              onClick={handleAnalyze}
              style={{
                marginTop: '1rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#92400e',
                color: '#fff',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              Start Analysis
            </button>
          </div>
        </motion.div>
      ) : loading ? (
        <motion.div
          style={{ textAlign: 'center', color: '#fff', marginTop: '4rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            style={{ fontSize: '1.5rem', marginBottom: '1rem' }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Analyzing...
          </motion.div>
          <motion.div
            style={{
              width: '3rem',
              height: '3rem',
              border: '4px solid #fff',
              borderTop: '4px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}
          />
        </motion.div>
      ) : (
        <motion.div
          style={{ maxWidth: '800px', margin: '2rem auto', background: '#fff', padding: '2rem', borderRadius: '1rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>🔍 Analysis Result</h2>
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 'bold' }}>Summary</h3>
            <p>(Your philosophical summary appears here)</p>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 'bold' }}>Key Sentences</h3>
            <p>(Highlighted phrases will show here)</p>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 'bold' }}>Themes</h3>
            <p>(Detected philosophical themes listed here)</p>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 'bold' }}>Emotional Flow</h3>
            <Line data={emotionData} options={emotionOptions} />
          </div>
          <motion.div
            style={{ fontSize: '1.25rem', textAlign: 'center', fontStyle: 'italic', marginTop: '1rem', color: '#92400e' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            “{finalMessage}”
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}