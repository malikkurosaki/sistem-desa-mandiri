import { funSendWebPush, prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { createLogUser } from "@/module/user";
import _ from "lodash";
import { NextResponse } from "next/server";


// GET ALL DATA DIVISI == LIST DATA DIVISI
export async function GET(request: Request) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      let grup
      const villaId = user.idVillage
      const roleUser = user.idUserRole
      const { searchParams } = new URL(request.url);
      const idGroup = searchParams.get("group");
      const name = searchParams.get('search');
      const page = searchParams.get('page');
      const active = searchParams.get("active");
      const dataSkip = Number(page) * 10 - 10;

      if (idGroup == "null" || idGroup == undefined) {
         grup = user.idGroup
      } else {
         grup = idGroup
      }


      let kondisi: any = {
         isActive: active == 'false' ? false : true,
         idVillage: String(villaId),
         idGroup: grup,
         name: {
            contains: (name == undefined || name == "null") ? "" : name,
            mode: "insensitive"
         }
      }

      if (roleUser != "supadmin" && roleUser != "cosupadmin" && roleUser != "admin") {
         kondisi = {
            isActive: active == 'false' ? false : true,
            idVillage: String(villaId),
            idGroup: grup,
            name: {
               contains: (name == undefined || name == "null") ? "" : name,
               mode: "insensitive"
            },
            DivisionMember: {
               some: {
                  isActive: true,
                  idUser: String(user.id)
               }
            }
         }
      }

      const totalData = await prisma.division.count({
         where: kondisi
      })

      const data = await prisma.division.findMany({
         skip: dataSkip,
         take: 10,
         where: kondisi,
         select: {
            id: true,
            name: true,
            desc: true,
            DivisionMember: {
               where: {
                  isActive: true
               },
               select: {
                  idUser: true
               }
            }
         },
         orderBy: {
            createdAt: 'desc'
         }
      });

      const allData = data.map((v: any) => ({
         ..._.omit(v, ["DivisionMember"]),
         jumlah_member: v.DivisionMember.length
      }))


      const filter = await prisma.group.findUnique({
         where: {
            id: grup
         },
         select: {
            id: true,
            name: true
         }
      })


      return NextResponse.json({ success: true, message: "Berhasil mendapatkan divisi", data: allData, total: totalData, filter }, { status: 200 });

   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan divisi, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
   }
}



// CREATE DATA DIVISI
export async function POST(request: Request) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const userId = user.id
      const userRoleLogin = user.idUserRole
      const sent = (await request.json())

      let fixGroup
      if (sent.data.idGroup == "null" || sent.data.idGroup == undefined || sent.data.idGroup == "") {
         fixGroup = user.idGroup
      } else {
         fixGroup = sent.data.idGroup
      }



      const data = await prisma.division.create({
         data: {
            name: sent.data.name,
            idVillage: String(user.idVillage),
            idGroup: fixGroup,
            desc: sent.data.desc,
            createdBy: String(user.id)
         },
         select: {
            id: true
         }
      })


      const dataMember = sent.member.map((v: any) => ({
         ..._.omit(v, ["idUser", "name", "img"]),
         idUser: v.idUser,
         idDivision: data.id,
         isAdmin: sent.admin.some((i: any) => i == v.idUser)
      }))

      const insertMember = await prisma.divisionMember.createMany({
         data: dataMember
      })


      // mengirim notifikasi
      // datanotif untuk realtime notifikasi
      // datapush untuk web push notifikasi ketika aplikasi tidak aktif
      const dataNotif = sent.member.map((v: any) => ({
         ..._.omit(v, ["idUser", "name", "img"]),
         idUserTo: v.idUser,
         idUserFrom: userId,
         category: 'division',
         idContent: data.id,
         title: 'Divisi Baru',
         desc: 'Terdapat divisi baru. Silahkan periksa detailnya.'
      }))

      const selectUser = await prisma.divisionMember.findMany({
         where: {
            isActive: true,
            idDivision: data.id
         },
         select: {
            idUser: true,
            User: {
               select: {
                  Subscribe: {
                     select: {
                        subscription: true
                     }
                  }
               }
            }
         }
      })

      const dataPush = selectUser.map((v: any) => ({
         ..._.omit(v, ["idUser", "User", "Subscribe"]),
         idUser: v.idUser,
         subscription: v.User.Subscribe?.subscription,
      }))

      if (userRoleLogin != "supadmin") {
         const perbekel = await prisma.user.findFirst({
            where: {
               isActive: true,
               idUserRole: "supadmin",
               idVillage: user.idVillage
            },
            select: {
               id: true,
               Subscribe: {
                  select: {
                     subscription: true
                  }
               }
            }
         })

         dataNotif.push({
            idUserTo: perbekel?.id,
            idUserFrom: userId,
            category: 'division',
            idContent: data.id,
            title: 'Divisi Baru',
            desc: 'Terdapat divisi baru. Silahkan periksa detailnya.'
         })

         dataPush.push({
            idUser: perbekel?.id,
            subscription: perbekel?.Subscribe?.subscription
         })

      } else {
         const atasanGroup = await prisma.user.findMany({
            where: {
               isActive: true,
               idGroup: sent.data.idGroup,
               AND: {
                  OR: [
                     { idUserRole: 'cosupadmin' },
                     { idUserRole: 'admin' },
                  ]
               }
            },
            select: {
               id: true,
               Subscribe: {
                  select: {
                     subscription: true
                  }
               }
            }
         })

         const omitData = atasanGroup.map((v: any) => ({
            ..._.omit(v, ["id", "Subscribe"]),
            idUserTo: v.id,
            idUserFrom: userId,
            category: 'division',
            idContent: data.id,
            title: 'Divisi Baru',
            desc: 'Terdapat divisi baru. Silahkan periksa detailnya.'
         }))

         const omitPush = atasanGroup.map((v: any) => ({
            ..._.omit(v, ["id", "Subscribe"]),
            idUser: v.id,
            subscription: v.Subscribe?.subscription,
         }))

         dataNotif.push(...omitData)
         dataPush.push(...omitPush)

      }


      const pushNotif = dataPush.filter((item) => item.subscription != undefined)

      const sendWebPush = await funSendWebPush({ sub: pushNotif, message: { title: 'Divisi Baru', body: 'Terdapat divisi baru. Silahkan periksa detailnya.' } })
      const insertNotif = await prisma.notifications.createMany({
         data: dataNotif
      })


      // create log user
      const log = await createLogUser({ act: 'CREATE', desc: 'User membuat data divisi', table: 'division', data: data.id })

      return NextResponse.json({ success: true, message: "Berhasil menambahkan divisi", notif: dataNotif, }, { status: 200 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal menambahkan divisi, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
   }
};