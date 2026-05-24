'use client';

import { FormEvent, useState } from 'react';

const goals = [
  { label: '🔥 Fat Loss', value: 'fat-loss' },
  { label: '💪 Muscle Building', value: 'muscle' },
  { label: '🏋️‍♂️ Strength', value: 'strength' },
  { label: '🧘 Fix Posture', value: 'posture' },
  { label: '🎓 1-on-1 Coaching', value: 'coaching' },
  { label: '✨ Other', value: 'other' },
];

export default function Home() {
  const [primaryGoal, setPrimaryGoal] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      firstName: String(data.get('firstName') ?? '').trim(),
      lastName: String(data.get('lastName') ?? '').trim(),
      whatsapp: String(data.get('whatsapp') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      age: Number(data.get('age') ?? 0),
      gender: String(data.get('gender') ?? '').trim(),
      city: String(data.get('city') ?? '').trim(),
      primaryGoal: primaryGoal || String(data.get('primaryGoal') ?? '').trim(),
      injuries: String(data.get('injuries') ?? '').trim(),
      source: String(data.get('source') ?? '').trim(),
    };

    if (!payload.firstName || !payload.whatsapp || !payload.email || !payload.city || !payload.age) {
      setErrorMessage('Please fill in all required fields.');
      setStatus('error');
      return;
    }

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result?.error || 'Submission failed.');
      }

      setStatus('success');
      form.reset();
      setPrimaryGoal('');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong.');
      setStatus('error');
    }
  }

  return (
    <main className="container">
      <div className="brand">
        <div className="logo">Fix<span>Your</span>Form</div>
        <div className="tagline">By Prateek Bansal</div>
      </div>

      <div className="card">
        {status === 'success' ? (
          <div className="success" id="success-view">
            <div className="success-icon">✓</div>
            <h2>You're In!</h2>
            <p>
              Prateek will reach out on WhatsApp within 24 hours.
              <br />
              <br />
              Meanwhile, follow <strong style={{ color: 'var(--green)' }}>@fixyourform</strong> on Instagram for daily tips.
            </p>
          </div>
        ) : (
          <div id="form-view">
            <div className="card-title">Let's Get Started</div>
            <p className="card-sub">Fill this out and Prateek will personally reach out within 24 hours.</p>

            <form id="enquiry-form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="field">
                  <label htmlFor="firstName">First Name</label>
                  <input id="firstName" name="firstName" type="text" placeholder="Rahul" required />
                </div>
                <div className="field">
                  <label htmlFor="lastName">Last Name</label>
                  <input id="lastName" name="lastName" type="text" placeholder="Sharma" />
                </div>
              </div>

              <div className="field">
                <label htmlFor="whatsapp">WhatsApp Number</label>
                <input id="whatsapp" name="whatsapp" type="tel" placeholder="+91 98765 43210" required />
              </div>

              <div className="field">
                <label htmlFor="email">Email Address</label>
                <input id="email" name="email" type="email" placeholder="rahul@gmail.com" required />
              </div>

              <div className="row">
                <div className="field">
                  <label htmlFor="age">Age</label>
                  <input id="age" name="age" type="number" placeholder="26" min="16" max="70" required />
                </div>
                <div className="field">
                  <label htmlFor="gender">Gender</label>
                  <select id="gender" name="gender" required defaultValue="">
                    <option value="" disabled>
                      Select
                    </option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="city">City</label>
                <input id="city" name="city" type="text" placeholder="Delhi, Mumbai, Bangalore..." required />
              </div>

              <div className="field">
                <label>Your Primary Goal</label>
                <div className="goals" id="goals">
                  {goals.map((goal) => (
                    <div
                      key={goal.value}
                      className={`goal-chip ${primaryGoal === goal.value ? 'active' : ''}`}
                      onClick={() => setPrimaryGoal(goal.value)}
                    >
                      {goal.label}
                    </div>
                  ))}
                </div>
              </div>

              <input name="primaryGoal" type="hidden" value={primaryGoal} />

              <div className="field">
                <label htmlFor="injuries">Any injuries or limitations? (optional)</label>
                <textarea id="injuries" name="injuries" placeholder="e.g. lower back pain, bad knees..."></textarea>
              </div>

              <div className="field">
                <label htmlFor="source">How did you find us?</label>
                <select id="source" name="source" defaultValue="">
                  <option value="" disabled>
                    Select
                  </option>
                  <option>Instagram</option>
                  <option>Friend / Referral</option>
                  <option>YouTube</option>
                  <option>Google</option>
                  <option>Other</option>
                </select>
              </div>

              {status === 'error' && <p className="error-message">{errorMessage}</p>}

              <button type="submit" className="submit-btn" disabled={status === 'loading'}>
                {status === 'loading' ? 'Submitting...' : 'SUBMIT ENQUIRY →'}
              </button>
              <p className="privacy">
                Your info is safe. No spam. <a href="#">Privacy Policy</a>
              </p>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
