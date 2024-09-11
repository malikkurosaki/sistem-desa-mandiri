export async function getListDir() {
   try {
      const res = await fetch("https://wibu-storage.wibudev.com/api/dir/cm0x8a1as0001bp5te7354yrp/list", {
         method: "GET",
         headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoiY20wdnQ4bzFrMDAwMDEyenE1eXl1emd5YiIsIm5hbWUiOiJhbWFsaWEiLCJlbWFpbCI6ImFtYWxpYUBiaXAuY29tIiwiQXBpS2V5IjpbeyJpZCI6ImNtMHZ0OG8xcjAwMDIxMnpxZDVzejd3eTgiLCJuYW1lIjoiZGVmYXVsdCJ9XX0sImlhdCI6MTcyNTkzNTE5MiwiZXhwIjo0ODgxNjk1MTkyfQ.7U-HUnNBDmeq_6XXohiFZjFnh2rSzUPMHDdrUKOd7G4`
         }
      });

      if (res.ok) {
         const hasil = await res.json()
         console.log("File uploaded successfully");
         console.log(hasil)
      } else {
         const errorText = await res.text();
         console.log(errorText)
      }
   } catch (error) {
      console.error("Upload error:", error);
   }
}