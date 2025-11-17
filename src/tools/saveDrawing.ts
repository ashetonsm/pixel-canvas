export function saveDrawing(
  name: string
) {
  try {
    var path = ""
    // Query for the canvas
    const canvas = document.querySelector('canvas')!
    canvas.toBlob(async (blob) => {
      path = URL.createObjectURL(blob!)
      const img = document.createElement("img");
      const imgOnlyLink = document.createElement("a");
      imgOnlyLink.href = path
      imgOnlyLink.target = "_blank"
      img.src = path
      img.height = 100;
      const imageDiv = document.createElement("div");
      imageDiv.className = "column"
      imageDiv.appendChild(imgOnlyLink)

      // a with img inside
      imgOnlyLink.appendChild(img)

      imageDiv.appendChild(imgOnlyLink)
      
      const textOnlyLink = document.createElement("a");
      textOnlyLink.href = path
      textOnlyLink.innerText = name
      textOnlyLink.target = "_blank"

      // link with only text
      imageDiv.appendChild(textOnlyLink)
      
      // The gallery div that the images will be displayed in
      const gallery = document.getElementById("gallery")
      gallery!.appendChild(imageDiv)
    }, 'image/png')


  } catch (e: any) {
    console.log("Error: ", e)
  }
}