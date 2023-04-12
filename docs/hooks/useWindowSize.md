---
title: useWindowSize
date: 2023-03-19
categories:
 - react
tags:
 - hooks
---
```js
import { useState, useEffect } from 'react';

export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    function handleResize() {
      setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
      });
    }
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []); 

    return windowSize;
}

```