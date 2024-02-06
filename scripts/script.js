const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")
const loader = document.getElementById('loader');

let apiQuotes = [];

//Show showLoader
function showLoader(){
    loader.hidden = false;
    quoteContainer.hidden=true;
}
//Hide showLoader
function closeLoader(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}

//Show New Quote
function newQuote(){
    showLoader();
    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    // Check if author field is blank and replace it with 'Unknown'
    if (!quote.author){
        authorText.textContent='Unknown';
    }else {
        quoteText.textContent = quote.text;
    }
    // Check Quote length to determine styling
    if (quote.text.length>50){
        quoteText.classList.add('long-quote');
    } else{
        quoteText.classList.remove('long-quote');
    }
    //Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    closeLoader();
}
// Get Quotes From API
async function getQuotes(){
    showLoader();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error){
        //Catch Error Here
    }

}

//Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click',tweetQuote);

// On Load
getQuotes();