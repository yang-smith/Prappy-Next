'use client'
import { DndProvider, DragPreviewImage } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag } from 'react-dnd';
import { useEffect, useState } from 'react';

export default function Draggable_ball({onDropAtTarget, press, visible}) {
    const [isVisible, setIsVisible] = useState(true);
    const [isPressed, setIsPressed] = useState(false);
    useEffect(() => {
        setIsVisible(visible);
      }, [visible]);
    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: 'ball',
        item: 'ball',
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            console.log(dropResult)
            if (item && dropResult) {
                setIsVisible(false);
                onDropAtTarget();
                setIsPressed(false);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));
    const onMouseDown = () => { setIsPressed(true); press();};

    const onMouseUp = () => { setIsPressed(false); };

    let imgsrc = isPressed ? '/static/img/big-ball.png' : '/static/img/small-ball.png';

    return (
        <>
        {/* <DragPreviewImage connect={preview} src={boxImage} /> */}
        <div>
            {isVisible && (
                <div ref={drag}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    style={{
                        opacity: isDragging ? 0 : 1,
                        width: '200px',
                        height: '200px',
                        // borderRadius: '50%',
                        //   backgroundColor: 'red',
                        cursor: 'grab',
                        position: 'fixed',
                        bottom: '-7%',
                        zIndex: '11',
                    }}>
                    <img src={imgsrc} style={{ width: '100%', height: '100%', zIndex: '6', cursor: 'grab' }} />
                </div>
            )}
            <TargetArea />
        </div>
        </>

    );
}



import { useDrop } from 'react-dnd';

const TargetArea = () => {
    const [, drop] = useDrop(() => ({
        accept: 'ball',
        drop: () => ({ name: 'TargetArea' }),
    }));

    return (
        <div ref={drop} style={{
            height: '20%',
            width: '10%',
            left: '45%',
            top: '45%',
            backgroundColor: 'transparent',
            // backgroundColor: 'yellow',
            position: 'fixed',
            // pointerEvents: 'none', 
            zIndex: '11',
        }}>
        </div>
    );
};



