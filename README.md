import React, { useEffect, useState } from 'react';
import { TypedDataUtils } from 'eth-sig-util';

function TypedDataHashPage() {
  const [typedDataHash, setTypedDataHash] = useState(null);

  useEffect(() => {
    // Define your typed data here
    const typedData = {
      types: {
        // Define your types here
      },
      primaryType: 'YourPrimaryType',
      domain: {
        // Define your domain data here
      },
      message: {
        // Define your message data here
      },
    };

    // Generate the typed data hash
    const hash = TypedDataUtils.sign(typedData);

    setTypedDataHash(hash);
  }, []);

  return (
    <div>
      {typedDataHash ? (
        <div>
          <p>Typed Data Hash: {typedDataHash}</p>
          {/* Render other components or UI elements here */}
        </div>
      ) : (
        <p>Calculating typed data hash...</p>
      )}
    </div>
  );
}

export default TypedDataHashPage;
