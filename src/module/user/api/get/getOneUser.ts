import { prisma } from "@/module/_global";
import _ from "lodash";
import { NextRequest } from "next/server";

export async function getOneUser(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const idUser = searchParams.get("userID");

    const users = await prisma.user.findUnique({
      where: {
        id: String(idUser),
      },
      select: {
        id: true,
        nik: true,
        name: true,
        phone: true,
        email: true,
        gender: true,
        idGroup: true,
        idPosition: true,
        UserRole: {
          select: {
            name: true,
            id: true
          }
        },
        Position: {
          select: {
            name: true,
            id: true
          },
        },
        Group: {
          select: {
            name: true,
            id: true
          },
        },
      },
    });

    const { ...userData } = users;
    const group = users?.Group.name
    const position = users?.Position.name
    const idUserRole = users?.UserRole.id

    const result = { ...userData, group, position, idUserRole };

    const omitData = _.omit(result, ["Group", "Position", "UserRole"])
    console.log(omitData)
    return Response.json(omitData);
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Errorr", success: false }, { status: 500 });
  }
}
