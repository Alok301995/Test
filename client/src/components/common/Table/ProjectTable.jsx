import React, { useState, useEffect } from "react";
import {
  FolderOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowUpRight,
  MoreHorizontal,
  Clock,
  Users,
  Edit,
  Trash2,
  Star,
  Share2,
  ChevronsLeft,
  ChevronsRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function ProjectsTable({
  projects,
  currentPage,
  setCurrentPage,
  projectsPerPage,
  filters,
  clearFilters,
  onProjectClick,
}) {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [pageSizeOptions] = useState([5, 10, 15, 20, 50]);
  const [pageSize, setPageSize] = useState(projectsPerPage);
  const [isFiltersCleared, setIsFiltersCleared] = useState(false);

  // Filter projects based on current filters
  const filteredProjects = projects.filter((project) => {
    // Search term filter
    const matchesSearch =
      filters.searchTerm === "" ||
      project.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      project.category
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase()) ||
      project.status.toLowerCase().includes(filters.searchTerm.toLowerCase());

    // Category filter
    const matchesCategory =
      filters.category === "" || project.category === filters.category;

    // Status filter
    const matchesStatus =
      filters.status === "" || project.status === filters.status;

    // Progress filter
    const matchesProgress = () => {
      if (filters.progress === "") return true;
      if (filters.progress === "low" && project.progress < 30) return true;
      if (
        filters.progress === "medium" &&
        project.progress >= 30 &&
        project.progress < 70
      )
        return true;
      if (filters.progress === "high" && project.progress >= 70) return true;
      return false;
    };

    return (
      matchesSearch && matchesCategory && matchesStatus && matchesProgress()
    );
  });

  // Update page size and reset to first page when it changes
  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize, setCurrentPage]);

  // Reset filter flag after animation completes
  useEffect(() => {
    if (isFiltersCleared) {
      const timer = setTimeout(() => {
        setIsFiltersCleared(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isFiltersCleared]);

  // Pagination
  const indexOfLastProject = currentPage * pageSize;
  const indexOfFirstProject = indexOfLastProject - pageSize;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const totalPages = Math.ceil(filteredProjects.length / pageSize);

  // Handle page size change
  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
  };

  // Progress bar color based on progress value
  const getProgressColor = (progress) => {
    if (progress < 30) return "bg-red-500";
    if (progress < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  // Status badge color and icon
  const getStatusInfo = (status) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "completed":
        return {
          color: "bg-emerald-100 text-emerald-800 border border-emerald-200",
          icon: <CheckCircle2 size={14} className="mr-1 text-emerald-600" />,
        };
      case "in progress":
        return {
          color: "bg-blue-100 text-blue-800 border border-blue-200",
          icon: <Clock size={14} className="mr-1 text-blue-600" />,
        };
      case "planning":
        return {
          color: "bg-amber-100 text-amber-800 border border-amber-200",
          icon: <Calendar size={14} className="mr-1 text-amber-600" />,
        };
      case "cancelled":
        return {
          color: "bg-red-100 text-red-800 border border-red-200",
          icon: <XCircle size={14} className="mr-1 text-red-600" />,
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border border-gray-200",
          icon: null,
        };
    }
  };

  // Function to handle project click
  const handleProjectClick = (project) => {
    if (onProjectClick) {
      onProjectClick(project);
    }
  };

  // Handle clearing filters with transition
  const handleClearFilters = () => {
    setIsFiltersCleared(true);
    clearFilters();
  };

  // Toggle dropdown menu
  const toggleDropdown = (projectId, e) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === projectId ? null : projectId);
  };

  // Jump to first page
  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  // Jump to last page
  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let formattedDate = new Date(dateString).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    if (diffDays <= 7) {
      return (
        <span className="flex items-center">
          {date < now ? (
            <span className="text-red-600 font-medium flex items-center transition-colors duration-300">
              <Clock size={14} className="mr-1" />
              {formattedDate}
            </span>
          ) : (
            <span>{formattedDate}</span>
          )}
        </span>
      );
    }

    return formattedDate;
  };

  // Handle click outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    // If 7 pages or fewer, show all pages
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Calculate how many pages to show around the current page
    const visiblePages = 3;
    let startPage = Math.max(2, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + visiblePages - 1);

    // Adjust if we're near the end
    if (endPage === totalPages - 1) {
      startPage = Math.max(2, endPage - visiblePages + 1);
    }

    const pageNumbers = [1]; // Always include first page

    // Add ellipsis if needed before middle pages
    if (startPage > 2) {
      pageNumbers.push("ellipsis1");
    }

    // Add visible pages around current page
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Add ellipsis if needed after middle pages
    if (endPage < totalPages - 1) {
      pageNumbers.push("ellipsis2");
    }

    // Add last page if not already added
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all duration-300">
      {filteredProjects.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Project
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Due Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Progress
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentProjects.map((project) => {
                  const statusInfo = getStatusInfo(project.status);
                  return (
                    <tr
                      key={project.id}
                      onClick={() => handleProjectClick(project)}
                      className={`transition-colors duration-300 ease-in-out cursor-pointer ${
                        hoveredRow === project.id
                          ? "bg-blue-50"
                          : "hover:bg-gray-50"
                      }`}
                      onMouseEnter={() => setHoveredRow(project.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center group">
                          <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-sm border border-blue-200 transition-all duration-300 group-hover:shadow-md">
                            <FolderOpen
                              size={22}
                              className="text-blue-600 transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                          <div className="ml-4 flex items-center">
                            <div>
                              <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 flex items-center">
                                {project.name}
                                <ArrowUpRight
                                  size={16}
                                  className="ml-1 opacity-0 group-hover:opacity-100 transition-all duration-300 text-blue-500 transform group-hover:translate-x-1"
                                />
                              </div>
                              <div className="flex items-center text-xs text-gray-500 mt-1 transition-all duration-300 group-hover:text-gray-700">
                                <Users size={12} className="mr-1" />
                                <span>Team of {project.teamSize || 5}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-sm text-gray-700 font-medium bg-gray-100 px-3 py-1 rounded-full inline-block border border-gray-200 transition-all duration-300 hover:bg-gray-200">
                          {project.category}
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full items-center transition-all duration-300 ${statusInfo.color}`}
                        >
                          {statusInfo.icon}
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-700 transition-colors duration-300">
                          <Calendar size={16} className="mr-2 text-gray-500" />
                          {formatDate(project.dueDate)}
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden shadow-inner">
                          <div
                            className={`h-2.5 rounded-full ${getProgressColor(
                              project.progress
                            )} transition-all duration-700 ease-in-out`}
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs mt-2 text-gray-600 font-medium transition-colors duration-300">
                          <span>{project.progress}% complete</span>
                          {project.progress < 100 && (
                            <span className="text-blue-600">
                              {100 - project.progress}% remaining
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium relative">
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="relative inline-block"
                        >
                          <button
                            onClick={(e) => toggleDropdown(project.id, e)}
                            className="text-gray-400 hover:text-gray-500 focus:outline-none p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-300"
                          >
                            <MoreHorizontal size={18} />
                          </button>

                          {activeDropdown === project.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200 transition-opacity duration-300 animate-fadeIn">
                              <div className="py-1 rounded-md bg-white shadow-xs">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleProjectClick(project);
                                  }}
                                  className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                >
                                  <div className="flex items-center">
                                    <ArrowUpRight
                                      size={16}
                                      className="mr-2 text-blue-500"
                                    />
                                    View Details
                                  </div>
                                </button>
                                <button className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                                  <div className="flex items-center">
                                    <Edit
                                      size={16}
                                      className="mr-2 text-gray-500"
                                    />
                                    Edit Project
                                  </div>
                                </button>
                                <button className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                                  <div className="flex items-center">
                                    <Share2
                                      size={16}
                                      className="mr-2 text-gray-500"
                                    />
                                    Share Project
                                  </div>
                                </button>
                                <button className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                                  <div className="flex items-center">
                                    <Star
                                      size={16}
                                      className="mr-2 text-yellow-500"
                                    />
                                    Mark as Favorite
                                  </div>
                                </button>
                                <div className="border-t border-gray-100 my-1"></div>
                                <button className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200">
                                  <div className="flex items-center">
                                    <Trash2 size={16} className="mr-2" />
                                    Delete Project
                                  </div>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Enhanced Pagination */}
          <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 transition-all duration-300">
            <div className="mb-4 sm:mb-0 flex items-center">
              <span className="text-sm text-gray-700 mr-3">Show</span>
              <select
                value={pageSize}
                onChange={handlePageSizeChange}
                className="rounded-md border border-gray-300 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 cursor-pointer"
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-700 ml-3">entries</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center">
              <div className="mb-4 sm:mb-0 sm:mr-6">
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  {filteredProjects.length > 0 ? indexOfFirstProject + 1 : 0} to{" "}
                  {Math.min(indexOfLastProject, filteredProjects.length)} of{" "}
                  {filteredProjects.length} results
                </p>
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
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium transition-colors duration-300 ${
                      currentPage === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:bg-gray-50 hover:text-blue-600"
                    }`}
                    aria-label="Go to first page"
                  >
                    <span className="sr-only">First Page</span>
                    <ChevronsLeft size={18} />
                  </button>

                  {/* Previous Button */}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium transition-colors duration-300 ${
                      currentPage === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:bg-gray-50 hover:text-blue-600"
                    }`}
                    aria-label="Go to previous page"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft size={18} />
                  </button>

                  {/* Page Numbers */}
                  {getPageNumbers().map((page, index) => {
                    if (page === "ellipsis1" || page === "ellipsis2") {
                      return (
                        <span
                          key={`${page}-${index}`}
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
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-all duration-300 ${
                          currentPage === page
                            ? "z-10 bg-blue-50 border-blue-500 text-blue-600 transform scale-105"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-blue-600"
                        }`}
                        aria-label={`Go to page ${page}`}
                        aria-current={currentPage === page ? "page" : undefined}
                      >
                        {page}
                      </button>
                    );
                  })}

                  {/* Next Button */}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages || totalPages === 0}
                    className={`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium transition-colors duration-300 ${
                      currentPage === totalPages || totalPages === 0
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:bg-gray-50 hover:text-blue-600"
                    }`}
                    aria-label="Go to next page"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight size={18} />
                  </button>

                  {/* Last Page Button */}
                  <button
                    onClick={goToLastPage}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium transition-colors duration-300 ${
                      currentPage === totalPages || totalPages === 0
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:bg-gray-50 hover:text-blue-600"
                    }`}
                    aria-label="Go to last page"
                  >
                    <span className="sr-only">Last Page</span>
                    <ChevronsRight size={18} />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* No matching results from filters */
        <div
          className={`p-12 text-center transition-all duration-500 ${
            isFiltersCleared
              ? "opacity-0 transform scale-95"
              : "opacity-100 transform scale-100"
          }`}
        >
          <div className="flex justify-center">
            <div className="bg-gray-100 p-4 rounded-full transition-all duration-300 hover:bg-gray-200">
              <Filter size={40} className="text-gray-400" />
            </div>
          </div>
          <h3 className="mt-5 text-lg font-medium text-gray-900">
            No matching projects
          </h3>
          <p className="mt-2 text-gray-500">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={handleClearFilters}
            className="mt-5 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-sm"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
