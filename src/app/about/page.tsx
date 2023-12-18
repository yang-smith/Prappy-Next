import React from "react";
import "./about.css";

const AboutPage = () => {
  return (    
  <div className="index">
    <img className="img" src="/static/img/about.png"></img>
    <p className="yuqianli-adria-gmail">
          <span className="text-wrapper">
            邮箱：yuqianli.adria@gmail.com
            <br />
            tweet：
          </span>
          <a href="https://twitter.com/LuckyAdria" rel="noopener noreferrer" target="_blank">
            <span className="span">LuckyAdria</span>
          </a>
    </p>
    <p className="wrq">
          <span className="text-wrapper">
            邮箱：1841883973@qq.com
            <br />
            个人网站：
          </span>
          <a href="https://www.manamana.net/peopleCenter/4829853/home" rel="noopener noreferrer" target="_blank">
            <span className="span">RachelW</span>
          </a>
        </p>
        <p className="jqs">
          <span className="text-wrapper">
            邮箱：zy892065502@gmail.com
            <br />
            个人网站：{" "}
          </span>
          <a href="https://autumnriver.blue" rel="noopener noreferrer" target="_blank">
            <span className="span">
              秋水
              <br />
            </span>
          </a>
          <span className="text-wrapper">tweet:&nbsp;&nbsp;</span>
          <a href="https://twitter.com/jordenAAA" rel="noopener noreferrer" target="_blank">
            <span className="span">autumnriver</span>
          </a>
        </p>
        <p className="jomosis-gmail">
          <span className="text-wrapper">
            邮箱：jomosis1997@gmail.com
            <br />
            tweet：
          </span>
          <a href="https://x.com/jomosis1997" rel="noopener noreferrer" target="_blank">
            <span className="span">jomosis1997</span>
          </a>
        </p>
        <div className="hdl">邮箱：468964824@qq.com</div>
        <div className="mly">邮箱：aieryiqi0318@gmail.com</div>
  </div>
  )
}
export default AboutPage;