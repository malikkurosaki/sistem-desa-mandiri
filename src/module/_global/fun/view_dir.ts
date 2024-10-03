export async function funViewDir({ dirId }: { dirId: string }) {

   try {
      const res = await fetch("https://wibu-storage.wibudev.com/api/dir/" + dirId + "/tree", {
         method: "GET",
         headers: {
            Authorization: `Bearer ${process.env.WS_APIKEY}`
         }
      });

      if (res.ok) {
         const hasil = await res.json()
         return { success: true, data: hasil.data }
      } else {
         const errorText = await res.text();
         return { success: false, data: {} }
      }
   } catch (error) {
      console.error("Upload error:", error);
      return { success: false, data: {} }
   }
}