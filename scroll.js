document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !event.defaultPrevented) {
      event.preventDefault();
  
      // Calculate the height of the viewport
      const viewportHeight = window.innerHeight;
  
      // Get the current scroll position
      const currentScrollPosition = document.documentElement.scrollTop;
  
      // Calculate the height of the document
      const documentHeight = document.documentElement.scrollHeight;
  
      // Calculate the next section's position (relative to the current position)
      let nextSectionPosition = viewportHeight * (Math.floor(currentScrollPosition / viewportHeight) + 1);
  
      // If the next section position is greater than the document height,
      // it means we are at the bottom and should scroll back to the top
      if (nextSectionPosition + viewportHeight >= documentHeight) {
        nextSectionPosition = 0; // Set the position to the top of the document
      }
  
      // Smoothly scroll to the next section or to the top if at the end
      window.scrollTo({
        top: nextSectionPosition,
        behavior: 'smooth'
      });
    }
  });
  