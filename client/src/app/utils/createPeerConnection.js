import axios from 'axios';
import Peer from 'peerjs';


// export default createPeerConnection = () => {
const createPeerConnection = () => {


  var peer = new Peer({
    key: '7inh9zl1wy9l766r',
    debug: 3,
    config: {'iceServers': [
    { url: 'stun:stun1.l.google.com:19302' },
    { url: 'turn:numb.viagenie.ca',
      credential: 'muazkh', username: 'webrtc@live.com' }
    ]}
  });

  var peerId, conn;
  // console.log('Peer ID is', peerId['id']);


  peer.on('open', (id) => {
    peerId = id;
    console.log('Peer ID is', peerId);
    console.log(peer);
    conn = peer.connect(peerId, {metadata: {
      'username': 'Emerson' //username
    }});
    // conn = peer.connect(peerId, {metadata: {
    //   'username': 'Emerson' //username
    // }});
    // axios.post('/broadcast', {peerId: peerId})
    // .then(response => console.log(response))
    // .catch(err => console.error('Error posting peer ID to server', err));
  });
  // conn = peer.connect(peerId, {metadata: {
  //   'username': 'Emerson' //username
  // }});
  

  function getVideo(callback){
    navigator.getUserMedia({audio: true, video: true}, callback, error => {
      console.error(error);
      alert('An error occured. Please try again');
    });
  }

  getVideo(stream => {
    window.localStream = stream;
    console.log(window.localStream);
    // onReceiveStream(stream, 'my-camera');
  });



  peer.on('call', call => {
    onReceiveCall(call);
  });

  function onReceiveCall(call){
    call.answer(window.localStream);
    // call.on('stream', function(stream){
    //   window.peer_stream = stream;
    //   onReceiveStream(stream, 'peer-camera');
    // });
  }

};

export default createPeerConnection;
// $(function(){

//   var messages = [];
//   var peer_id, name, conn;
//   var messages_template = Handlebars.compile($('#messages-template').html());

//   var peer = new Peer({
//     key: '7inh9zl1wy9l766r',
//     debug: 3,
//     config: {'iceServers': [
//     { url: 'stun:stun1.l.google.com:19302' },
//     { url: 'turn:numb.viagenie.ca',
//       credential: 'muazkh', username: 'webrtc@live.com' }
//     ]}
//   });



//   peer.on('open', function(){
//     $('#id').text(peer.id);
//   });


//   function getVideo(callback){
//     navigator.getUserMedia({audio: true, video: true}, callback, function(error){
//       console.log(error);
//       alert('An error occured. Please try again');
//     });
//   }

//   getVideo(function(stream){
//     window.localStream = stream;
//     onReceiveStream(stream, 'my-camera');
//   });

//   function onReceiveStream(stream, element_id){
//     var video = $('#' + element_id + ' video')[0];
//     video.src = window.URL.createObjectURL(stream);
//     window.peer_stream = stream;
//   }

//   $('#login').click(function(){
//     name = $('#name').val();
//     peer_id = $('#peer_id').val();
//     if(peer_id){
//       conn = peer.connect(peer_id, {metadata: {
//         'username': name
//       }});
//       conn.on('data', handleMessage);
//     }

//     $('#chat').removeClass('hidden');
//     $('#connect').addClass('hidden');
//   });

//   peer.on('connection', function(connection){
//     conn = connection;
//     peer_id = connection.peer;
//     conn.on('data', handleMessage);
//     console.log('joined room');

//     $('#peer_id').addClass('hidden').val(peer_id);
//     $('#connected_peer_container').removeClass('hidden');
//     $('#connected_peer').text(connection.metadata.username);
//   });

//   function handleMessage(data){
//     var header_plus_footer_height = 285;
//     var base_height = $(document).height() - header_plus_footer_height;
//     var messages_container_height = $('#messages-container').height();
//     messages.push(data);

//     var html = messages_template({'messages' : messages});
//     $('#messages').html(html);

//     if(messages_container_height >= base_height){
//       $('html, body').animate({ scrollTop: $(document).height() }, 500);
//     }
//   }

//   function sendMessage(){
//     var text = $('#message').val();
//     var data = {'from': name, 'text': text};

//     conn.send(data);
//     handleMessage(data);
//     $('#message').val('');
//   }

//   $('#message').keypress(function(e){
//     if(e.which == 13){
//       sendMessage();
//     }
//   });

//   $('#send-message').click(sendMessage);

//   $('#call').click(function(){
//     console.log('now calling: ' + peer_id);
//     console.log(peer);
//     var call = peer.call(peer_id, window.localStream);
//     call.on('stream', function(stream){
//       window.peer_stream = stream;
//       onReceiveStream(stream, 'peer-camera');
//     });
//   });

//   peer.on('call', function(call){
//     onReceiveCall(call);
//   });

//   function onReceiveCall(call){
//     call.answer(window.localStream);
//     call.on('stream', function(stream){
//       window.peer_stream = stream;
//       onReceiveStream(stream, 'peer-camera');
//     });
//   }

// });