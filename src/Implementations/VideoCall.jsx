import { CallingState, ParticipantView, StreamCall, StreamTheme, StreamVideo, StreamVideoClient, useCall, useCallStateHooks } from "@stream-io/video-react-sdk";


const apiKey = 'mmhfdzb5evj2';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1ByaW5jZV9YaXpvciIsInVzZXJfaWQiOiJQcmluY2VfWGl6b3IiLCJ2YWxpZGl0eV9pbl9zZWNvbmRzIjo2MDQ4MDAsImlhdCI6MTc0NTczMzYyNywiZXhwIjoxNzQ2MzM4NDI3fQ.xUGhZK_b56w8e3psYEt1b0PzJus9cnkTk49DZAgn_MM';
const userId = 'Prince_Xizor';
const callId = 'iwiJ2LKCMoRe';

// set up the user object
const user = {
  id: userId,
  name: 'Oliver',
  image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call('default', callId);
await call.join({ create: true });

export const MyUILayout = () => {
  const call = useCall();

  const { useCallCallingState, useParticipantCount, useLocalParticipant, useRemoteParticipants } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();
  const localParticipant = useLocalParticipant();
  const remoteParticipant = useRemoteParticipants();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
      <StreamTheme style={{position:"relative"}}>
        <MyParticipantList participants={remoteParticipant} />
        <MyFloatingLocalParticipant participant={localParticipant} />
      </StreamTheme>
  );
};

export default function App() {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}

export const MyParticipantList = (props) => {
  const { participants } = props;
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '8px',width:'100vw' }}>
      {participants.map((participant) => (
        <div style={{width:"100%",aspectRatio:"3/2"}}>

        <ParticipantView participant={participant} key={participant.sessionId} />
        </div>
      ))}
    </div>
  );
};

export const MyFloatingLocalParticipant = (props) => {
  const { participant } = props;
  if (!participant) {
    return <p>Error: No local participant</p>;
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: '15px',
        left: '15px',
        width: '240px',
        height: '135px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 10px 3px',
        borderRadius: '12px',
      }}
    >
    {
      participant && <ParticipantView participant={participant} />
    }
      
    </div>
  );
};