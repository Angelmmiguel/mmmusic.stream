const fetch = require('isomorphic-unfetch');

// Get the info for the given video
const getVideoInfo = async (id, token) => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${token}%20&part=snippet,status&fields=items(snippet(title,liveBroadcastContent,tags),status(uploadStatus,embeddable,privacyStatus))`);
  const json = await res.json();
  return res.status === 200 ? json.items[0] : null;
}

module.exports = getVideoInfo;
