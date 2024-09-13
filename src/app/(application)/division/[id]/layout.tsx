import { WrapLayoutDivision } from "@/module/division_new";
import _ from "lodash"

export default async function Layout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <WrapLayoutDivision>
            {children}
         </WrapLayoutDivision>
      </>
   );
}