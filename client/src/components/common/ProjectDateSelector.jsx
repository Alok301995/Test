import React, { useState } from "react";
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

function StageDateSelector({
  stageNumber,
  stageDates,
  onDateChange,
  onSubmit,
}) {
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);

  const currentStageDates = stageDates[stageNumber] || {
    startDate: "",
    endDate: "",
  };

  const datesSelected =
    currentStageDates.startDate && currentStageDates.endDate;

  // Format date for display
  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="p-8 border-0 bg-gradient-to-br from-indigo-50 via-blue-50 to-white rounded-xl shadow-lg transform transition-all duration-500 ease-in-out hover:shadow-xl">
      <h3 className="text-xl font-bold mb-6 text-indigo-800 flex items-center">
        <div className="bg-indigo-100 p-2 rounded-full mr-3">
          <Calendar className="h-5 w-5 stroke-indigo-600" />
        </div>
        Stage {stageNumber} Timeline
      </h3>

      <div className="transition-all duration-300 ease-in-out bg-white p-6 rounded-xl border border-indigo-100 mb-6 shadow-sm hover:shadow">
        <div className="flex items-start mb-5 bg-amber-50 p-3 rounded-lg border-l-4 border-amber-400">
          <AlertCircle className="h-5 w-5 mr-2 stroke-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-700">
            Please set the start and end dates for this stage before proceeding
            with task management.
          </p>
        </div>

        <div className="h-1 w-24 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full mb-6"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Start Date Picker */}
          <div className="relative transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md rounded-xl p-5 border border-gray-100">
            <label className="block text-sm font-semibold text-indigo-700 mb-3 flex items-center">
              <Clock className="h-4 w-4 mr-2 stroke-green-600" />
              Start Date
            </label>

            <div className="relative">
              <input
                type="date"
                value={currentStageDates.startDate}
                onChange={(e) => onDateChange("startDate", e.target.value)}
                className="w-full px-4 py-3 border border-indigo-200 rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                          transition-all duration-300 ease-in-out shadow-sm hover:shadow
                          pl-12 bg-indigo-50 bg-opacity-30 text-indigo-800"
                required
                onFocus={() => setShowStartCalendar(true)}
                onBlur={() =>
                  setTimeout(() => setShowStartCalendar(false), 200)
                }
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-indigo-100 p-1.5 rounded-md">
                <Calendar className="h-5 w-5 stroke-indigo-600" />
              </div>

              {currentStageDates.startDate && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-semibold text-indigo-700 bg-indigo-100 px-2 py-1 rounded-md">
                  {formatDisplayDate(currentStageDates.startDate)}
                </div>
              )}
            </div>

            {showStartCalendar && (
              <div className="absolute z-10 mt-2 p-3 bg-white rounded-lg shadow-xl border border-indigo-100 animate-fadeIn w-full">
                <div className="text-xs font-medium text-indigo-600 mb-2">
                  Quick select:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className="text-sm px-3 py-2 bg-indigo-50 rounded-md hover:bg-indigo-100 text-indigo-700 transition-colors duration-200 font-medium"
                    onClick={() => {
                      const today = new Date().toISOString().split("T")[0];
                      onDateChange("startDate", today);
                    }}
                  >
                    Today
                  </button>
                  <button
                    className="text-sm px-3 py-2 bg-indigo-50 rounded-md hover:bg-indigo-100 text-indigo-700 transition-colors duration-200 font-medium"
                    onClick={() => {
                      const tomorrow = new Date();
                      tomorrow.setDate(tomorrow.getDate() + 1);
                      onDateChange(
                        "startDate",
                        tomorrow.toISOString().split("T")[0]
                      );
                    }}
                  >
                    Tomorrow
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* End Date Picker */}
          <div className="relative transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md rounded-xl p-5 border border-gray-100">
            <label className="block text-sm font-semibold text-indigo-700 mb-3 flex items-center">
              <Clock className="h-4 w-4 mr-2 stroke-red-600" />
              End Date
            </label>

            <div className="relative">
              <input
                type="date"
                value={currentStageDates.endDate}
                onChange={(e) => onDateChange("endDate", e.target.value)}
                className="w-full px-4 py-3 border border-indigo-200 rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                          transition-all duration-300 ease-in-out shadow-sm hover:shadow
                          pl-12 bg-indigo-50 bg-opacity-30 text-indigo-800"
                required
                onFocus={() => setShowEndCalendar(true)}
                onBlur={() => setTimeout(() => setShowEndCalendar(false), 200)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-indigo-100 p-1.5 rounded-md">
                <Calendar className="h-5 w-5 stroke-indigo-600" />
              </div>

              {currentStageDates.endDate && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-semibold text-indigo-700 bg-indigo-100 px-2 py-1 rounded-md">
                  {formatDisplayDate(currentStageDates.endDate)}
                </div>
              )}
            </div>

            {showEndCalendar && (
              <div className="absolute z-10 mt-2 p-3 bg-white rounded-lg shadow-xl border border-indigo-100 animate-fadeIn w-full">
                <div className="text-xs font-medium text-indigo-600 mb-2">
                  Quick select:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className="text-sm px-3 py-2 bg-indigo-50 rounded-md hover:bg-indigo-100 text-indigo-700 transition-colors duration-200 font-medium"
                    onClick={() => {
                      // End of week
                      const endOfWeek = new Date();
                      endOfWeek.setDate(
                        endOfWeek.getDate() + (7 - endOfWeek.getDay())
                      );
                      onDateChange(
                        "endDate",
                        endOfWeek.toISOString().split("T")[0]
                      );
                    }}
                  >
                    End of Week
                  </button>
                  <button
                    className="text-sm px-3 py-2 bg-indigo-50 rounded-md hover:bg-indigo-100 text-indigo-700 transition-colors duration-200 font-medium"
                    onClick={() => {
                      // End of month
                      const endOfMonth = new Date();
                      endOfMonth.setMonth(endOfMonth.getMonth() + 1);
                      endOfMonth.setDate(0);
                      onDateChange(
                        "endDate",
                        endOfMonth.toISOString().split("T")[0]
                      );
                    }}
                  >
                    End of Month
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Date validation message */}
        {currentStageDates.startDate && currentStageDates.endDate && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg text-sm flex items-start border-l-4 border-green-400">
            <CheckCircle className="h-5 w-5 mr-2 stroke-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-green-800">
                Date Range Confirmed:{" "}
              </span>
              <span className="text-green-700">
                This stage will run for{" "}
                <span className="font-semibold">
                  {calculateDaysBetween(
                    currentStageDates.startDate,
                    currentStageDates.endDate
                  )}{" "}
                  days
                </span>
                from{" "}
                <span className="font-semibold">
                  {formatDisplayDate(currentStageDates.startDate)}
                </span>{" "}
                to{" "}
                <span className="font-semibold">
                  {formatDisplayDate(currentStageDates.endDate)}
                </span>
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-2">
        <button
          onClick={onSubmit}
          disabled={!datesSelected}
          className={`
            px-8 py-3 rounded-full text-white font-semibold
            transition-all duration-300 ease-in-out 
            transform hover:scale-105 focus:outline-none focus:ring-3 focus:ring-offset-2
            shadow-md flex items-center
            ${
              !datesSelected
                ? "bg-gray-300 cursor-not-allowed opacity-70"
                : "bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 focus:ring-indigo-500"
            }
          `}
        >
          {datesSelected ? (
            <>
              <CheckCircle className="h-5 w-5 mr-2" />
              Set Dates & Continue
              <ArrowRight className="h-5 w-5 ml-2" />
            </>
          ) : (
            "Please select dates"
          )}
        </button>
      </div>
    </div>
  );
}

// Helper function to calculate days between two dates
function calculateDaysBetween(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Add a custom fade-in animation
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
`;

export default StageDateSelector;
