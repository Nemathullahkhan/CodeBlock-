"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Play, Loader2 } from "lucide-react";
import { useState } from "react";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";

type TestCase = {
  input: string;
  output: string;
};

type QuestionRunButtonProps = {
  id: string;
  programName: string | null;
};

export default function QuestionRunButton({ id, programName }: QuestionRunButtonProps) {
  const { runAndVerifyCode, isRunning, runfloydAndVerifyCode, runWarshallAndVerifyCode, runTopologicalSortAndVerifyCode, setTestCases } = useCodeEditorStore();
  const [open, setOpen] = useState(false);
  const [isLoadingTestCases, setIsLoadingTestCases] = useState(false);
  const [testCaseError, setTestCaseError] = useState<string | null>(null);

  // Fetch test cases from the API
  const fetchTestCases = async (): Promise<TestCase[]> => {
    try {
      const response = await fetch(`/api/testcases/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch test cases");
      }
      const data = await response.json();
      return data.testcases;
    } catch (error) {
      console.error("Error fetching test cases:", error);
      setTestCaseError("Failed to load test cases. Please try again.");
      return [];
    }
  };

  // Transform test cases into the required format
  const transformTestCases = (testCases: TestCase[]) => {
    return testCases.map((testCase) => ({
      input: testCase.input,
      expectedOutput: testCase.output,
    }));
  };

  // Load test cases and set them in the store
  const loadTestCases = async () => {
    setIsLoadingTestCases(true);
    setTestCaseError(null);
    try {
      const testCasesFromDB = await fetchTestCases();
      const transformedTestCases = transformTestCases(testCasesFromDB);
      setTestCases(transformedTestCases);
    } catch (error) {
      console.error("Error loading test cases:", error);
    } finally {
      setIsLoadingTestCases(false);
    }
  };

  // Handle running and verifying the code
  const handleRun = async () => {
    if (!programName) {
      console.error("Program name is required");
      return;
    }

    setOpen(true); // Open dialog when execution starts
    try {
      await loadTestCases(); // Load test cases before running
      if (["0/1 Knapsack Problem", "Merge Sort", "Quick Sort", "Depth-First Search (DFS)", "Kruskal Algorithm (Minimum Spanning Tree)", "Prim Algorithm (Minimum Spanning Tree)","N-Queens Problem"].includes(programName)) {
        await runAndVerifyCode(); // Run and verify the code
      } else if (["Warshall Algorithm (Transitive Closure)", "Dijkstra Algorithm (Single-Source Shortest Path)", "Breadth-First Search (BFS)"].includes(programName)) {
        await runWarshallAndVerifyCode();
      } else if (["Topological Sorting"].includes(programName)) {
        await runTopologicalSortAndVerifyCode();
      } else {
        await runfloydAndVerifyCode();
      }
    } catch (error) {
      console.error("Error running code:", error);
      console.error("Testcases",testCaseError);
    } finally {
      setOpen(false); // Close dialog when execution finishes
    }
  };

  return (
    <>
      <Button
        onClick={handleRun}
        disabled={isRunning || isLoadingTestCases}
        variant={"outline"}
        className="text-zinc-300 hover:bg-zinc-900 border-y-0 border-x-4  border-zinc-500 h-8 hover:text-white hover:scale-105 transition-all w-32 transition-colors "
      >
        {isRunning || isLoadingTestCases ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <Play className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Run Code</span>
          </>
        )}
      </Button>

      {/* Dialog for Execution Animation */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-black text-white border-none shadow-xl">
          <div className="flex flex-col items-center justify-center gap-4">
            <span className="text-lg font-medium text-gray-300">Executing...</span>
            <div className="flex gap-2">
              <motion.div
                className="w-2.5 h-2.5 bg-white rounded-full"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="w-2.5 h-2.5 bg-white rounded-full"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2, ease: "easeInOut" }}
              />
              <motion.div
                className="w-2.5 h-2.5 bg-white rounded-full"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4, ease: "easeInOut" }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}