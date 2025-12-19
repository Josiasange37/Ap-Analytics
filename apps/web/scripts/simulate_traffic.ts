import fetch from 'node-fetch';

const API_URL = 'http://localhost:3000/api/event';

// Random event generator
const events = [
    { name: 'session_start', props: { device: 'mobile', country: 'US' } },
    { name: 'page_view', props: { path: '/dashboard', duration: 120 } },
    { name: 'click', props: { element: 'buy_button' } },
    { name: 'error', props: { code: 500, message: 'timeout' } }
];

async function sendEvent() {
    const event = events[Math.floor(Math.random() * events.length)];
    const payload = {
        name: event.name,
        properties: {
            ...event.props,
            ts: Date.now()
        }
    };

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            console.log(`[SIM] Sent: ${event.name}`);
        } else {
            console.error(`[SIM] Failed: ${res.status}`);
        }
    } catch (e) {
        console.error(`[SIM] Error: ${e}`);
    }
}

// Pump events every 500ms
console.log("Starting Traffic Simulation...");
setInterval(sendEvent, 500);
