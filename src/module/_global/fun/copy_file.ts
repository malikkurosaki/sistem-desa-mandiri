export async function funCopyFile({ fileId, dirId }: { fileId: string, dirId: string }) {
   try {
      const res = await fetch(`https://wibu-storage.wibudev.com/api/files/copy/${dirId}/${dirId}`, {
         method: "POST",
         body: JSON.stringify({ fileId: fileId }),
         headers: {
            Authorization: `Bearer ${process.env.WS_APIKEY}`
         }
      });

      if (res.ok) {
         const hasil = await res.json()
         return { success: true, data: hasil.data }
      } else {
         const errorText = await res.json();
         return { success: false, data: {} }
      }
   } catch (error) {
      console.error("Copy error:", error);
      return { success: false, data: {} }
   }
}