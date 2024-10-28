import { DIR, funCopyFile, prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { createLogUser } from "@/module/user";
import _ from "lodash";
import { NextResponse } from "next/server";


// MOVE ITEM
export async function POST(request: Request) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const { path, dataItem } = (await request.json());


      if (path != "home") {
         const cekPath = await prisma.divisionDocumentFolderFile.count({
            where: {
               isActive: true,
               id: path
            }
         })

         if (cekPath == 0) {
            return NextResponse.json({ success: false, message: "Gagal mendapatkan path, data tidak ditemukan" }, { status: 404 });
         }
      }

      for (let i = 0; i < dataItem.length; i++) {

         let status = false
         let numb = 1
         let name = dataItem[i].name
         do {
            const cekName = await prisma.divisionDocumentFolderFile.count({
               where: {
                  path: path,
                  isActive: true,
                  extension: dataItem[i].extension,
                  name
               }
            })

            if (cekName > 0) {
               name = dataItem[i].name + " (" + numb + ")"
               numb++
               status = false
            } else {
               status = true
            }
         } while (status == false);


         const id = dataItem[i].id;
         const update = await prisma.divisionDocumentFolderFile.update({
            where: {
               id
            },
            data: {
               path,
               name
            }
         })
      }

      // create log user
      const log = await createLogUser({ act: 'UPDATE', desc: 'User memindahkan file atau folder', table: 'divisionDocumentFolderFile', data: '' })


      return NextResponse.json({ success: true, message: "Berhasil memindahkan item" }, { status: 200 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal memindahkan item, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
   }
};


// COPY ITEM
export async function PUT(request: Request) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const { idDivision, path, dataItem } = (await request.json());


      if (path != "home") {
         const cekPath = await prisma.divisionDocumentFolderFile.count({
            where: {
               isActive: true,
               id: path
            }
         })

         if (cekPath == 0) {
            return NextResponse.json({ success: false, message: "Gagal mendapatkan path, data tidak ditemukan" }, { status: 404 });
         }
      }

      for (let i = 0; i < dataItem.length; i++) {
         let name = dataItem[i].name;
         const category = dataItem[i].category;
         const extension = dataItem[i].extension;
         const idStorage = dataItem[i].idStorage;

         const copyOnStorage = await funCopyFile({ fileId: idStorage, dirId: DIR.document })
         if (copyOnStorage.success) {
            let status = false
            let numb = 1
            do {
               const cekName = await prisma.divisionDocumentFolderFile.count({
                  where: {
                     path: path,
                     isActive: true,
                     extension,
                     name
                  }
               })

               if (cekName > 0) {
                  name = dataItem[i].name + " (" + numb + ")"
                  numb++
                  status = false
               } else {
                  status = true
               }
            } while (status == false);


            const create = await prisma.divisionDocumentFolderFile.create({
               data: {
                  name,
                  path,
                  idDivision,
                  category,
                  extension,
                  idStorage: copyOnStorage.data.id,
                  createdBy: user.id
               },
               select: {
                  id: true
               }
            })

            // create log user
            const log = await createLogUser({ act: 'CREATE', desc: 'User menyalin file', table: 'divisionDocumentFolderFile', data: create.id })
         }
      }

      return NextResponse.json({ success: true, message: "Berhasil salin item" }, { status: 200 });


   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal salin item, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
   }
};


// SHARE ITEM
export async function DELETE(request: Request) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const { dataDivision, dataItem } = (await request.json());


      for (let i = 0; i < dataItem.length; i++) {
         const del = await prisma.divisionDocumentShare.deleteMany({
            where: {
               idDocument: dataItem[i].id
            }
         })

         const omitData = dataDivision.map((v: any) => ({
            ..._.omit(v, ["name", "id"]),
            idDivision: v.id,
            idDocument: dataItem[i].id
         }))

         const insert = await prisma.divisionDocumentShare.createMany({
            data: omitData
         })

      }

      // create log user
      const log = await createLogUser({ act: 'CREATE', desc: 'User membagikan item', table: 'divisionDocumentShare', data: '' })
      return NextResponse.json({ success: true, message: "Berhasil membagikan item" }, { status: 200 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal membagikan item, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
   }
};