---
title: useTouch
date: 2024-05-17
categories:
    - hooks
---

```javascript
import { useEffect } from "react";
export const useTouch = (swipeRef, callbackTouchX) => {
    let startX = 0;
    let endX = 0;
    // let moveX = 0;

    function handleTouchStart(event) {
        if (swipeRef.current) {
            startX = event.touches[0].clientX;
        }
    }

    // function handleTouchMove(event) {
    //     if (event.touches.length === 1 && swipeRef.current) {
    //         // 更新moveX以实时跟踪滑动过程，但计算滑动距离仍将在touchend时进行
    //         moveX = event.touches[0].clientX;
    //     }
    // }

    const handleTouchEnd = (event) => {
        if (event.changedTouches.length === 1 && swipeRef.current) {
            // 在touchend事件中计算并记录最终滑动距离
            endX = event.changedTouches[0].clientX;
            callbackTouchX(endX - startX);
        }
    };

    useEffect(() => {
        const element = swipeRef.current;
        if (element) {
            element.addEventListener("touchstart", handleTouchStart, { passive: false });
            // element.addEventListener("touchmove", handleTouchMove, { passive: false });
            element.addEventListener("touchend", handleTouchEnd, { passive: false });

            // 清理函数，在组件卸载时移除事件监听器
            return () => {
                element.removeEventListener("touchstart", handleTouchStart);
                // element.removeEventListener("touchmove", handleTouchMove);
                element.removeEventListener("touchend", handleTouchEnd);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [swipeRef]);
    return null;
};
```

## 使用

```javascript
const swipeRef = useRef(null);
const callbackTouchX = (x) => {
    console.log(x);
};
useTouch(swipeRef, callbackTouchX);
```
