import React, { useEffect, useState } from 'react';

// Define types for any props here
type TokenproofDemoProps = {
  appId: string;
};

export const TokenproofDemo = ({ appId }) => {
  const [nonce, setNonce] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);


  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.tokenproof.xyz/js/tokenproof-oa-widget-v1.0.js";
    script.async = true;
    document.body.appendChild(script);

    const checkTokenproofReady = setInterval(() => {
      if (window.tokenproof && typeof window.tokenproof.on === 'function') {
        clearInterval(checkTokenproofReady);

        // Event listener for the nonce event
        window.tokenproof.on("nonce", (event: any) => {
          console.log("Nonce generated: ", event);
          setNonce(event);
        });

        // Event listener for the verified event
        window.tokenproof.on("verified", (event: any) => {
          setVerificationStatus(event);
          if (event?.status === 'authenticated') {
            setIsAuthenticated(true);
          } else if (event?.status === 'rejected') {
            setIsAuthenticated(false);
          }
        });
      }
    }, 1000); // check every second

    return () => {
      document.body.removeChild(script);
      clearInterval(checkTokenproofReady);
    };
  }, []);

  const login = async () => {
    try {

      const result = await (window as any).tokenproof.login({ appId });
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  // Event listeners can be managed here

  return (
    <div id="app">
      <button 
        id="button" 
        style={{
          width: '288px', height: '60px', border: 'none', textAlign: 'center',
          background: '#2665FF', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '10px', fontFamily: 'Montserrat, sans-serif', fontWeight: 600,
          fontSize: '14px', color: 'white', display: 'flex', justifyContent: 'space-around',
          alignItems: 'center', cursor: 'pointer'
        }}
        onClick={login}
      >
        <img src="https://cdn.tokenproof.xyz/img/tokenproofIconWhite.png" style={{ height: '30px' }} alt="Tokenproof Icon" />
        <span>Authenticate with tokenproof</span>
      </button>

      {verificationStatus?.status === 'rejected' && (
        <div>
          <p>You are not a Spork staker. Please visit <a href="https://stake.sporkdao.io">stake.sporkdao.io</a> to stake.</p>
        </div>
      )}

      {isAuthenticated && (
        <iframe 
          className="airtable-embed"
          src="https://airtable.com/embed/appcYvbPafUnUf3Gv/pagk2Tw39RVV1XGKP/form"
          frameBorder="0"
          onmousewheel=""
          width="100%"
          height="533"
          style={{ background: 'transparent', border: '1px solid #ccc' }}
        ></iframe>
      )}
    </div>
  );
};

