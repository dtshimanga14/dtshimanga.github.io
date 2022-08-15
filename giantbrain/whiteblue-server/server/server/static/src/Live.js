import React from 'react';
import Loading from './Loading.js';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import 'whatwg-fetch';
import moment from 'moment';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import AddScheduleModalWindows from './AddScheduleModalWindows.js';
import './css/Schedule.css';
			

let stun_server = "stun.l.google.com:19302";
let localStream, localPeerConnection,RTCPeerConnection, remotePeerConnection;		
	
export default class Live extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			callStatus : false,
			hangupStatus : false,
			playStatus : false,
			
		};
	}
	onStop =()=> {
		let video = document.getElementById('local-reader');
		if (window.URL) {
				// Chrome case: URL.createObjectURL() converts a MediaStream to a blob URL
				video.srcObject = null;
		} else {
			// Firefox and Opera: the src of the video can be set directly from the stream
			video.src = null;
		}
		this.setState({ playStatus : false });
		video.stop();
	} 
	errorCallback = (error) => {
		console.log("navigator.getUserMedia error: ", error);
	}
	successCallback = (stream)=>{
			 window.stream = stream;
			 localStream = stream;
			let video = document.getElementById("local-reader");
			let remoteVideo = document.getElementById("remote-reader");
			if (window.URL) {
				video.srcObject = stream;
			} else {
				video.src = stream;
			}
			video.play();
		}
	onPlay = () => {
		let constraints = {audio: true, video: true};
		
		navigator.getUserMedia = navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia;
		navigator.getUserMedia(constraints, this.successCallback,this.errorCallback);
		this.setState({ playStatus : true });
	}
	// Handler to be called when the remote SDP becomes available
	gotRemoteDescription = (description) => {
	// Set the remote description as the local description of the
	// remote PeerConnection.
		remotePeerConnection.setLocalDescription(description);
		console.log("Answer from remotePeerConnection: \n" + description.sdp);
	// Conversely, set the remote description as the remote description of the
	// local PeerConnection
		localPeerConnection.setRemoteDescription(description);
	}
	onSignalingError = (error) => {
		console.log('Failed to create signaling message : ' + error.name);
	}
	gotLocalDescription = (description) => {
		localPeerConnection.setLocalDescription(description);
		console.log("Offer from localPeerConnection: \n" + description.sdp);
	// ...do the same with the 'pseudoremote' PeerConnection
	// Note: this is the part that will have to be changed if you want
	// the communicating peers to become remote
	// (which calls for the setup of a proper signaling channel)
		remotePeerConnection.setRemoteDescription(description);
	// Create the Answer to the received Offer based on the 'local' description
		remotePeerConnection.createAnswer(this.gotRemoteDescription, this.onSignalingError);
	}
	gotRemoteStream = (event) => {
		// Associate the remote video element with the retrieved stream
		let remoteVideo = document.getElementById("remote-reader");
		if (window.URL) {
		// Chrome
			remoteVideo.srcObject = event.stream;
		} else {
		// Firefox
			remoteVideo.src = event.stream;
		}
		remoteVideo.play();
		console.log("Received remote event object");
		console.log(event);
		console.log("Received remote stream");
		console.log(event.stream);
	}
	gotLocalIceCandidate = (event) =>{
		if (event.candidate) {
		// Add candidate to the remote PeerConnection
			remotePeerConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
			console.log("Local ICE candidate: \n" + event.candidate.candidate);
		}
	}
// Handler to be called whenever a new remote ICE candidate becomes available
	gotRemoteIceCandidate = (event) => {
		if (event.candidate) {
		// Add candidate to the local PeerConnection
			localPeerConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
			console.log("Remote ICE candidate: \n " + event.candidate.candidate);
		}
	}
	onCall = () => {
		if (navigator.webkitGetUserMedia) {
			if (localStream.getVideoTracks().length > 0) {
				console.log('Using video device: ' + localStream.getVideoTracks()[0].label);
			}
			if (localStream.getAudioTracks().length > 0) {
				console.log('Using audio device: ' + localStream.getAudioTracks()[0].label);
			}
		}
		if (navigator.webkitGetUserMedia) {
			RTCPeerConnection = webkitRTCPeerConnection;
		// Firefox
		} else if(navigator.mozGetUserMedia){
			RTCPeerConnection = mozRTCPeerConnection;
			RTCSessionDescription = mozRTCSessionDescription;
			RTCIceCandidate = mozRTCIceCandidate;
		}
		console.log("RTCPeerConnection object: " + RTCPeerConnection);
		
			let servers = null;
			localPeerConnection = new RTCPeerConnection(servers);
			console.log("Created local peer connection object localPeerConnection");
			// Add a handler associated with ICE protocol events
			localPeerConnection.onicecandidate = this.gotLocalIceCandidate;
			
			// Create the remote PeerConnection object
			remotePeerConnection = new RTCPeerConnection(servers);
			
			console.log("Created remote peer connection object remotePeerConnection");
			// Add a handler associated with ICE protocol events...
			remotePeerConnection.onicecandidate = this.gotRemoteIceCandidate;
			// ...and a second handler to be activated as soon as the remote
			// stream becomes available.
			remotePeerConnection.onaddstream = this.gotRemoteStream;
			localPeerConnection.addStream(localStream);
			console.log("Added localStream to localPeerConnection");
			// We're all set! Create an Offer to be 'sent' to the callee as soon
			// as the local SDP is ready.
			localPeerConnection.createOffer(this.gotLocalDescription, this.onSignalingError);
			
			this.setState({ callStatus : true , hangupStatus : false  });
		
	}
	onHangup = () => {
		console.log("Ending call");
		// Close PeerConnection(s)
		localPeerConnection.close();
		remotePeerConnection.close();
		localPeerConnection = null;
		remotePeerConnection = null;
		// Disable Hangup button
		this.setState({ hangupStatus : true, callStatus : false });
		// Enable Call button to allow for new calls to be established
	}
	render(){
		
				let students = [{ _id : "a" ,username : "Schenghen",middlename : "Lee",id : "remote-reader"}];
				let { hangupStatus,callStatus,playStatus } = this.state;
				
				
		return (<div>
					<div className="history-schedule">
						<div>Peers</div>
						<div>
						{students.map((student)=>(<div className="one-field">
								<div className="header-field">{student.username}{' '}{student.middlename}</div>
									<div  className="ca-field">
										<video id="remote-reader" autoplay />
									</div>
						</div>))}
						</div>
					</div>
					<div className="live-frame">
						<div>
							<video id="local-reader"  autoplay />
						</div>
						<div>
							<button className="btn" onClick={this.onStop}>Stop</button>
							<button id="startButton" className="btn" onClick={this.onPlay} disabled={playStatus}>Start</button>
							<button id="callButton" className="btn" onClick={this.onCall} disabled={callStatus}>Call</button>
							<button id="hangupButton" className="btn" onClick={this.onHangup}  disabled={hangupStatus}>Hang Up</button>
						</div>
					</div>
				</div>)
		}	
	}





				