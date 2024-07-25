import { cookies } from "next/headers";

export async function DELETE() {
    cookies().delete('sessionCookie')

    return Response.json({ success: true })
}