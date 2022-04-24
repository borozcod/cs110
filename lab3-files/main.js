window.addEventListener('load', async () => {
    console.log('here');

    const tweetContainer = document.getElementById('tweet-container');
    try {
        const tweets = await fetchTweets();
        tweets.forEach(tweet => {

            const tweetDate = tweet['created_at'];

            const tweetData = {
                id: tweet['_id'],
                name: ['user']['name'],
                username: ['user']['screen_name'],
                text: tweet['text'],
                image: tweet['user']['profile_image_url'],
            }
            const htmlTweetString = formatTweet(tweetData);
            tweetContainer.appendChild(htmlTweetString);
        });
    } catch (error) {
        console.log(error);
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
    image
}) {
    const tweetHtml = document.createElement("div");
    tweetHtml.classList.add('tweet-col');
    tweetHtml.innerHTML = `
        <div class="left-tweet">
            <div class="tweet-profile-pic">
                <img src="${image}" alt="Remy Profile Pic"/>
            </div>
        </div>
        <div class="tweet-right">
            <div class="tweet-info">
                <div class="tweet-username">
                <h>${name}</h>
                </div>
                <div class="tweet-at-name"></div>
                <h>@${username}</h>
                <div class="tweet-date">
                <h>Nov 19</h>
                </div>
            </div>
            <div class="tweet-body">
                <p>${text}</p>
            </div>
        </div>
    `;
    return tweetHtml;
}