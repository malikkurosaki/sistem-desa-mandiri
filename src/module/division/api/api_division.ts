type Method = "GET" | "POST"

const listApi = [
    {
        "page": ""
    }
]

export async function apiDivision(req: Request, method: Method) {
    const { searchParams } = new URL(req.url)
    const page = searchParams.get("page")

    if (!page) return Response.json({ message: "page not found" }, { status: 404 })

    return Response.json({ message: "ok" })
}