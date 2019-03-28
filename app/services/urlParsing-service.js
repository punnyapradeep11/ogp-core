var request = require("request");
var cheerio = require("cheerio");

function parseUrl(url) {
    return new Promise((resolve, reject) => {
        //Fetch HTML content of given url
        request(url, (error, response, urlHtmlResponse) => {
            if (error) {
                reject(JSON.stringify({
                    message: 'Error occurre while fetching web page'
                }));
            } else {
                // Pass the resulting HTML content to extract its metadata
                extractHtml(urlHtmlResponse)
                .then((ogpContent) => {
                    resolve (ogpContent);
                }, (err) => {
                    reject(JSON.stringify({
                        message: 'Error occurre while fetching web page'
                    }));
                });                                                                                             
            }
        });
    });
}

function extractHtml(urlHtmlResponse) {
    return new Promise((resolve, reject) => {
        var ogpContent = {},
        $ = cheerio.load(urlHtmlResponse),

        //get references to the meta elements
        $title = $('head title').text(),
        $desc = $('meta[name="description"]').attr('content'),
        $images = $('img');   

        if ($title) {
            ogpContent.title = $title;
        }
 
        if ($desc) {
            ogpContent.description = $desc;
        }
 
        if ($images && $images.length){
            ogpContent.images = [];
            for (var i = 0; i < $images.length; i++) {
                if($($images[i]).attr('src') != '' && $($images[i]).attr('src') != null) {
                    ogpContent.images.push($($images[i]).attr('src'));
                }
            }
        }  
        console.log('content : ', ogpContent)
        resolve(ogpContent);
    });
}
module.exports = {
    parseUrl: parseUrl
}