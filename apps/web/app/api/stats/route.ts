import { NextResponse } from "next/server";
import { db } from "@/lib/firebase_admin";

export async function GET() {
    if (!db) {
        // Mock Mode if no specific firebase credentials
        return NextResponse.json({
            active_users: 1248, // Mock
            total_sessions: 48500,
            bounce_rate: 42,
            duration: "4m 12s",
        });
    }

    try {
        // In a real app, we would fetch aggregations.
        // For MVP, we'll try to fetch a specific stats node, or fallback to mock if DB is empty.
        const ref = db.ref('stats');
        const snapshot = await ref.once('value');
        const val = snapshot.val();

        if (val) {
            return NextResponse.json(val);
        }

        // Default/Mock if nothing in DB yet
        return NextResponse.json({
            active_users: 0,
            total_sessions: 0,
            bounce_rate: 0,
            duration: "0m 0s",
        });

    } catch (error) {
        console.error("Firebase Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
