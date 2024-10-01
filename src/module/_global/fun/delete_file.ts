export async function funDeleteFile({ fileId }: { fileId: string }) {
   try {
      const res = await fetch(`https://wibu-storage.wibudev.com/api/files/${fileId}/delete`, {
         method: "DELETE",
         headers: {
            Authorization: `Bearer ${process.env.WS_APIKEY}`
         }
      });

      if (res.ok) {
         const hasil = await res.json()
         return { success: true }
      } else {
         const errorText = await res.json();
         return { success: false }
      }
   } catch (error) {
      return { success: false }
      console.error("Upload error:", error);
   }
}