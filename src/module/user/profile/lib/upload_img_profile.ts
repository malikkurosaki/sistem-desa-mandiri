export async function fileUpload({ file }: { file: File}) {
   const formData = new FormData();
   formData.append("file", file);
   formData.append("dirId", "cm0x8dbwn0005bp5tgmfcthzw");

   try {
      const res = await fetch("https://wibu-storage.wibudev.com/api/upload", {
         method: "POST",
         body: formData,
         headers: {
            Authorization: `Bearer ${process.env.WS_APIKEY}`
         }
      });

      if (res.ok) {
         console.log("File uploaded successfullyAmalia");
         const hasil = await res.text()
         console.log('berhasilAmalia',hasil)
         
      } else {
         const errorText = await res.text();
         console.log('errorAmalia',errorText)
      }
   } catch (error) {
      console.error("Upload error:", error);
   }
}