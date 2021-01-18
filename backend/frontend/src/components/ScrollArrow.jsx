import React, {useState} from 'react';
import {FaArrowCircleUp} from 'react-icons/fa';

function ScrollArrow(){
  const [showScroll, setShowScroll] = useState(false);

  function checkScrollLevel(){
    if (!showScroll && window.pageYOffset > 1){
      setShowScroll(true)
    }else if (showScroll && window.pageYOffset <= 1){
      setShowScroll(false)
    }
  };

  window.addEventListener('scroll',checkScrollLevel);

  return <FaArrowCircleUp className="scrollTop" style={{height:40,display: showScroll? 'inline' : 'none'}}/>
}

export default ScrollArrow;
