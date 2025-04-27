import React, { useState } from "react";
import {
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Calendar,
  User,
  AlertCircle,
} from "lucide-react";

function TaskTable({
  tasks,
  statusOptions,
  onDescriptionChange,
  onDateChange,
  onStatusChange,
}) {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(5);
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;

  // Sorting logic
  const sortedTasks = [...tasks].sort((a, b) => {
    // Handle different field types differently
    if (sortField === "id") {
      return sortDirection === "asc" ? a.id - b.id : b.id - a.id;
    } else if (
      sortField === "createdAt" ||
      sortField === "startDate" ||
      sortField === "endDate"
    ) {
      const dateA = new Date(a[sortField] || "1970-01-01");
      const dateB = new Date(b[sortField] || "1970-01-01");
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    } else {
      // String comparison for other fields
      const valueA = String(a[sortField] || "").toLowerCase();
      const valueB = String(b[sortField] || "").toLowerCase();
      return sortDirection === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
  });

  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  // Handle sorting
  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Get status badge styling
  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Under Review":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Get priority badge styling
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Medium":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Format date display
  const formatDate = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    // If 5 pages or fewer, show all pages
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Calculate visible pages
    const visiblePages = [];

    // Always include first page
    visiblePages.push(1);

    // Add ellipsis if needed before middle pages
    if (currentPage > 3) {
      visiblePages.push("...");
    }

    // Add pages around current page
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      visiblePages.push(i);
    }

    // Add ellipsis if needed after middle pages
    if (currentPage < totalPages - 2) {
      visiblePages.push("...");
    }

    // Always include last page if more than 1 page
    if (totalPages > 1) {
      visiblePages.push(totalPages);
    }

    return visiblePages;
  };

  // Handle page size change
  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setTasksPerPage(newSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  // Handle navigation to first, previous, next, and last pages
  const goToFirstPage = () => setCurrentPage(1);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToLastPage = () => setCurrentPage(totalPages);

  // Sorting indicator component
  const SortIndicator = ({ field }) => {
    if (sortField !== field) return null;

    return (
      <span className="ml-1 text-gray-500">
        {sortDirection === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  return (
    <div className="transition-all duration-300 ease-in-out">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-lg font-semibold flex items-center text-gray-800">
          <ClipboardList size={20} className="mr-2 text-blue-600" />
          Stage Tasks
          <span className="ml-2 text-sm bg-blue-100 text-blue-800 font-medium px-2.5 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </h2>

        <div className="flex items-center gap-4">
          <div className="flex items-center text-sm">
            <span className="text-gray-600 mr-2">Show:</span>
            <select
              value={tasksPerPage}
              onChange={handlePageSizeChange}
              className="border border-gray-300 rounded px-2 py-1 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {[5, 10, 15, 20].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center text-sm">
            <span className="text-gray-600 mr-2">Sort by:</span>
            <select
              value={`${sortField}-${sortDirection}`}
              onChange={(e) => {
                const [field, direction] = e.target.value.split("-");
                setSortField(field);
                setSortDirection(direction);
              }}
              className="border border-gray-300 rounded px-2 py-1 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="id-asc">ID (Ascending)</option>
              <option value="id-desc">ID (Descending)</option>
              <option value="createdAt-desc">Recent First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="priority-desc">Priority (High to Low)</option>
              <option value="priority-asc">Priority (Low to High)</option>
              <option value="status-asc">Status (A to Z)</option>
            </select>
          </div>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="p-8 text-center bg-gray-50 rounded-lg border border-gray-200 transition-all duration-300 ease-in-out">
          <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
            <ClipboardList size={32} className="text-gray-400" />
          </div>
          <p className="text-gray-600 font-medium mb-2">No tasks found</p>
          <p className="text-gray-500 text-sm">
            Tasks you create will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-r border-gray-200 cursor-pointer"
                    onClick={() => handleSort("id")}
                  >
                    <div className="flex items-center">
                      ID
                      <SortIndicator field="id" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-r border-gray-200 cursor-pointer"
                    onClick={() => handleSort("description")}
                  >
                    <div className="flex items-center">
                      Description
                      <SortIndicator field="description" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-r border-gray-200 cursor-pointer"
                    onClick={() => handleSort("assignedTo")}
                  >
                    <div className="flex items-center">
                      Assigned To
                      <SortIndicator field="assignedTo" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-r border-gray-200">
                    <div className="flex items-center">Timeline</div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-r border-gray-200 cursor-pointer"
                    onClick={() => handleSort("status")}
                  >
                    <div className="flex items-center">
                      Status
                      <SortIndicator field="status" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-r border-gray-200 cursor-pointer"
                    onClick={() => handleSort("priority")}
                  >
                    <div className="flex items-center">
                      Priority
                      <SortIndicator field="priority" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("createdAt")}
                  >
                    <div className="flex items-center">
                      Created
                      <SortIndicator field="createdAt" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentTasks.map((task) => (
                  <tr
                    key={task.id}
                    className={`transition-colors duration-200 ease-in-out ${
                      hoveredRow === task.id ? "bg-blue-50" : "hover:bg-gray-50"
                    } border-b border-gray-200 last:border-b-0`}
                    onMouseEnter={() => setHoveredRow(task.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800">
                        {task.id}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700 border-r border-gray-200">
                      <div className="max-w-xs line-clamp-2 font-medium">
                        {task.description}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
                      <div className="flex items-center">
                        {task.assignedTo ? (
                          <>
                            <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-medium mr-2">
                              {task.assignedTo
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <span>{task.assignedTo}</span>
                          </>
                        ) : (
                          <span className="flex items-center text-gray-400">
                            <User size={16} className="mr-2" />
                            Unassigned
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500 border-r border-gray-200">
                      <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                          <Calendar size={14} className="text-green-500 mr-2" />
                          <span>{formatDate(task.startDate)}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar size={14} className="text-red-500 mr-2" />
                          <span>{formatDate(task.endDate)}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm border-r border-gray-200">
                      <select
                        value={task.status}
                        onChange={(e) =>
                          onStatusChange(task.id, e.target.value)
                        }
                        className={`px-2 py-1 rounded-full text-xs font-medium border transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${getStatusStyle(
                          task.status
                        )}`}
                      >
                        {statusOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm border-r border-gray-200">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border inline-flex items-center ${getPriorityStyle(
                          task.priority
                        )}`}
                      >
                        {task.priority === "Critical" && (
                          <AlertCircle size={12} className="mr-1" />
                        )}
                        {task.priority || "Medium"}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {task.createdAt ? formatDate(task.createdAt) : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="mb-4 sm:mb-0 text-sm text-gray-700">
                Showing {currentTasks.length > 0 ? indexOfFirstTask + 1 : 0} to{" "}
                {Math.min(indexOfLastTask, tasks.length)} of {tasks.length}{" "}
                results
              </div>

              <div className="flex items-center">
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  {/* First Page Button */}
                  <button
                    onClick={goToFirstPage}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border text-sm font-medium ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-500 hover:bg-gray-50 hover:text-blue-600"
                    } transition-colors duration-200`}
                    aria-label="Go to first page"
                  >
                    <span className="sr-only">First</span>
                    <ChevronsLeft size={16} />
                  </button>

                  {/* Previous Button */}
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 border text-sm font-medium ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-500 hover:bg-gray-50 hover:text-blue-600"
                    } transition-colors duration-200`}
                    aria-label="Go to previous page"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft size={16} />
                  </button>

                  {/* Page Numbers */}
                  {getPageNumbers().map((page, index) => {
                    if (page === "...") {
                      return (
                        <span
                          key={`ellipsis-${index}`}
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                        >
                          ...
                        </span>
                      );
                    }

                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors duration-200 ${
                          currentPage === page
                            ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-blue-600"
                        }`}
                        aria-label={`Page ${page}`}
                        aria-current={currentPage === page ? "page" : undefined}
                      >
                        {page}
                      </button>
                    );
                  })}

                  {/* Next Button */}
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className={`relative inline-flex items-center px-2 py-2 border text-sm font-medium ${
                      currentPage === totalPages || totalPages === 0
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-500 hover:bg-gray-50 hover:text-blue-600"
                    } transition-colors duration-200`}
                    aria-label="Go to next page"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight size={16} />
                  </button>

                  {/* Last Page Button */}
                  <button
                    onClick={goToLastPage}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border text-sm font-medium ${
                      currentPage === totalPages || totalPages === 0
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-500 hover:bg-gray-50 hover:text-blue-600"
                    } transition-colors duration-200`}
                    aria-label="Go to last page"
                  >
                    <span className="sr-only">Last</span>
                    <ChevronsRight size={16} />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskTable;
