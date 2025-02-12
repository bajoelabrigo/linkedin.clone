import {IKContext, IKUpload} from "imagekitio-react";

export default function Uploader(props) {
  return (
    <>
      <IKContext
        urlEndpoint="https://ik.imagekit.io/fireonline"
        publicKey="public_tZkqVjH1ZWlzVyQgQ0JZYS7QTd8="
        authenticator={async () => {
          const response = await fetch('/api/imagekit/auth');
          return await response.json();
        }}
      >
        <IKUpload {...props} />
      </IKContext>
    </>
  );
}
