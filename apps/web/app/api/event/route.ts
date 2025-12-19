import { NextResponse } from "next/server";
import { db, admin } from "@/lib/firebase_admin";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, properties } = body;

        // Log to console (Server-side log)
        console.log(`[INGEST] ${name}`, properties);

        if (db) {
            // Push event to 'events' list
            const eventsRef = db.ref('events');
            await eventsRef.push({
                name,
                properties,
                timestamp: admin.database.ServerValue.TIMESTAMP
            });

            // Simple Real-time aggregation (Increment session count)
            // Note: For high volume, use Cloud Functions triggers instead of client-side increments.
            if (name === 'session_start') {
                const statsRef = db.ref('stats/total_sessions');
                await statsRef.transaction((current_value) => {
                    return (current_value || 0) + 1;
                });
            }
        }

        return NextResponse.json({ status: "captured" }, { status: 202 });

    } catch (error) {
        console.error("Ingest Error:", error);
        return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
    }
}
