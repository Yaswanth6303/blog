"use client";

import { useState, useRef } from "react";
import { Icon } from "@/components/ui/icon";

export function CodeBlock({ children, ...props }: any) {
  // rehype-pretty-code adds data-language to the pre tag
  const language = props["data-language"] || "text";
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const copy = async () => {
    if (preRef.current) {
      // Get the raw text from the code block
      const text = preRef.current.innerText;
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  return (
    <div className="group relative my-8 overflow-hidden rounded-xl bg-[#1e1e2e] text-sm leading-relaxed border border-border/20 shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 bg-[#181825] px-4 py-2.5">
        <div className="flex items-center gap-2">
          {/* Mac window controls */}
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="ml-3 font-mono text-xs font-semibold text-white/70 uppercase tracking-wider">
            {language}
          </span>
        </div>
        <button
          onClick={copy}
          disabled={isCopied}
          className="flex h-8 w-8 items-center justify-center rounded-md bg-white/5 text-white/70 transition-all hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20"
          aria-label="Copy code"
        >
          {isCopied ? (
            <Icon icon="lucide:check" className="h-4 w-4 text-green-400" />
          ) : (
            <Icon icon="lucide:copy" className="h-4 w-4" />
          )}
        </button>
      </div>
      <div className="overflow-x-auto p-5">
        {/* We pass all props to the pre tag so it retains rehype-pretty-code styles if any */}
        <pre ref={preRef} {...props} className="bg-transparent! p-0! m-0!">
          {children}
        </pre>
      </div>
    </div>
  );
}
