import React, { useState, useEffect } from "react";
import {
  Lightbulb,
  Database,
  Filter,
  Network,
  BarChart,
  Rocket,
  Check,
  ChevronRight,
  ChevronLeft,
  Info,
  Save,
} from "lucide-react";

// Define the data for each stage
const stagesData = [
  {
    name: "Business Understanding",
    icon: Lightbulb,
    stageNumber: 1,
    description: "Define business objectives and requirements",
  },
  {
    name: "Data Understanding",
    icon: Database,
    stageNumber: 2,
    description: "Collect and analyze available data resources",
  },
  {
    name: "Data Preparation",
    icon: Filter,
    stageNumber: 3,
    description: "Clean, transform and prepare the data for modeling",
  },
  {
    name: "Modeling",
    icon: Network,
    stageNumber: 4,
    description: "Select and apply appropriate modeling techniques",
  },
  {
    name: "Evaluation",
    icon: BarChart,
    stageNumber: 5,
    description: "Evaluate results against business objectives",
  },
  {
    name: "Deployment",
    icon: Rocket,
    stageNumber: 6,
    description: "Deploy model to production and monitor performance",
  },
];

// Main Stages component
function Stages({ onStageChange = () => {}, renderStageContent = () => null }) {
  // State variables
  const [selectedStage, setSelectedStage] = useState(stagesData[0].name);
  const [currentStage, setCurrentStage] = useState(1);
  const [completedStages, setCompletedStages] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showStageInfo, setShowStageInfo] = useState(false);

  // Notify parent component when stage changes
  useEffect(() => {
    onStageChange(currentStage);
  }, [currentStage, onStageChange]);

  // Add animation when changing stages
  function animateTransition() {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  }

  // Go to the next stage without marking it complete
  function handleNextStage() {
    // Don't proceed if at the last stage
    if (currentStage >= stagesData.length) return;

    animateTransition();

    // Move to next stage
    const nextStageNumber = currentStage + 1;
    setCurrentStage(nextStageNumber);
    setSelectedStage(stagesData[nextStageNumber - 1].name);
  }

  // Save current stage as completed and move to next
  function handleSaveAndNext() {
    // Don't proceed if at the last stage
    if (currentStage >= stagesData.length) return;

    animateTransition();

    // Mark current stage as completed
    if (!completedStages.includes(currentStage)) {
      setCompletedStages([...completedStages, currentStage]);
    }

    // Move to next stage
    const nextStageNumber = currentStage + 1;
    setCurrentStage(nextStageNumber);
    setSelectedStage(stagesData[nextStageNumber - 1].name);
  }

  // Go to previous stage
  function handlePreviousStage() {
    if (currentStage <= 1) return;

    animateTransition();

    const prevStageNumber = currentStage - 1;
    setCurrentStage(prevStageNumber);
    setSelectedStage(stagesData[prevStageNumber - 1].name);
  }

  // Handle clicking on a stage
  function handleStageClick(stage) {
    animateTransition();

    // Toggle selection if clicking on the same stage
    if (selectedStage === stage.name) {
      setSelectedStage(null);
      return;
    }

    setSelectedStage(stage.name);
    setCurrentStage(stage.stageNumber);
  }

  // Get current stage information
  const currentStageData = stagesData.find(
    (stage) => stage.stageNumber === currentStage
  );

  return (
    <div className="">
      {/* Header */}

      {/* Stage Icons */}
      <div
        className={`transition-all duration-500 border border-gray-200 bg-gradient-to-br from-white to-gray-50  rounded-md ${
          isAnimating ? "opacity-70 scale-98" : "opacity-100 scale-100"
        }`}
      >
        <div className="flex items-center justify-between max-w-4xl mx-auto px-2 py-2 overflow-x-auto hide-scrollbar">
          {stagesData.map((stage, index) => {
            // Determine state of this stage
            const isSelected = selectedStage === stage.name;
            const isCurrent = currentStage === stage.stageNumber;
            const isCompleted = completedStages.includes(stage.stageNumber);

            return (
              <React.Fragment key={stage.stageNumber}>
                {/* Stage Icon */}
                <div
                  className={`
                    flex flex-col items-center cursor-pointer group 
                    transition-all duration-300 ease-in-out min-w-max
                    ${isSelected ? "scale-105" : "hover:scale-105"}
                  `}
                  onClick={() => handleStageClick(stage)}
                  role="button"
                  tabIndex={0}
                >
                  {/* Icon Container */}
                  <div className="relative">
                    <div
                      className={`
                        rounded-md m-2 p-4 shadow-sm transition-all duration-300
                        ${
                          isCompleted
                            ? "bg-gradient-to-br from-green-50 to-green-100 ring-2 ring-green-200"
                            : isSelected
                            ? "bg-gradient-to-br from-blue-50 to-blue-100 ring-2 ring-blue-200"
                            : isCurrent
                            ? "bg-gradient-to-br from-blue-100 to-blue-200"
                            : "bg-white hover:bg-gray-100"
                        }
                      `}
                    >
                      {/* Display checkmark for completed stages, otherwise show the stage icon */}
                      {isCompleted ? (
                        <Check size={22} className="text-green-600" />
                      ) : (
                        <stage.icon
                          size={26}
                          className={`
                            ${
                              isSelected
                                ? "text-blue-600"
                                : isCurrent
                                ? "text-blue-700"
                                : "text-gray-600 group-hover:text-gray-800"
                            }
                          `}
                        />
                      )}
                    </div>
                  </div>

                  {/* Stage Name */}
                  <span
                    className={`
                      text-xs font-medium text-center tracking-tight max-w-24 truncate
                      ${
                        isCompleted
                          ? "text-green-700"
                          : isSelected
                          ? "text-blue-700"
                          : isCurrent
                          ? "text-blue-600"
                          : "text-gray-700 group-hover:text-gray-900"
                      }
                    `}
                    title={stage.name}
                  >
                    {stage.name}
                  </span>
                </div>

                {/* Connector line between stages */}
                {index < stagesData.length - 1 && (
                  <div
                    className={`h-0.5 w-16 mx-2 ${
                      completedStages.includes(stage.stageNumber)
                        ? "bg-gradient-to-r from-green-400 to-green-300"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      {/* <div className="flex flex-wrap justify-end items-center mt-6 mx-2"> */}
      {/* <div className="flex space-x-3"> */}
      {/* Previous Button */}
      {/* <button
            onClick={handlePreviousStage}
            disabled={currentStage <= 1}
            className={`
              flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium
              ${
                currentStage > 1
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm"
                  : "bg-gray-50 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button> */}

      {/* Next Button */}
      {/* <button
            onClick={handleNextStage}
            disabled={currentStage >= stagesData.length}
            className={`
              flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium shadow-sm
              ${
                currentStage < stagesData.length
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-300 text-white cursor-not-allowed"
              }
            `}
          >
            <span>
              {currentStage >= stagesData.length ? "Complete" : "Next"}
            </span>
            <ChevronRight size={16} />
          </button> */}

      {/* Save & Next Button */}
      {/* <button
            onClick={handleSaveAndNext}
            disabled={currentStage >= stagesData.length}
            className={`
              flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium shadow-sm
              ${
                currentStage < stagesData.length
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-green-300 text-white cursor-not-allowed"
              }
            `}
          >
            <Save size={16} className="mr-1" />
            <span>Save & Next</span>
          </button> */}
      {/* </div> */}
      {/* </div> */}

      {/* Stage Content */}
      <div className="mt-6 mb-6">{renderStageContent}</div>

      {/* Navigation Buttons */}

      {/* Custom styles for hiding scrollbar while maintaining functionality */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default Stages;
