const cards = document.querySelectorAll('.Card');

const observer = new IntersectionObserver(entries => { //Entries are any element that has changed (intersected or unIntersected)
  entries.forEach(entry => {
      entry.target.classList.toggle("Show", entry.isIntersecting);
      //if(entry.isIntersecting){ observer.unobserve(entry.target) } // IMPORTANT: if it has been on the screen but is no longer, then let it be.
  });
    console.log(entries);
}, 
{
// threshold: 0.5, // if the element is 50% of the screen, then it will be shown.
root: null, // the root element is the entire screen when null otherwise it is a parent element.
rootMargin: "100px" // "-100px" // the root margin is the amount of pixels that the root element is offset from the top of the screen. This is useful for when the root element is not the entire screen and when set to positive 100 px we can load images when elements are 100px away from being viewed so it gives us time to get the images for the user.
}); // this object is a config object to tell the intersectionobserver how to perform. Threshold is how much of the element must be visible before we run the callback. Default is 0 meaning only 1 pixel has to be visible.

cards.forEach(card => observer.observe(card)); // these cards are the ones that will be observer. EG. the entries in the callback to IntersectionObserver.

//***************** Lazy Loader ******************************/
const lastEntryObserver = new IntersectionObserver(entries => { 
    const lastEntry = entries[0]; // We only observe ONE THING: namely the last card in DOM
    if(!lastEntry.isIntersecting){ return} // no changes so do nothing. Do something only when the last card is intersecting (showing up in the viewport)
    loadNewCards();
    lastEntryObserver.unobserve(lastEntry.target); //unobserve because it is no longer the last target
    lastEntryObserver.observe(document.querySelector('.Card:last-child')); //observe the new last card target.
});
lastEntryObserver.observe(document.querySelector('.Card:last-child')); // observe the last card in the DOM

const cardContainer = document.querySelector('.CardContainer');

const loadNewCards = () => {
    for(let i = 0; i < 3; i++){
        const newCard = document.createElement('div');
        newCard.classList.add('Card');
        newCard.textContent = "New Card";
        observer.observe(newCard);
        cardContainer.append(newCard);
    }
}