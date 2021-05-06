var NodeMediaServer = require('node-media-server');
var User = require('./models/User').User;

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 60,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*'
  }
};

var nms = new NodeMediaServer(config);

nms.on('prePublish', async (id, StreamPath, args) => {
  let stream_key = getStreamKeyFromStreamPath(StreamPath);
  console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);

  User.findOne({ stream_key: stream_key }, (err, user) => {
    if (!err) {
      if (!user) {
        let session = nms.getSession(id);
        session.reject();
      } else {
        // do stuff
      }
    }
  });
});

const getStreamKeyFromStreamPath = (path) => {
  let parts = path.split('/');
  return parts[parts.length - 1];
};

module.exports = nms;
