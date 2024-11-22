import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

export default function VideoCall() {
  const { bookingId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState('');
  const [stream, setStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isHost, setIsHost] = useState(false);

  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const peerConnectionRef = useRef();

  useEffect(() => {
    async function fetchBookingDetails() {
      try {
        const bookingDoc = await getDoc(doc(db, 'bookings', bookingId));
        if (!bookingDoc.exists()) {
          throw new Error('Booking not found');
        }
        setBooking(bookingDoc.data());
        // Check if current user is host (PG owner) or client
        setIsHost(bookingDoc.data().hostId === currentUser.uid);
      } catch (err) {
        setError('Failed to load booking details');
      }
    }

    fetchBookingDetails();
  }, [bookingId, currentUser.uid]);

  useEffect(() => {
    async function setupMediaStream() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        setStream(mediaStream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        setError('Failed to access camera and microphone');
      }
    }

    setupMediaStream();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const initializePeerConnection = async () => {
    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
      ]
    };

    const pc = new RTCPeerConnection(configuration);
    peerConnectionRef.current = pc;

    // Add local stream
    stream.getTracks().forEach(track => {
      pc.addTrack(track, stream);
    });

    // Handle incoming stream
    pc.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    // Handle connection state changes
    pc.oniceconnectionstatechange = () => {
      console.log('ICE Connection State:', pc.iceConnectionState);
    };

    return pc;
  };

  const handleEndCall = async () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    
    try {
      await updateDoc(doc(db, 'bookings', bookingId), {
        status: 'completed'
      });
    } catch (err) {
      console.error('Failed to update booking status:', err);
    }

    navigate('/dashboard');
  };

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <Row>
        <Col md={6} className="mb-4">
          <div className="position-relative" style={{ height: '400px' }}>
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '8px'
              }}
            />
            <div className="position-absolute bottom-0 start-0 p-3">
              <span className="badge bg-primary">You</span>
            </div>
          </div>
        </Col>
        <Col md={6} className="mb-4">
          <div className="position-relative" style={{ height: '400px' }}>
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '8px',
                backgroundColor: '#f8f9fa'
              }}
            />
            <div className="position-absolute bottom-0 start-0 p-3">
              <span className="badge bg-secondary">Remote User</span>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <Button
            variant="danger"
            size="lg"
            onClick={handleEndCall}
            className="rounded-circle"
            style={{ width: '60px', height: '60px' }}
          >
            <i className="bi bi-telephone-x"></i>
          </Button>
        </Col>
      </Row>
    </Container>
  );
} 