const fetch = require('isomorphic-unfetch');

// Get the info for the given video
const getVideoInfo = async (id, token) => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${token}&part=snippet,status`);
  const json = await res.json();

  if (res.status !== 200) {
    console.error(`[https://youtube.com/watch?v=${id}] Error retrieving the video info: `);

    if (json.error != null && json.error.message != null) {
      console.error(`[https://youtube.com/watch?v=${id}] ${json.error.message}`);
    } else {
      console.error(json);
    }
  }
  return res.status === 200 ? json.items[0] : null;
}

module.exports = getVideoInfo;
