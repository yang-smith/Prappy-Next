'use client'
import { useEffect, useRef, useState } from "react";
import "./app.css"
import "./globals.css"
import Draggable_ball from "./components/draggable";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import chat from './openai'
import { PromptKuakua, PromptRainbow } from "./prompt";

const VideoComponent = ({ onEnd, src, zIndex, doubleclick, videoRef }) => {

  const videoStyle = (z) => ({
    padding: '0px',
    cursor: 'grab',
    width: '100%',
    height: '100%',
    position: 'fixed',
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



const Inputbox = ({ handleInput, inputBoxRef }) => {
  return (
    <input id="inputbox" type="text" className="input-box" placeholder="Enter text here, then drag the red ball" ref={inputBoxRef}
      onChange={(e) => handleInput(e.target.value)} />
  );
};

export default function Home() {
  const [VideoSrc1, setVideoSrc1] = useState('static/videos/blink.mp4');
  const [VideoSrc2, setVideoSrc2] = useState('static/videos/open-mouse.mp4');
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const inputBoxRef = useRef<HTMLInputElement>(null);
  const [Zindex1, setZindex1] = useState('10');
  const [Zindex2, setZindex2] = useState('9');
  const [ballVisible, setBallVisible] = useState(true);
  const [topImgVisible, setTopImgVisible] = useState(true);
  const [inputBoxVisible, setInputBoxVisible] = useState(true);
  const [scrollVisible, setScrollVisible] = useState(false);
  const [question, setQuestion] = useState('');
  const [questionList, setQuestionList] = useState<string[]>([]);
  const [answer, setAnswer] = useState('');
  const [longAnswer, setLongAnswer] = useState('');
  const questionRef = useRef(question);
  const questionListRef = useRef(questionList);
  const scrollContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    questionRef.current = question;
  }, [question]);
  useEffect(() => {
    questionListRef.current = questionList;
  }, [questionList]);
  useEffect(() => {
    if(scrollVisible==true) {
      if(scrollContent.current){
        scrollContent.current.style.animationPlayState = 'running';
        console.log("useeffect scroll");
      }
    }
  }, [scrollVisible]);

  const press_ball = () => {
    setAnswer('');
    setZindex1('8');
    video2Ref.current?.play();
    setVideoSrc1('static/videos/close-mouse.mp4')
  };
  const handleDrop = async () => {
    setZindex2('7')
    video1Ref.current?.play();
    setVideoSrc2('static/videos/loading-display.mp4')
    setBallVisible(false);

    try {
      console.log(questionRef.current)
      if (questionRef.current == '') {
        setAnswer('tell me something!');
        return;
      }

      const model = 'gpt-3.5-turbo';
      const content = PromptKuakua(questionRef.current);
      setQuestionList([...questionListRef.current, questionRef.current]);
      const messages = [{ role: 'user', content: content }];
      const temperature = 0.5;

      const res = await chat(model, messages, temperature);
      if (res.ok) {
        const data = await res.json();
        setAnswer(data.choices[0].message.content);
      } else {
        console.log(res.status);
        setAnswer('something error');
        throw new Error(`Error: ${res.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleEnd1 = () => {
    if (VideoSrc2 == 'static/videos/loading-display.mp4') {
      setZindex1('6')
      setVideoSrc1('static/videos/eyesback.mp4')
      video2Ref.current?.play();
    }
    else if (VideoSrc1 == 'static/videos/eyesback.mp4' && VideoSrc2 == 'static/videos/blink.mp4') {
      initState()
    }
  };
  const handleEnd2 = () => {
    if (VideoSrc1 == 'static/videos/eyesback.mp4' && VideoSrc2 == 'static/videos/loading-display.mp4') {
      setZindex2('5');
      setVideoSrc2('static/videos/blink.mp4')
      video1Ref.current?.play();
    }
    if (VideoSrc2 == 'static/videos/rainbow.mp4') {
      initState();
    }
  };
  const handleInput = (value) => {
    setQuestion(value);
    if (VideoSrc1 == 'static/videos/blink.mp4') {
      video1Ref.current?.play();
    }
  };
  const handleDoubleClick = async () => {
    if (VideoSrc1 == 'static/videos/blink.mp4' && VideoSrc2 == 'static/videos/open-mouse.mp4') {
      console.log(questionListRef.current);
      setVideoSrc2('static/videos/rainbow.mp4');
      setZindex2('20');
      setBallVisible(false); 
      setInputBoxVisible(false);
      setTopImgVisible(false);
      setAnswer('');
      setTimeout(() => {
        video2Ref.current?.play();
        console.log('play')
      }, 500);
      
      try {
        const model = 'gpt-3.5-turbo'; 
        const content = PromptRainbow(questionListRef.current);
        const messages = [{ role: 'user', content: content }];
        const temperature = 0.5; 

        const res = await chat(model, messages, temperature);
        if (res.ok) {
          const data = await res.json();
          setLongAnswer(data.choices[0].message.content);
          setScrollVisible(true);
        } else {
          console.log(res.status);
          setAnswer('something error');
          throw new Error(`Error: ${res.status}`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
  const initState = () => {
    setBallVisible(true); setQuestion(''); setLongAnswer('');
    setInputBoxVisible(true); setTopImgVisible(true); setScrollVisible(false);
    if (inputBoxRef.current) {
      inputBoxRef.current.value = '';
    }
    setZindex1('4');
    setVideoSrc2('static/videos/open-mouse.mp4');
    setVideoSrc1('static/videos/blink.mp4');
    setTimeout(() => {
      setZindex1('10');
      setZindex2('9');
    }, 2000);
    
  }
  return (

    <div className="home">
      {topImgVisible && (<img className="show-png" src="/static/img/show-png.png" />)}
      
      <VideoComponent onEnd={handleEnd1} src={VideoSrc1} zIndex={Zindex1} videoRef={video1Ref} doubleclick={handleDoubleClick} />
      <VideoComponent onEnd={handleEnd2} src={VideoSrc2} zIndex={Zindex2} videoRef={video2Ref} doubleclick={handleDoubleClick} />

      <DndProvider backend={HTML5Backend}>
        <Draggable_ball onDropAtTarget={handleDrop} press={press_ball} visible={ballVisible} />
      </DndProvider>

      { inputBoxVisible && (<Inputbox handleInput={handleInput} inputBoxRef={inputBoxRef} />) }

      <div id="text-output" className="cute-text-output">{answer}</div> 
      { scrollVisible && (<div ref={scrollContent} id="long-output" className="scroll-content">{longAnswer}</div> ) }
    </div>
  )
}