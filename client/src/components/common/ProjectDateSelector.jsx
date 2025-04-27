import React from "react";
import { Calendar, ArrowRight, Clock } from "lucide-react";

function StageDateSelector({
  stageNumber,
  stageDates,
  onDateChange,
  onSubmit,
}) {
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
    <div className="p-4 bg-blue-50  rounded-lg shadow-sm">
      <div className="flex flex-wrap md:flex-nowrap items-end gap-4">
        {/* Instructions */}
        <div className="flex items-center text-sm font-medium text-indigo-700 bg-white px-3 py-2 rounded-lg shadow-sm border border-indigo-100">
          <Calendar className="w-4 h-4 text-indigo-500 mr-2" />
          <span>Set timeline:</span>
        </div>

        {/* Date inputs container */}
        <div className="flex flex-1 gap-3 items-center">
          {/* Start Date */}
          <div className="relative flex-1">
            <label className="block text-xs font-medium text-indigo-600 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={currentStageDates.startDate}
              onChange={(e) => onDateChange("startDate", e.target.value)}
              className="w-full px-3 py-2 pl-8 border border-blue-200 rounded-md text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none bg-white shadow-sm transition-colors duration-200"
              required
            />
            <Clock className="absolute left-2.5 top-7 w-4 h-4 text-blue-400" />
          </div>

          {/* End Date */}
          <div className="relative flex-1">
            <label className="block text-xs font-medium text-indigo-600 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={currentStageDates.endDate}
              onChange={(e) => onDateChange("endDate", e.target.value)}
              className="w-full px-3 py-2 pl-8 border border-blue-200 rounded-md text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none bg-white shadow-sm transition-colors duration-200"
              required
            />
            <Clock className="absolute left-2.5 top-7 w-4 h-4 text-blue-400" />
          </div>
        </div>

        {/* Submit button */}
        <button
          onClick={onSubmit}
          disabled={!datesSelected}
          className={`
            px-4 py-2 rounded-md text-sm font-medium min-w-24 text-center
            flex items-center justify-center gap-1 transition-all duration-200
            shadow-sm
            ${
              !datesSelected
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }
          `}
        >
          {datesSelected ? (
            <>
              Continue
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          ) : (
            "Select dates"
          )}
        </button>
      </div>
    </div>
  );
}

export default StageDateSelector;
