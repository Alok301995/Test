import React, { useState, useEffect, useRef } from "react";
import { X, Plus, AlertCircle } from "lucide-react";

function AddTaskModal({ isOpen, onClose, onSubmit, stageDates, currentStage }) {
  const [taskData, setTaskData] = useState({
    description: "",
    startDate: stageDates[currentStage]?.startDate || "",
    endDate: stageDates[currentStage]?.endDate || "",
    status: "Not Started",
    priority: "Medium",
    assignedTo: "",
  });

  const [animate, setAnimate] = useState(false);
  const modalRef = useRef(null);

  // Handle modal positioning
  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Ensure the modal is in the viewport when opened
      setTimeout(() => {
        const modalElement = modalRef.current;
        const modalRect = modalElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Check if modal is not fully visible in viewport
        if (modalRect.top < 10 || modalRect.bottom > viewportHeight - 10) {
          // Position the modal in the center of the viewport with a slight offset from top
          const topOffset = Math.max(
            20,
            (viewportHeight - modalRect.height) / 2
          );
          modalElement.style.marginTop = `${topOffset}px`;
          modalElement.style.marginBottom = "20px";
          modalElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);

      setAnimate(true);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  // Reset form when opening with stage data
  useEffect(() => {
    if (isOpen) {
      setTaskData({
        description: "",
        startDate: stageDates[currentStage]?.startDate || "",
        endDate: stageDates[currentStage]?.endDate || "",
        status: "Not Started",
        priority: "Medium",
        assignedTo: "",
      });
    }
  }, [isOpen, stageDates, currentStage]);

  const priorityOptions = ["Low", "Medium", "High", "Critical"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(taskData);
    handleClose();
  };

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => onClose(), 300); // Delay closing to allow animation
  };

  // Helper function to get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Medium":
        return "bg-green-100 text-green-800 border-green-200";
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (!isOpen) return null;

  // Date validation
  const isStartDateValid = () => {
    if (!taskData.startDate) return true;

    const stageStart = stageDates[currentStage]?.startDate;
    const stageEnd = stageDates[currentStage]?.endDate;

    if (!stageStart || !stageEnd) return true;

    return (
      new Date(taskData.startDate) >= new Date(stageStart) &&
      new Date(taskData.startDate) <= new Date(stageEnd)
    );
  };

  const isEndDateValid = () => {
    if (!taskData.endDate || !taskData.startDate) return true;

    const stageEnd = stageDates[currentStage]?.endDate;

    return (
      new Date(taskData.endDate) >= new Date(taskData.startDate) &&
      (!stageEnd || new Date(taskData.endDate) <= new Date(stageEnd))
    );
  };

  const startDateError = !isStartDateValid()
    ? "Start date must be within stage timeframe"
    : "";

  const endDateError = !isEndDateValid()
    ? "End date must be after start date and within stage timeframe"
    : "";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-1  00 bg-opacity-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className={`bg-white rounded-lg shadow-xl w-full max-w-md my-8 transform transition-all duration-300 ease-in-out ${
          animate ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-blue-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Add New Task
            </h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 ease-in-out"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
          {/* <p className="text-xs text-gray-500 mt-1">
            Adding task to Stage {currentStage}
          </p> */}
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="space-y-4">
            {/* Task Description */}
            <div className="transition-all duration-300 ease-in-out">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Task Description*
              </label>
              <textarea
                name="description"
                value={taskData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow"
                rows="3"
                required
                placeholder="Describe the task..."
              ></textarea>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="transition-all duration-300 ease-in-out">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date*
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={taskData.startDate}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow ${
                    startDateError ? "border-red-300" : "border-gray-300"
                  }`}
                  required
                  min={stageDates[currentStage]?.startDate}
                  max={stageDates[currentStage]?.endDate}
                />
                {startDateError && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    {startDateError}
                  </p>
                )}
              </div>
              <div className="transition-all duration-300 ease-in-out">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date*
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={taskData.endDate}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow ${
                    endDateError ? "border-red-300" : "border-gray-300"
                  }`}
                  required
                  min={
                    taskData.startDate || stageDates[currentStage]?.startDate
                  }
                  max={stageDates[currentStage]?.endDate}
                />
                {endDateError && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    {endDateError}
                  </p>
                )}
              </div>
            </div>

            {/* Status and Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="transition-all duration-300 ease-in-out">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={taskData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="transition-all duration-300 ease-in-out">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  name="priority"
                  value={taskData.priority}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow"
                >
                  {priorityOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-gray-500 mr-2">Priority:</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(
                      taskData.priority
                    )}`}
                  >
                    {taskData.priority}
                  </span>
                </div>
              </div>
            </div>

            {/* Assigned To */}
            <div className="transition-all duration-300 ease-in-out">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assigned To
              </label>
              <input
                type="text"
                name="assignedTo"
                value={taskData.assignedTo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow"
                placeholder="Enter name or email"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-300 ease-in-out shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-md transition-all duration-300 ease-in-out shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center ${
                !isStartDateValid() || !isEndDateValid()
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"
              }`}
              disabled={!isStartDateValid() || !isEndDateValid()}
            >
              <Plus size={18} className="mr-1" />
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;
