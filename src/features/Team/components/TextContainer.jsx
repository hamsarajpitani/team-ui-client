import React from "react";
import { tw } from "utils/helpers/tw";

const TextContainer = ({ title, highlightText, desc, className }) => {
  return (
    <div className={tw("flex w-fit flex-col  leading-tight", className)}>
      <p className="flex gap-1  text-primary/60">
        {title}
        {highlightText && (
          <>
            &nbsp;(
            <span className="inline-flex h-fit text-ternary">
              {highlightText}
            </span>
            )
          </>
        )}
      </p>
      {desc && <span className="text-gray">{desc}</span>}
    </div>
  );
};

export default TextContainer;
