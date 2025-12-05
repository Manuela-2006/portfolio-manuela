 // GSAP animation
 document.addEventListener('DOMContentLoaded', function() {
    
  // Button click animation
  const button = document.getElementById('infoButton');
  button.addEventListener('click', function() {
    gsap.to(button, {
      scale: 0.95,
      duration: 0.1,
      onComplete: function() {
        gsap.to(button, {
          scale: 1,
          duration: 0.1
        });
      }
    });
    
    // Here you would add code to show more information
    console.log("More information requested");
  });
});