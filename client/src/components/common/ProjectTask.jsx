import React, { useState } from "react";
import Stages from "../features/Stages";
import TaskTable from "./Table/TaskTable";
import StageDateSelector from "./ProjectDateSelector";
import ActionButtons from "./ActionButton";
import AddTaskModal from "./AddTaskModal";
import {
  Calendar,
  AlertCircle,
  PieChart,
  User,
  BarChart4,
  ChevronRight,
  CheckCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
} from "lucide-react";

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
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
      {/* Project header with breadcrumb */}
      <div className="mb-6 border-b border-gray-200 pb-4">
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <span>Projects</span>
          <ChevronRight size={14} className="mx-1" />
          <span>Development</span>
          <ChevronRight size={14} className="mx-1" />
          <span className="font-medium text-gray-700">Task Management</span>
        </div>
        <h1 className="text-xl font-bold text-gray-800">
          Project Task Management
        </h1>
      </div>

      {/* Stages component */}
      <div className="mb-8">
        <Stages
          onStageChange={handleStageChange}
          renderStageContent={renderStageContent}
          currentStage={currentStage}
        />
      </div>

      {/* Stage info summary */}
      <div className="mb-6 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-gray-800 flex items-center">
            <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2 text-blue-600">
              {currentStage}
            </span>
            {getStageName(currentStage)} Stage
          </h2>
        </div>

        {/* Stage statistics */}
        <div className="p-4 flex justify-center">
          <div className="flex gap-4">
            {/* Task count */}
            <div className="bg-slate-50 rounded-lg p-4 flex items-center">
              <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center mr-3">
                <BarChart4 size={20} className="text-slate-700" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Total Tasks
                </p>
                <p className="text-xl font-bold text-slate-800">
                  {taskStats.total}
                </p>
              </div>
            </div>

            {/* Completion rate */}
            {/* <div className="bg-emerald-50 rounded-lg p-4 flex items-center">
              <div className="w-10 h-10 rounded-lg bg-emerald-200 flex items-center justify-center mr-3">
                <PieChart size={20} className="text-emerald-700" />
              </div>
              <div>
                <p className="text-xs font-medium text-emerald-600">
                  Completion Rate
                </p>
                <p className="text-xl font-bold text-emerald-700">
                  {completionPercentage}%
                </p>
              </div>
            </div> */}

            {/* Timeline */}
            <div className="bg-blue-50 rounded-lg p-4 flex flex-col">
              <div className="flex items-center mb-2">
                <Calendar size={16} className="text-blue-600 mr-2" />
                <p className="text-xs font-medium text-blue-700">Timeline</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-gray-500">Start</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {formatDate(stageDates[currentStage]?.startDate)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">End</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {formatDate(stageDates[currentStage]?.endDate)}
                  </p>
                </div>
              </div>
            </div>
            {/* Pending State */}
            <div className="bg-amber-50 rounded-lg p-4 flex items-center">
              <div className="w-10 h-10 rounded-lg bg-amber-200 flex items-center justify-center mr-3">
                <Clock size={20} className="text-amber-700" />
              </div>
              <div>
                <p className="text-xs font-medium text-amber-500">
                  Pending Tasks
                </p>
                <p className="text-xl font-bold text-amber-800">
                  {taskStats.pending}
                </p>
              </div>
            </div>

            {/* Critical State */}
            <div className="bg-red-50 rounded-lg p-4 flex items-center">
              <div className="w-10 h-10 rounded-lg bg-red-200 flex items-center justify-center mr-3">
                <AlertTriangle size={20} className="text-red-700" />
              </div>
              <div>
                <p className="text-xs font-medium text-red-500">
                  Critical Tasks
                </p>
                <p className="text-xl font-bold text-red-800">
                  {taskStats.critical}
                </p>
              </div>
            </div>
            {/*  */}

            {/* Completion State */}
            <div className="bg-emerald-50 rounded-lg p-4 flex items-center">
              <div className="w-10 h-10 rounded-lg bg-emerald-200 flex items-center justify-center mr-3">
                <CheckCircle2 size={20} className="text-emerald-700" />
              </div>
              <div>
                <p className="text-xs font-medium text-emerald-500">
                  Completed Tasks
                </p>
                <p className="text-xl font-bold text-emerald-800">
                  {taskStats.completed}
                </p>
              </div>
            </div>

            {/* Assigned team members */}
            {/* <div className="bg-indigo-50 rounded-lg p-4 flex items-center">
              <div className="w-10 h-10 rounded-lg bg-indigo-200 flex items-center justify-center mr-3">
                <User size={20} className="text-indigo-700" />
              </div>
              <div>
                <p className="text-xs font-medium text-indigo-600">
                  Team Members
                </p>
                <div className="flex -space-x-2 mt-1">
                  <div className="w-7 h-7 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-medium text-xs ring-2 ring-white">
                    JD
                  </div>
                  <div className="w-7 h-7 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-medium text-xs ring-2 ring-white">
                    JS
                  </div>
                  <div className="w-7 h-7 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-medium text-xs ring-2 ring-white">
                    MJ
                  </div>
                  <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium text-xs ring-2 ring-white">
                    +2
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Show stage content (date picker if needed) */}
      {showDateSelection && (
        <div className="mb-6 bg-white rounded-lg border border-blue-200 shadow-sm p-5">
          <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
            <Calendar size={16} className="text-blue-600 mr-2" />
            Set Stage Timeline
          </h3>
          <StageDateSelector
            stageNumber={currentStage}
            stageDates={stageDates}
            onDateChange={handleStageDateChange}
            onSubmit={handleStageDateSubmit}
          />
        </div>
      )}

      {/* Warning if no dates are set */}
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

        {/* Task status summary */}
        {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-3 flex justify-between items-center">
            <span className="text-sm text-gray-600">Completed</span>
            <span className="bg-green-100 text-green-800 font-medium px-2.5 py-0.5 rounded-full text-xs">
              {taskStats.completed}
            </span>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-3 flex justify-between items-center">
            <span className="text-sm text-gray-600">In Progress</span>
            <span className="bg-blue-100 text-blue-800 font-medium px-2.5 py-0.5 rounded-full text-xs">
              {taskStats.inProgress}
            </span>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-3 flex justify-between items-center">
            <span className="text-sm text-gray-600">Not Started</span>
            <span className="bg-gray-100 text-gray-800 font-medium px-2.5 py-0.5 rounded-full text-xs">
              {taskStats.notStarted}
            </span>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-3 flex justify-between items-center">
            <span className="text-sm text-gray-600">Under Review</span>
            <span className="bg-yellow-100 text-yellow-800 font-medium px-2.5 py-0.5 rounded-full text-xs">
              {taskStats.underReview}
            </span>
          </div>
        </div> */}

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
