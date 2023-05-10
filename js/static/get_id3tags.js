var jsmediatags = window.jsmediatags;

const myHeaders = new Headers(); // Currently empty
myHeaders.set('Access-Control-Allow-Headers', 'If-Modified-Since,Range');
myHeaders.set('Access-Control-Expose-Headers','Content-Length, Content-Range')
new jsmediatags.Reader("https://rfcmedia3.streamguys1.com/thirdrock.aac")
  .setTagsToRead(["title", "artist"])
  .read({
    onSuccess: function(tag) {
      console.log(tag);
    },
    onError: function(error) {
      console.log(':(', error.type, error.info);
    }
  });
