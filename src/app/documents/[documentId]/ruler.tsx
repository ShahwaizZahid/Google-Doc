import React from "react";
import { FaCaretDown } from "react-icons/fa";
const marker = Array.from({ length: 83 }, (_, i) => i);

export default function Ruler() {
  return (
    <div className="h-6 border-b border-gray-300 flex items-end select-none print:hidden">
      <div
        id="ruler-container"
        className="max-w-[816px] mx-auto w-full h-full relative"
      >
        <Marker
          position={56}
          isLeft={true}
          isDragging={false}
          onDoubleClick={() => {}}
          onMouseDown={() => {}}
        />
        <div className="absolute inset-0 h-full bottom-0 ">
          <div className=" relative w-[816px] h-full">
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

type MarkerProps = {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
};

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
      <FaCaretDown className=" absolute left1/2 top-0 h-full fill-blue-500 transform -translate-x-1/2 " />
    </div>
  );
};
