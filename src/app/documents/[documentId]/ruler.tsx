import React from "react";

const marker = Array.from({ length: 83 }, (_, i) => i);

export default function Ruler() {
  return (
    <div className="h-6 border-b border-gray-300 flex items-end select-none print:hidden">
      <div
        id="ruler-container"
        className="max-w-[816px] mx-auto w-full h-full relative"
      >
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
                      <div className="w-[1px] h-2 bg-neutral-500 absolute bottom-0">
                        {" "}
                      </div>
                      <span className="bottom-2 text-[10px] absolute text-neutral-500 transform -translate-x-1/2 ">
                        {marker / 10 + 1}
                      </span>
                    </>
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
