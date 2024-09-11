export async function funUploadFile({ file, dirId }: { file: File, dirId: string }) {
   const formData = new FormData();
   formData.append("file", file);
   formData.append("dirId", dirId);

   try {
      const res = await fetch("https://wibu-storage.wibudev.com/api/upload", {
         method: "POST",
         body: formData,
         headers: {
            Authorization: `Bearer ${process.env.WS_APIKEY}`
         }
      });

      if (res.ok) {
         console.log("File uploaded successfully");
      } else {
         const errorText = await res.text();
         console.log('errorAmalia', errorText)
      }
   } catch (error) {
      console.error("Upload error:", error);
   }
}