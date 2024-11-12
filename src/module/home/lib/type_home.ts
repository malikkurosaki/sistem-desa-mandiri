export interface IDataHomeKegiatan {
   id: string
   title: string
   desc: string
   status: number
   progress: number
   createdAt: string
}

export interface IDataHomeDivision {
   id: string
   name: string
   jumlah: number
}

export interface IDataHomeEvent {
   id: string
   idDivision: string
   title: string
   desc: string
   status: number
   timeStart: string
   timeEnd: string
   dateStart: string
   dateEnd: string
   createdAt: string
   user_name: string
}

export interface IDataHomeDiskusi {
   id: string
   idDivision: string
   desc: string
   title: string
   date: string
   user: string
}



// NOTE :: CARA LAIN BUAT INTERFACE PAKE PRISMA
// type User = {} & Prisma.UserUncheckedCreateInput
// type User2 = {} & Prisma.UserGetPayload<{select: {id: true, name: true}}>

// const user = {} as User
// const user2 = {} as User2



// NOTE :: CARA LAIN BUAT NYIMPEN DATA PAKE STATIC (LAYOUT>>CHILDREN) CUMA BISA CLIENT TO CLIENT ATAU SERVER TO SERVER
// class Data {
//    static nama = ""
//    static set(val: string){
//       Data.nama = val
//    }
// }

// class Apa {
//    nama = ""
//    constructor(nama: string){
//       this.nama = nama
//    }
// }

// const aa = new Apa("aa")