export interface GeoPoint {
    lat: number;
    lng: number;
    size: number;
    color: string;
    timestamp: number; // Unix ms
}

// Generate 500 fake events across last 24h
export const generateMockHistory = (): GeoPoint[] => {
    const points: GeoPoint[] = [];
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;

    // Major Cities
    const hubs = [
        { lat: 40.7128, lng: -74.0060, color: '#10b981' }, // NY
        { lat: 51.505, lng: -0.09, color: '#6366f1' },    // London
        { lat: 1.3521, lng: 103.8198, color: '#f97316' }, // Singapore
        { lat: -33.8688, lng: 151.2093, color: '#8b5cf6' }, // Sydney
        { lat: 35.6762, lng: 139.6503, color: '#ef4444' } // Tokyo
    ];

    for (let i = 0; i < 1000; i++) {
        const hub = hubs[Math.floor(Math.random() * hubs.length)];
        // Random scatter around hub
        const lat = hub.lat + (Math.random() - 0.5) * 10;
        const lng = hub.lng + (Math.random() - 0.5) * 10;

        points.push({
            lat,
            lng,
            size: Math.random() * 0.5 + 0.1,
            color: hub.color,
            timestamp: now - Math.floor(Math.random() * day)
        });
    }

    return points.sort((a, b) => a.timestamp - b.timestamp);
};
