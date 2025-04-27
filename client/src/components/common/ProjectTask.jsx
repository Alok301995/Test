import React, { useState } from "react";
import Stages from "../features/Stages";
import TaskTable from "./Table/TaskTable";
import StageDateSelector from "./ProjectDateSelector";
import ActionButtons from "./ActionButton";
import AddTaskModal from "./AddTaskModal";
import { AlertCircle } from "lucide-react";

export default function ProjectTask() {
  // Sample tasks data
  const [tasks, setTasks] = useState([
    {
      id: 1,
      description: "Design database schema",
      startDate: "2025-04-20",
      endDate: "2025-04-25",
      status: "In Progress",
      stage: 1,
      priority: "High",
      assignedTo: "John Doe",
      createdAt: "2025-04-18T14:30:00Z",
    },
    {
      id: 2,
      description: "Create API endpoints",
      startDate: "2025-04-22",
      endDate: "2025-04-28",
      status: "Not Started",
      stage: 1,
      priority: "Medium",
      assignedTo: "Jane Smith",
      createdAt: "2025-04-19T09:15:00Z",
    },
    {
      id: 3,
      description: "Implement authentication",
      startDate: "2025-04-25",
      endDate: "2025-05-02",
      status: "Not Started",
      stage: 1,
      priority: "Critical",
      assignedTo: "Mike Johnson",
      createdAt: "2025-04-20T11:45:00Z",
    },
    {
      id: 4,
      description: "Implement front-end login screen",
      startDate: "2025-04-25",
      endDate: "2025-05-02",
      status: "Not Started",
      stage: 1,
      priority: "Critical",
      assignedTo: "Mike Johnson",
      createdAt: "2025-04-20T11:45:00Z",
    },
    {
      id: 5,
      description: "Setup CI/CD pipeline",
      startDate: "2025-04-25",
      endDate: "2025-05-02",
      status: "Not Started",
      stage: 1,
      priority: "Critical",
      assignedTo: "Mike Johnson",
      createdAt: "2025-04-20T11:45:00Z",
    },
    {
      id: 6,
      description: "Implement user profile page",
      startDate: "2025-04-25",
      endDate: "2025-05-02",
      status: "Not Started",
      stage: 1,
      priority: "Critical",
      assignedTo: "Mike Johnson",
      createdAt: "2025-04-20T11:45:00Z",
    },
    {
      id: 7,
      description: "Write unit tests for auth module",
      startDate: "2025-04-25",
      endDate: "2025-05-02",
      status: "Not Started",
      stage: 1,
      priority: "Critical",
      assignedTo: "Mike Johnson",
      createdAt: "2025-04-20T11:45:00Z",
    },
  ]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Stage dates - for each stage we'll have a start and end date
  const [stageDates, setStageDates] = useState({
    1: { startDate: "2025-04-18", endDate: "2025-04-30", submitted: true },
    2: { startDate: "2025-05-01", endDate: "2025-05-10", submitted: false },
    3: { startDate: "", endDate: "", submitted: false },
    4: { startDate: "", endDate: "", submitted: false },
    5: { startDate: "", endDate: "", submitted: false },
    6: { startDate: "", endDate: "", submitted: false },
  });

  // Overall project dates
  const [projectDates, setProjectDates] = useState({
    startDate: "2025-04-18",
    endDate: "2025-05-15",
  });

  // Current stage
  const [currentStage, setCurrentStage] = useState(1);

  // Show date selection panel
  const [showDateSelection, setShowDateSelection] = useState(false);

  // Status options
  const statusOptions = [
    "Not Started",
    "In Progress",
    "Under Review",
    "Completed",
  ];

  // Handle task status change
  const handleStatusChange = (taskId, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  // Handle project date change
  const handleProjectDateChange = (type, date) => {
    setProjectDates({
      ...projectDates,
      [type]: date,
    });
  };

  // Handle add new task
  const handleAddTask = () => {
    setIsModalOpen(true);
  };

  // Handle task form submission
  const handleTaskSubmit = (taskData) => {
    const newId =
      tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;

    // Add the new task with current timestamp and stage
    const newTask = {
      id: newId,
      ...taskData,
      stage: currentStage,
      createdAt: new Date().toISOString(),
    };

    setTasks([newTask, ...tasks]); // Add to beginning of array for recency sorting
  };

  // Handle task description change
  const handleDescriptionChange = (taskId, newDescription) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, description: newDescription } : task
      )
    );
  };

  // Handle task date change
  const handleTaskDateChange = (taskId, field, value) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, [field]: value } : task
      )
    );
  };

  // Handle finish stage
  const handleFinishStage = () => {
    // Check if all tasks for this stage are completed
    const allTasksCompleted = currentStageTasks.every(
      (task) => task.status === "Completed"
    );

    if (!allTasksCompleted) {
      // You could show a warning or confirmation dialog here
      alert(
        "Not all tasks are completed. Are you sure you want to finish this stage?"
      );
    }

    // Logic to finish current stage and move to the next
    const nextStage = currentStage + 1;

    // Only proceed if next stage is valid
    if (nextStage <= 6) {
      setCurrentStage(nextStage);

      // Show date picker for next stage if dates haven't been set
      if (!stageDates[nextStage]?.submitted) {
        setShowDateSelection(true);
      } else {
        setShowDateSelection(false);
      }
    }
  };

  // Handle stage change
  const handleStageChange = (stageNumber) => {
    setCurrentStage(stageNumber);

    // Show date selection if dates haven't been submitted for this stage
    if (!stageDates[stageNumber]?.submitted) {
      setShowDateSelection(true);
    } else {
      setShowDateSelection(false);
    }
  };

  // Handle stage date submission
  const handleStageDateSubmit = () => {
    // Mark the current stage dates as submitted
    setStageDates((prev) => ({
      ...prev,
      [currentStage]: {
        ...prev[currentStage],
        submitted: true,
      },
    }));

    // Hide the date selection panel
    setShowDateSelection(false);
  };

  // Handle stage date change
  const handleStageDateChange = (field, value) => {
    setStageDates((prev) => ({
      ...prev,
      [currentStage]: {
        ...prev[currentStage],
        [field]: value,
      },
    }));
  };

  // Format date to display in a more readable format
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Filter tasks to only show tasks for the current stage
  // Sort by most recently created first
  const currentStageTasks = tasks
    .filter((task) => task.stage === currentStage)
    .sort((a, b) => {
      // Sort by creation date (most recent first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  // Get task statistics
  const taskStats = {
    total: currentStageTasks.length,
    completed: currentStageTasks.filter((task) => task.status === "Completed")
      .length,
    inProgress: currentStageTasks.filter(
      (task) => task.status === "In Progress"
    ).length,
    notStarted: currentStageTasks.filter(
      (task) => task.status === "Not Started"
    ).length,
    underReview: currentStageTasks.filter(
      (task) => task.status === "Under Review"
    ).length,
  };

  // Calculate completion percentage
  const completionPercentage =
    taskStats.total > 0
      ? Math.round((taskStats.completed / taskStats.total) * 100)
      : 0;

  // Check if dates for current stage have been submitted
  const stageHasDates = stageDates[currentStage]?.submitted || false;

  // Get stage name based on stage number
  const getStageName = (stageNumber) => {
    switch (stageNumber) {
      case 1:
        return "Planning";
      case 2:
        return "Design";
      case 3:
        return "Development";
      case 4:
        return "Testing";
      case 5:
        return "Deployment";
      case 6:
        return "Maintenance";
      default:
        return `Stage ${stageNumber}`;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      {/* Stages component */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-800">Stages</h1>
        <Stages
          onStageChange={handleStageChange}
          renderStageContent={renderStageContent}
          currentStage={currentStage}
        />
      </div>

      {/* Show stage content (date picker if needed) */}
      {!stageHasDates && (
        <div className="mb-6 bg-amber-50 p-4 rounded-lg border border-amber-200 flex items-start">
          <AlertCircle
            size={20}
            className="mr-3 stroke-amber-500 flex-shrink-0 mt-0.5"
          />
          <div>
            <h3 className="text-sm font-medium text-amber-800 mb-1">
              Timeline Required
            </h3>
            <p className="text-sm text-amber-700">
              Please set the start and end dates for this stage to enable task
              creation. This helps in tracking progress and ensuring deadlines
              are met.
            </p>
          </div>
        </div>
      )}
      {showDateSelection && (
        <div className="mb-6 bg-white rounded-lg border border-blue-200 shadow-sm p-5">
          <StageDateSelector
            stageNumber={currentStage}
            stageDates={stageDates}
            onDateChange={handleStageDateChange}
            onSubmit={handleStageDateSubmit}
          />
        </div>
      )}

      {/* Warning if no dates are set */}

      {/* Action buttons row */}
      <div className="mb-6 flex justify-end">
        <ActionButtons
          onAddTask={handleAddTask}
          onFinishStage={handleFinishStage}
          addTaskDisabled={!stageHasDates}
        />
      </div>

      {/* Tasks section */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Stage Tasks
        </h2>

        {/* Task table */}
        <TaskTable
          tasks={currentStageTasks}
          statusOptions={statusOptions}
          onDescriptionChange={handleDescriptionChange}
          onDateChange={handleTaskDateChange}
          onStatusChange={handleStatusChange}
        />
      </div>

      {/* Task Creation Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleTaskSubmit}
        stageDates={stageDates}
        currentStage={currentStage}
      />
    </div>
  );
}

// Helper function to render stage content
function renderStageContent(stageNumber) {
  // This function was used in the original code but appears to be incomplete
  // It's kept here for compatibility, but the rendering is now handled in the main component
  return null;
}
