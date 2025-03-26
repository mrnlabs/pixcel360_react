import { Event } from "@/types";

export  const downloadQRCode = (page: string, event: Event) => {
    // Get the SVG element
    const svgElement = document.getElementById('qr-code')!.querySelector('svg');
    
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    // Set canvas dimensions (make it a bit larger for better quality)
    if (!svgElement) {
        console.error("SVG element not found");
        return;
    }
    const svgRect = svgElement.getBoundingClientRect();
    canvas.width = svgRect.width * 2;
    canvas.height = svgRect.height * 2;
    
    // Create an image from the SVG
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const img = new Image();
    
    // Create a blob URL for the SVG
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    img.onload = () => {
      if(!context) {
        console.error("Context not found");
        return;
      }
      // Draw the image on the canvas
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Convert the canvas to a data URL and trigger download
      const dataUrl = canvas.toDataURL('image/png');
      
      // Create a download link
      const downloadLink = document.createElement('a');
      downloadLink.href = dataUrl;
      if(page == 'event'){
        downloadLink.download = `#${event?.id + (event.name ?? 'qr')}.png`;
      }else{
       downloadLink.download = `#${event?.id + (event.setting?.gallery_name ?? 'share')}.png`;
      }
      // Trigger the download
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      // Clean up
      URL.revokeObjectURL(svgUrl);
    };
    
    img.src = svgUrl;
  };