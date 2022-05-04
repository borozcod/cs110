window.addEventListener('load', () => {

    const ids = {}; // hashmap
    var tweetList = []; // array
    const tweetContainer = document.getElementById('tweet-container');
    const checkbox = document.getElementById("pause");
    const serachBar = document.getElementById("searchBar");

    var pause = false;
    // Check for the checkboxes
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            pause = true;
        } else {
            pause = false;
        }
    });

    serachBar.addEventListener("input", handleSearch);

    var searchString = "";
    // search bar handler
    function handleSearch(event){

        searchString = event.target.value.trim().toLowerCase();
        var displayTweets = tweetList;

        if(searchString) {
            displayTweets = tweetList.filter(tweet => {
                return tweet['text'].trim().toLowerCase().includes(searchString);
            });
        }

        renderTweets(displayTweets);
    };

    loadTweets();
    // load tweets every 5s, only if not paused
    const getTweets = setInterval(() => {
        if(!pause) {
            loadTweets();
        }
    }, 5000);

    /**
     * load tweets from server, appends tweets to tweetList and sorts them
     *
     */
    async function loadTweets() {
        try {
            const tweets = await fetchTweets();

            // Check if tweets have not been added
            tweets.forEach(tweet => {
                if(!ids[tweet['_id']]) {
                    ids[tweet['_id']] = true;
                    tweetList.push(tweet);
                }
            });

            // Sort tweets
            tweetList.sort(function(a,b) {
                return new Date(b.created_at) - new Date(a.created_at);
            })

            var displayTweets = tweetList;
            // is searching, filter tweets by search term
            if(searchString) {
                displayTweets = tweetList.filter(tweet => {
                    return tweet['text'].trim().toLowerCase().includes(searchString);
                });
            }

            renderTweets(displayTweets);


        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Renders tweets to document
     *
     * @param {Array} displayTweets
     * @returns {Promise} 
     */
    function renderTweets(displayTweets) {
        var tweetHTMLList = '';
        displayTweets.forEach(tweet => {

            const tweetDisplayDate = moment(tweet['created_at']).format('DD/MM/YY, k:mm');
            const tweetDate = new Date(tweet['created_at']);

            const tweetData = {
                id: tweet['_id'],
                name: tweet['user']['name'],
                username: tweet['user']['screen_name'],
                text: tweet['text'],
                image: tweet['user']['profile_image_url'],
                date: tweetDisplayDate
            }

            const htmlTweetString = formatTweet(tweetData);

            tweetHTMLList += htmlTweetString;
        })
        tweetContainer.innerHTML = tweetHTMLList;
    }
})


/**
 * Fetch tweets from the server
 *
 * @param {string} [term='weather']
 * @returns {Promise} resolved with the tweets
 */
async function fetchTweets(term = 'weather'){
    return new Promise((resolve, reject) => {
        fetch(`http://ec2-18-209-247-77.compute-1.amazonaws.com:3000/feed/random?q=${term}`).then((response) => response.json())
        .then((responseJSON) => {
            const {statuses} = responseJSON;
            resolve(statuses);
        });
    });
}

/**
 * Create the html string that will be appended to the row of tweets
 *
 * @param {*} {
 *     id,
 *     text,
 *     image
 * }
 * @returns {Node}
 */
function formatTweet({
    id,
    name,
    username,
    text,
    image,
    date
}) {

    const tweetHtml = `
    <div class="tweet-col">
        <div class="left-tweet">
            <div class="tweet-profile-pic">
                <img src="${image}" alt="Remy Profile Pic"/>
            </div>
        </div>
        <div class="tweet-right">
            <div class="tweet-info">
                <div class="tweet-username">
                    <span>${name}</span>
                </div>
                <div class="tweet-at-name">
                    <span>@${username}</span>
                </div>
                <div class="tweet-date">
                    <span>${date}</span>
                </div>
            </div>
            <div class="tweet-body">
                <p>${text}</p>
            </div>
        </div>
    </div>
    `;
    return tweetHtml;
}