export async function createProject(req: Request) {
    const data = await req.json()
    return Response.json({ message: "success create projects" })
}