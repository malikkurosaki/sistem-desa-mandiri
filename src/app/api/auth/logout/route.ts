import { createLogUser } from "@/module/user";
import { cookies } from "next/headers";

export async function DELETE() {
    const log = await createLogUser({ act: 'LOGOUT', desc: 'User keluar dari program', table: 'user', data: '' })

    cookies().delete('sessionCookieSDM')

    return Response.json({ success: true })
}