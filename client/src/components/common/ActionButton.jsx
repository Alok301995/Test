import React from "react";
import { PlusCircle, ArrowRight } from "lucide-react";

export default function ActionButtons({
  onAddTask,
  onFinishStage,
  addTaskDisabled = false,
}) {
  return (
    <div className="flex space-x-4">
      <button
        onClick={onAddTask}
        disabled={addTaskDisabled}
        className={`
          px-4 py-2 rounded-md text-white font-medium
          flex items-center transition-all duration-300 ease-in-out
          ${
            addTaskDisabled
              ? "bg-gray-300 cursor-not-allowed opacity-70"
              : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-md"
          }
        `}
        title={
          addTaskDisabled
            ? "Set stage dates to enable task creation"
            : "Add new task"
        }
      >
        <PlusCircle className="h-5 w-5 mr-2" />
        Add Task
      </button>

      <button
        onClick={onFinishStage}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium 
                  flex items-center transition-all duration-300 ease-in-out hover:shadow-md"
      >
        Complete Stage
        <ArrowRight className="h-5 w-5 ml-1" />
      </button>
    </div>
  );
}
