import { cookies } from "next/headers";

export async function DELETE() {
    cookies().delete('sessionCookieSDM')

    return Response.json({ success: true })
}