"use client";

import { useEffect, useState } from "react";
import { 
  Panel, 
  PanelGroup, 
  PanelResizeHandle 
} from "react-resizable-panels";
import EditorPanel from "../_components/EditorPanel";
import InputPanel from "../_components/InputPanel";
import OutputPanel from "../_components/OutputPanel";
import { GripHorizontal, GripVertical } from "lucide-react";

export default function Page() {
  const [panelSizes, setPanelSizes] = useState({
    editor: 60,
    input: 50,
    output: 50,
  });

  // Save panel sizes to localStorage
  const handleResizeEnd = (id: "editor" | "input" | "output", size:number) => {
    setPanelSizes(prev => ({
      ...prev,
      [id]: size
    }));
    localStorage.setItem(`panel-size-${id}`, size.toString());
  };

  // Load saved panel sizes from localStorage
  useEffect(() => {
    const savedEditorSize = localStorage.getItem('panel-size-editor');
    const savedInputSize = localStorage.getItem('panel-size-input');
    const savedOutputSize = localStorage.getItem('panel-size-output');
    
    if (savedEditorSize || savedInputSize || savedOutputSize) {
      setPanelSizes({
        editor: savedEditorSize ? parseFloat(savedEditorSize) : 60,
        input: savedInputSize ? parseFloat(savedInputSize) : 50,
        output: savedOutputSize ? parseFloat(savedOutputSize) : 50,
      });
    }
  }, []);

  return (
    <div className="h-screen overflow-hidden p-4">
      <div className="max-w-[1800px] mx-auto p-4 h-full">
        <PanelGroup direction="horizontal" className="h-full">
          {/* Editor Panel */}
          <Panel 
            id="editor" 
            defaultSize={panelSizes.editor} 
            minSize={20}
            onResize={(size) => handleResizeEnd("editor", size)}
            className="overflow-auto"
          >
            <EditorPanel />
          </Panel>
          
          <ResizeHandle />
          
          {/* Input and Output Panels */}
          <Panel id="io-panels" minSize={20}>
            <PanelGroup direction="vertical">
              {/* Input Panel */}
              <Panel 
                id="input" 
                defaultSize={panelSizes.input} 
                minSize={15}
                onResize={(size) => handleResizeEnd("input", size)}
              >
                <InputPanel />
              </Panel>
              
              <ResizeHandle horizontal />
              
              {/* Output Panel */}
              <Panel 
                id="output" 
                defaultSize={panelSizes.output}
                minSize={15}
                onResize={(size) => handleResizeEnd("output", size)}
              >
                <OutputPanel />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

// Custom resize handle component
function ResizeHandle({ horizontal = false }) {
  return (
    <PanelResizeHandle
      className={`
        ${horizontal ? "h-1 my-0.5" : "border-[1px]"} 
        flex items-center justify-center 
        transition-all duration-200 ease-in-out
        hover:bg-zinc-800/50 active:bg-zinc-700/70
        group
      `}
    >
      <div
        className={`
        flex items-center justify-center
        ${horizontal ? "w-5 h-full" : "h-10 w-full"} 
        rounded-full
        transition-all duration-200
        group-hover:bg-zinc-800 group-active:bg-zinc-700
        
      `}
      >
        {horizontal ? (
          <GripHorizontal className="w-6 h-6 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
        ) : (
          <GripVertical className="w-6 h-6   text-zinc-500 group-hover:text-indigo-400 transition-colors" />
        )}
      </div>
    </PanelResizeHandle>
  );
}
