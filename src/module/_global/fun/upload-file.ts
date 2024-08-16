'use server'
import fs from 'fs'
export async function funUploadFile(fName: any, f: any) {
   const filenya = Buffer.from(await f.arrayBuffer())
   fs.writeFileSync(`./public/assets/file/${fName}`, filenya)
}