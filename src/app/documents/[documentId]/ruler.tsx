import React, { useRef, useState } from "react";

import { FaCaretDown } from "react-icons/fa";

import { MarkerProps } from "@/constants/types";
import { PAGE_WIDTH } from "@/constants/page-width";
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margins";

import { useStorage, useMutation } from "@liveblocks/react";
import { usePermissionValidate } from "@/hooks/useShareDocument";

const marker = Array.from({ length: 83 }, (_, i) => i);

export default function Ruler() {
  const { permission } = usePermissionValidate()!;

  const leftMargin =
    useStorage((root) => root.leftMargin) ?? LEFT_MARGIN_DEFAULT;
  const setLeftMargin = useMutation(({ storage }, position: number) => {
    storage.set("leftMargin", position);
  }, []);
  const rightMargin =
    useStorage((root) => root.rightMargin) ?? RIGHT_MARGIN_DEFAULT;
  const setRightMargin = useMutation(({ storage }, position: number) => {
    storage.set("rightMargin", position);
  }, []);

  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  const rulerRef = useRef<HTMLDivElement>(null);

  const handleLeftMouseDown = () => {
    setIsDraggingLeft(true);
  };
  const handleRightMouseDown = () => {
    setIsDraggingRight(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const MIN_SPACE = 100;
    if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
      const container = rulerRef.current.querySelector("#ruler-container");
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const relativeX = e.clientX - containerRect.left;
        const rawPosition = Math.max(0, Math.min(PAGE_WIDTH, relativeX));

        if (isDraggingLeft) {
          const maxLeftPosition = PAGE_WIDTH - rightMargin - MIN_SPACE;
          const newLeftPosition = Math.min(rawPosition, maxLeftPosition);
          setLeftMargin(newLeftPosition); //Make collaborative
        } else if (isDraggingRight) {
          const maxRightPosition = PAGE_WIDTH - leftMargin - MIN_SPACE;
          const newRightPosition = Math.max(0, Math.min(PAGE_WIDTH, relativeX));
          const constrainedRightPosition = Math.min(
            PAGE_WIDTH - newRightPosition,
            maxRightPosition
          );
          setRightMargin(constrainedRightPosition);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  const handleLeftDoubleClick = () => {
    setLeftMargin(LEFT_MARGIN_DEFAULT);
  };

  const handleRightDoubleClick = () => {
    setRightMargin(RIGHT_MARGIN_DEFAULT);
  };

  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={`h-6 w-[${PAGE_WIDTH}px] mx-auto border-b border-gray-300 flex items-end select-none print:hidden ${permission === "read" ? "hidden" : "block"} `}
    >
      <div id="ruler-container" className="w-full h-full relative">
        <Marker
          position={leftMargin}
          isLeft={true}
          isDragging={isDraggingLeft}
          onMouseDown={handleLeftMouseDown}
          onDoubleClick={handleLeftDoubleClick}
        />
        <Marker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={handleRightMouseDown}
          onDoubleClick={handleRightDoubleClick}
        />
        <div className="absolute inset-0 h-full bottom-0 ">
          <div className={`relative w-[${PAGE_WIDTH}px] h-full`}>
            {marker.map((marker) => {
              const position = (marker * 816) / 82;
              return (
                <div
                  key={marker}
                  className="bottom-0  absolute"
                  style={{ left: `${position}px` }}
                >
                  {marker % 10 === 0 && (
                    <>
                      <div className="w-[1px] h-2.5 bg-neutral-500 absolute bottom-0">
                        {" "}
                      </div>
                      <span className="bottom-2 text-[10px] absolute text-neutral-500 transform -translate-x-1/2 ">
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}
                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <div className="w-[1px] h-2 bg-neutral-500 absolute bottom-0"></div>
                  )}
                  {marker % 5 !== 0 && (
                    <div className="w-[1px] h-1.5 bg-neutral-500 absolute bottom-0"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const Marker = ({
  position,
  isDragging,
  isLeft,
  onDoubleClick,
  onMouseDown,
}: MarkerProps) => {
  return (
    <div
      className="absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2"
      style={{ [isLeft ? "left" : "right"]: `${position}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <FaCaretDown className=" absolute left-1/2 top-0 h-full fill-blue-500 transform -translate-x-1/2 " />
      <div
        className="absolute left-1/2 top-4 transform -translate-x-1/2"
        style={{
          height: "100vh",
          width: "1px",
          transform: "scaleX(0.5)",
          background: "#3b72f6",
          display: isDragging ? "block" : "none",
        }}
      ></div>
    </div>
  );
};
