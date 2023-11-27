import { useEffect } from "react";


export default function VideoComponent ({ onEnd, src, zIndex, doubleclick, videoRef }) {

    const videoStyle = (z:number) => ({
      padding: '0px',
      cursor: 'grab',
      width: '100%',
      height: '100%',
      position: 'fixed' as 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: z,
    });
  
    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.load();
      }
    }, [src]);
    return (
      <video ref={videoRef} style={videoStyle(zIndex)} src={src} onDoubleClick={doubleclick}
        controls={false} onEnded={onEnd}
      />
    );
  };
  