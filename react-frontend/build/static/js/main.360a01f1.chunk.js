(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{100:function(e,t,n){},102:function(e,t,n){},104:function(e,t,n){},106:function(e,t,n){},109:function(e,t,n){},111:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),c=n(46),r=n.n(c),i=n(20),s=n(32),l={socket:null,room:null},u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,t=arguments.length>1?arguments[1]:void 0;switch(console.log("state",e),console.log("action",t),t.type){case"SOCKET":return Object(s.a)({},e,{socket:t.socket});case"ROOM":return Object(s.a)({},e,{room:t.room});default:return e}},d=n(14),m=n(114),f=n(113),v=n(2),p=n(3),g=n(5),h=n(4),b=n(6),E=n(21),k=n.n(E),O=(n(67),function(e){function t(){return Object(v.a)(this,t),Object(g.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{id:"header"},o.a.createElement("h1",null,"PeerPong"),o.a.createElement("div",null,o.a.createElement("p",{id:"username"},"Alan Turing"),o.a.createElement("img",{id:"avatar",src:k.a,alt:"avatar"})))}}]),t}(a.Component)),j=function(e){function t(){return Object(v.a)(this,t),Object(g.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{id:"received-content"},o.a.createElement("video",{id:"received-video",autoPlay:!0}))}}]),t}(a.Component),w=function(e){function t(){return Object(v.a)(this,t),Object(g.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{id:"local-content"},o.a.createElement("video",{id:"local-video",autoPlay:!0,muted:!0}))}}]),t}(a.Component);n(70);var y=function(e){function t(){return Object(v.a)(this,t),Object(g.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){!function(){var e=!1,t=0,n=0,a=document.getElementById("canvas").getContext("2d"),o=document.getElementById("received-video");a.canvas.width=o.clientWidth,a.canvas.height=o.clientHeight,a.canvas.addEventListener("mousemove",function(a){console.log("in drawing");var o=document.getElementById("canvas").getContext("2d");e&&(o.beginPath(),o.moveTo(t,n),o.lineTo(a.offsetX,a.offsetY),o.strokeStyle="#ecf0f1",o.stroke(),t=a.offsetX,n=a.offsetY)}),a.canvas.addEventListener("mousedown",function(a){e=!0,t=a.offsetX,n=a.offsetY,console.log("coords",t," | ",n)}),a.canvas.addEventListener("mouseup",function(){return e=!1}),a.canvas.addEventListener("mouseout",function(){return e=!1}),window.addEventListener("resize",function(){var e=document.getElementById("canvas").getContext("2d"),t=document.getElementById("received-video");e.canvas.width=t.clientWidth,e.canvas.height=t.clientHeight})}()}},{key:"render",value:function(){return o.a.createElement("div",{id:"canvas-content"},o.a.createElement("canvas",{id:"canvas"}))}}]),t}(a.Component),C=n(9),x=n.n(C),S=n(11),T=n(48),I=function(e){var t=new Date;console.log("------------------------------------"),console.log("["+t.toLocaleTimeString()+"] "+e)};function R(){var e=document.getElementById("canvas").getContext("2d");e.fillStyle="#2c3e50",e.fillRect(0,0,e.canvas.width,e.canvas.height),I("Starting to read stream from canvas");var t=e.canvas.captureStream(25);console.log("canvas stream tracks",t.getTracks()),_(t.getTracks()[0])}function D(){return(D=Object(S.a)(x.a.mark(function e(){var t,n,a=arguments;return x.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=!(a.length>0&&void 0!==a[0])||a[0],e.prev=1,I("Requesting webcam access..."),e.next=5,navigator.mediaDevices.getUserMedia({audio:!0,video:{width:612,height:288}});case 5:n=e.sent,I("-- Local camera stream obtained"),document.getElementById("local-video").srcObject=n,t?(I("-- Adding tracks to the RTCPeerConnection"),n.getTracks().forEach(function(e){I("im a track"),M.addTrack(e,n)})):(I("-- Adding stream to the RTCPeerConnection"),M.addStream(n)),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),Z(e.t0);case 14:case"end":return e.stop()}},e,this,[[1,11]])}))).apply(this,arguments)}function N(){return B.apply(this,arguments)}function B(){return(B=Object(S.a)(x.a.mark(function e(){var t;return x.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,I("Requesting screen access..."),e.next=4,navigator.getDisplayMedia({video:!0});case 4:t=e.sent,I("-- Local video screen stream obtained"),document.getElementById("local-video").srcObject=t,_(t.getTracks()[0]),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),Z(e.t0);case 14:case 15:case"end":return e.stop()}},e,this,[[0,11]])}))).apply(this,arguments)}function _(e){return L.apply(this,arguments)}function L(){return(L=Object(S.a)(x.a.mark(function e(t){var n,a;return x.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!U){e.next=11;break}return I("-- adding new Screen video track to the RTCPeerConnection"),e.next=4,M.addTrack(t);case 4:return n=M.getSenders(),console.log("rtc senders",n),a=n.filter(function(e){return"video"===e.track.kind&&!e.track.label.includes("screen")})[0],console.log("sender to remove",a),I("-- removing old video track in the RTCPeerConnection"),e.next=11,M.removeTrack(a);case 11:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}var P=n.n(T).a.connect("wss://codeworks-solo-project.herokuapp.com/");P.on("connect",function(){I("socket opened...")}),P.on("connect_error",function(e){I("Connection error to socket.io server...")}),P.on("join-room",function(e){switch(e){case"waiting-for-other-person":I(e);break;case"ready-for-videocall":I(e),W(),function(){D.apply(this,arguments)}();break;case"too-many-people":I(e);break;default:I("error of some sort with the rooms")}}),P.on("video-offer",function(e){I("i received an offer for videochat"),function(e){Q.apply(this,arguments)}(e)}),P.on("video-answer",function(e){I("i received an answer for videochat"),function(e){I("Call recipient has accepted our call");var t=new RTCSessionDescription(e);M.setRemoteDescription(t).catch(ee)}(e)}),P.on("new-ice-candidate",function(e){I("i received a new ice candidate remotelily from other peer"),function(e){var e=new RTCIceCandidate(e);I("Adding received ICE candidate: "+JSON.stringify(e)),M.addIceCandidate(e).catch(ee)}(e)});var A=P,M=null,U=!1,X=0;function W(){I("Setting up a connection..."),M=new RTCPeerConnection({iceServers:[{urls:"stun.voipzoom.com:3478"},{urls:"stun:stun.l.google.com:19302"},{urls:"turn:numb.viagenie.ca",username:"webrtc@live.com",credential:"muazkh"}]}),U=void 0!==M.addTrack,M.onnegotiationneeded=z,M.onicecandidate=K,M.onnremovestream=H,M.oniceconnectionstatechange=Y,M.onicegatheringstatechange=V,M.onsignalingstatechange=G,U?M.ontrack=J:M.onaddstream=q}function z(e){return F.apply(this,arguments)}function F(){return(F=Object(S.a)(x.a.mark(function e(t){var n;return x.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(1!=M._negotiating){e.next=2;break}return e.abrupt("return");case 2:return I("*** Negotiation needed"),M._negotiating=!0,e.prev=4,I("---\x3e Creating offer"),e.next=8,M.createOffer();case 8:return n=e.sent,console.log("im the offer",n),I("---\x3e Creating new description object to send to remote peer"),e.next=13,M.setLocalDescription(n);case 13:I("---\x3e Sending offer to remote peer"),A.emit("video-offer",M.localDescription),console.log("in negotiation needed myPeerConnection.localDescription",M.localDescription),e.next=21;break;case 18:e.prev=18,e.t0=e.catch(4),ee(e.t0);case 21:return e.prev=21,M._negotiating=!1,e.finish(21);case 24:case"end":return e.stop()}},e,this,[[4,18,21,24]])}))).apply(this,arguments)}function J(e){I("*** Track event"),X++,console.log("NUMBER OF TRACKS IS ",X),document.getElementById("received-video").srcObject=e.streams[0]}function q(e){I("*** Stream added"),document.getElementById("received-video").srcObject=e.stream}function H(e){I("*** Stream removed"),$()}function K(e){e.candidate&&(I("Outgoing ICE candidate: "+e.candidate.candidate),A.emit("new-ice-candidate",e.candidate))}function Y(e){switch(I("*** ICE connection state changed to "+M.iceConnectionState),M.iceConnectionState){case"closed":case"failed":case"disconnected":$()}}function G(e){I("*** WebRTC signaling state changed to: "+M.signalingState),"closed"===M.signalingState&&$()}function V(e){I("*** ICE gathering state changed to: "+M.iceGatheringState)}function $(){var e=document.getElementById("received-video"),t=document.getElementById("local-video");I("Closing the call"),M&&(I("--\x3e Closing the peer connection"),M.onaddstream=null,M.ontrack=null,M.onremovestream=null,M.onnicecandidate=null,M.oniceconnectionstatechange=null,M.onsignalingstatechange=null,M.onicegatheringstatechange=null,M.onnotificationneeded=null,e.srcObject&&e.srcObject.getTracks().forEach(function(e){return e.stop()}),t.srcObject&&t.srcObject.getTracks().forEach(function(e){return e.stop()}),e.src=null,t.src=null,M.close(),M=null)}function Q(){return(Q=Object(S.a)(x.a.mark(function e(t){var n,a,o,c;return x.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,M){e.next=16;break}return console.log(" handle video offer msg when connection existst"),W(),n=new RTCSessionDescription(t),e.next=7,M.setRemoteDescription(n);case 7:return I("Setting up the local media stream..."),e.next=10,navigator.mediaDevices.getUserMedia({audio:!0,video:{width:612,height:288}});case 10:a=e.sent,I("-- Local video stream obtained"),document.getElementById("local-video").srcObject=a,U?(I("-- Adding tracks to the RTCPeerConnection"),a.getTracks().forEach(function(e){return M.addTrack(e,a)})):(I("-- Adding stream to the RTCPeerConnection"),M.addStream(a)),e.next=20;break;case 16:return console.log("handle video offer message when connection exists"),o=new RTCSessionDescription(t),e.next=20,M.setRemoteDescription(o);case 20:return I("------\x3e Creating answer"),e.next=23,M.createAnswer();case 23:return c=e.sent,e.next=26,M.setLocalDescription(c);case 26:I("------\x3e Setting local description after creating answer"),A.emit("video-answer",M.localDescription),I("Sending answer packet back to other peer"),e.next=35;break;case 31:e.prev=31,e.t0=e.catch(0),console.log(e.t0),Z(e.t0);case 35:return e.prev=35,M._negotiating=!1,e.finish(35);case 38:case"end":return e.stop()}},e,this,[[0,31,35,38]])}))).apply(this,arguments)}function Z(e){switch(I("HANDLE GET USER MEDIA ERROR FUNCTION"),e.name){case"NotFoundError":alert("Unable to open your call because no camera and/or microphonewere found.");break;case"SecurityError":case"PermissionDeniedError":break;default:alert("Error opening your camera and/or microphone: "+e.message)}$()}function ee(e){!function(e){var t=new Date;console.error("["+t.toLocaleTimeString()+"] "+e)}("Error "+e.name+": "+e.message)}function te(){document.getElementById("file-input").click(),console.log("buzzu",M)}function ne(){var e=document.getElementById("file-input").files[0];console.log("file to send",e),function(){var e=M.createDataChannel("sendChannel");e.onopen=ae,e.onclose=oe}()}function ae(){console.log("data channel on open callback")}function oe(){console.log("data channel on close callback")}var ce=n(49),re=n.n(ce),ie=n(50),se=n.n(ie),le=n(51),ue=n.n(le),de=n(52),me=n.n(de),fe=(n(98),function(e){function t(){return Object(v.a)(this,t),Object(g.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{id:"toolbar"},o.a.createElement("input",{type:"file",id:"file-input",onChange:ne,style:{display:"none"}}),o.a.createElement("img",{className:"icons",src:re.a,alt:"icon1",onClick:te}),o.a.createElement("img",{className:"icons",src:se.a,alt:"icon2"}),o.a.createElement("img",{className:"icons",src:ue.a,alt:"icon3"}),o.a.createElement("img",{className:"icons",src:me.a,alt:"icon4"}))}}]),t}(a.Component)),ve=n(53),pe=n.n(ve),ge=n(54),he=n.n(ge),be=n(55),Ee=n.n(be),ke=(n(100),function(e){function t(){return Object(v.a)(this,t),Object(g.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{id:"call-buttons"},o.a.createElement("div",{className:"round-bg",onClick:N},o.a.createElement("img",{className:"call-buttons",src:pe.a,alt:"Share your screen icon"})),o.a.createElement("div",{className:"round-bg",onClick:R},o.a.createElement("img",{className:"call-buttons",src:he.a,alt:"Share notes on a blackboard icon"})),o.a.createElement("div",{className:"round-bg",onClick:$},o.a.createElement("img",{className:"call-buttons",src:Ee.a,alt:"Close current call icon"})))}}]),t}(a.Component)),Oe=(n(102),function(e){function t(){return Object(v.a)(this,t),Object(g.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{id:"video-container"},o.a.createElement(j,null),o.a.createElement(w,null),o.a.createElement(y,null),o.a.createElement(fe,null),o.a.createElement(ke,null))}}]),t}(a.Component)),je=(n(104),function(e){function t(){return Object(v.a)(this,t),Object(g.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement(O,null),o.a.createElement(Oe,null))}}]),t}(a.Component)),we=Object(d.b)(function(e){return{socket:e.socket}},function(e){return{}})(je),ye=n(112),Ce=(n(106),function(e){function t(){var e,n;Object(v.a)(this,t);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(n=Object(g.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(o)))).readInputField=function(){var e=document.getElementById("room-name").value;A.emit("join-room",e)},n}return Object(b.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{id:"join-room-wrapper"},o.a.createElement("div",{id:"join-room-form"},o.a.createElement("img",{id:"profile-photo",src:k.a,alt:"avatar"}),o.a.createElement("input",{id:"room-name",type:"text",placeholder:"Which room do you wanna join?",required:!0}),o.a.createElement(ye.a,{to:"/videochat"},o.a.createElement("button",{id:"join",onClick:this.readInputField},"Join room"))))}}]),t}(a.Component)),xe=Object(d.b)(function(e){return{socket:e.socket}},function(e){return{updateSocketInStore:function(t){return e({type:"SOCKET",socket:t})},updateRoomNameInStore:function(t){return e({type:"ROOM",room:t})}}})(Ce),Se=function(e){var t=e.store;return o.a.createElement(d.a,{store:t},o.a.createElement(m.a,null,o.a.createElement("div",{id:"routes-wrapper"},o.a.createElement(f.a,{exact:!0,path:"/",component:xe}),o.a.createElement(f.a,{path:"/videochat",component:we}))))};n(109),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Te=Object(i.b)(u,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());r.a.render(o.a.createElement(Se,{store:Te}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},21:function(e,t,n){e.exports=n.p+"static/media/man.dabcdaa2.svg"},49:function(e,t,n){e.exports=n.p+"static/media/001-conference.77761e56.svg"},50:function(e,t,n){e.exports=n.p+"static/media/010-mail.68722792.svg"},51:function(e,t,n){e.exports=n.p+"static/media/013-videocall-1.6b6feeaf.svg"},52:function(e,t,n){e.exports=n.p+"static/media/024-megaphone.2a0a42f8.svg"},53:function(e,t,n){e.exports=n.p+"static/media/share-screen.1219b614.svg"},54:function(e,t,n){e.exports=n.p+"static/media/blackboard.781bd799.svg"},55:function(e,t,n){e.exports=n.p+"static/media/close-call.973863ac.svg"},58:function(e,t,n){e.exports=n(111)},67:function(e,t,n){},70:function(e,t,n){},95:function(e,t){},98:function(e,t,n){}},[[58,2,1]]]);
//# sourceMappingURL=main.360a01f1.chunk.js.map