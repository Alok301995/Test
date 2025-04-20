import React, { useState } from "react";
import { Search, Filter, AlertCircle, X } from "lucide-react";
import ProjectsTable from "../components/common/Table/ProjectTable";
import ProjectTask from "../components/common/ProjectTask"; // Import the ProjectTask component

export default function MyProjectsPage() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Customer Churn Prediction",
      category: "Development",
      status: "In Progress",
      dueDate: "2025-05-15",
      progress: 65,
    },
    {
      id: 2,
      name: "Data Cloud Implimentation",
      category: "Marketing",
      status: "Planning",
      dueDate: "2025-06-10",
      progress: 25,
    },
    {
      id: 3,
      name: "MIS Dashboard Development",
      category: "Development",
      status: "Completed",
      dueDate: "2025-04-05",
      progress: 100,
    },
    {
      id: 4,
      name: "Service Network Expansion",
      category: "Research",
      status: "In Progress",
      dueDate: "2025-05-20",
      progress: 45,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;

  // Filter state
  const [showFilters, setShowFilters] = useState(false);
  const [showProjectTask, setShowProjectTask] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: "",
    category: "",
    status: "",
    progress: "",
  });

  // Get unique categories and statuses for filter dropdowns
  const categories = [...new Set(projects.map((project) => project.category))];
  const statuses = [...new Set(projects.map((project) => project.status))];

  // Handle filter changes
  const handleFilterChange = (field, value) => {
    setFilters({
      ...filters,
      [field]: value,
    });
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Update search term in filters
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilters({
      ...filters,
      searchTerm: value,
    });
    setCurrentPage(1);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      searchTerm: "",
      category: "",
      status: "",
      progress: "",
    });
    setSearchTerm("");
    setCurrentPage(1);
  };

  // Handle project selection to show tasks
  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setShowProjectTask(true);
  };

  // Handle back to projects list
  const handleBackToProjects = () => {
    setShowProjectTask(false);
    setSelectedProject(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="mx-auto">
        {/* Show ProjectTask component when a project is selected */}
        {showProjectTask && selectedProject ? (
          <div>
            <div className="mb-4">
              <button
                onClick={handleBackToProjects}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to Projects
              </button>
            </div>
            {/* <div className="bg-white p-4 rounded-md shadow-sm mb-6">
              <h1 className="text-xl font-semibold text-gray-900 mb-2">
                {selectedProject.name}
              </h1>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {selectedProject.category}
                </span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Due: {selectedProject.dueDate}
                </span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {selectedProject.status}
                </span>
              </div>
            </div> */}
            <ProjectTask />
          </div>
        ) : (
          // Projects List View
          <>
            {projects.length > 0 ? (
              <>
                {/* Search and Filter */}
                <div className="bg-white p-4 rounded-md shadow-sm mb-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div className="">
                      <h1 className="text-xl font-semibold text-gray-900">
                        My Projects
                      </h1>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="relative w-full md:w-64">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Search size={18} className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Search projects..."
                          value={searchTerm}
                          onChange={handleSearchChange}
                        />
                      </div>
                      <button
                        className="flex items-center text-gray-600 hover:text-gray-900"
                        onClick={() => setShowFilters(!showFilters)}
                      >
                        <Filter size={18} className="mr-2" />
                        <span>
                          {showFilters ? "Hide Filters" : "Show Filters"}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Expanded Filter Panel */}
                  {showFilters && (
                    <div
                      className={`
                      mt-4 border-t border-gray-200
                      transition-all duration-300 ease-in-out
                      ${
                        showFilters
                          ? "max-h-96 opacity-100 pt-4 border-opacity-100"
                          : "max-h-0 opacity-0 pt-0 overflow-hidden border-opacity-0"
                      }
                    `}
                    >
                      <div className="flex flex-wrap items-center gap-4">
                        {/* Category Filter */}
                        <div className="w-full sm:w-auto">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                          </label>
                          <select
                            className="w-full sm:w-40 rounded-md border border-gray-300 py-2 px-3"
                            value={filters.category}
                            onChange={(e) =>
                              handleFilterChange("category", e.target.value)
                            }
                          >
                            <option value="">All Categories</option>
                            {categories.map((category, index) => (
                              <option key={index} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Status Filter */}
                        <div className="w-full sm:w-auto">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                          </label>
                          <select
                            className="w-full sm:w-40 rounded-md border border-gray-300 py-2 px-3"
                            value={filters.status}
                            onChange={(e) =>
                              handleFilterChange("status", e.target.value)
                            }
                          >
                            <option value="">All Statuses</option>
                            {statuses.map((status, index) => (
                              <option key={index} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Progress Filter */}
                        <div className="w-full sm:w-auto">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Progress
                          </label>
                          <select
                            className="w-full sm:w-40 rounded-md border border-gray-300 py-2 px-3"
                            value={filters.progress}
                            onChange={(e) =>
                              handleFilterChange("progress", e.target.value)
                            }
                          >
                            <option value="">All Progress</option>
                            <option value="low">Low (0-29%)</option>
                            <option value="medium">Medium (30-69%)</option>
                            <option value="high">High (70-100%)</option>
                          </select>
                        </div>

                        {/* Clear Filters Button */}
                        <div className="w-full sm:w-auto sm:ml-auto">
                          <button
                            onClick={clearFilters}
                            className="flex items-center text-gray-600 hover:text-gray-900 mt-4 sm:mt-0"
                          >
                            <X size={16} className="mr-1" />
                            <span>Clear Filters</span>
                          </button>
                        </div>
                      </div>

                      {/* Active Filters */}
                      {(filters.category ||
                        filters.status ||
                        filters.progress ||
                        filters.searchTerm) && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          <span className="text-sm text-gray-500">
                            Active filters:
                          </span>
                          {filters.searchTerm && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center">
                              Search: {filters.searchTerm}
                              <button
                                onClick={() =>
                                  handleFilterChange("searchTerm", "")
                                }
                                className="ml-1"
                              >
                                <X size={12} />
                              </button>
                            </span>
                          )}
                          {filters.category && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center">
                              Category: {filters.category}
                              <button
                                onClick={() =>
                                  handleFilterChange("category", "")
                                }
                                className="ml-1"
                              >
                                <X size={12} />
                              </button>
                            </span>
                          )}
                          {filters.status && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center">
                              Status: {filters.status}
                              <button
                                onClick={() => handleFilterChange("status", "")}
                                className="ml-1"
                              >
                                <X size={12} />
                              </button>
                            </span>
                          )}
                          {filters.progress && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center">
                              Progress: {filters.progress}
                              <button
                                onClick={() =>
                                  handleFilterChange("progress", "")
                                }
                                className="ml-1"
                              >
                                <X size={12} />
                              </button>
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Projects Table Component with onProjectSelect */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Due Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Progress
                        </th>
                        {/* <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th> */}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {projects
                        .filter((project) => {
                          // Apply filters
                          const matchesSearch = project.name
                            .toLowerCase()
                            .includes(filters.searchTerm.toLowerCase());
                          const matchesCategory =
                            !filters.category ||
                            project.category === filters.category;
                          const matchesStatus =
                            !filters.status ||
                            project.status === filters.status;

                          let matchesProgress = true;
                          if (filters.progress) {
                            if (
                              filters.progress === "low" &&
                              project.progress >= 30
                            ) {
                              matchesProgress = false;
                            } else if (
                              filters.progress === "medium" &&
                              (project.progress < 30 || project.progress >= 70)
                            ) {
                              matchesProgress = false;
                            } else if (
                              filters.progress === "high" &&
                              project.progress < 70
                            ) {
                              matchesProgress = false;
                            }
                          }

                          return (
                            matchesSearch &&
                            matchesCategory &&
                            matchesStatus &&
                            matchesProgress
                          );
                        })
                        .map((project) => (
                          <tr
                            key={project.id}
                            className="hover:bg-gray-50 cursor-pointer"
                            onClick={() => handleProjectSelect(project)}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {project.name}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                {project.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  project.status === "Completed"
                                    ? "bg-green-100 text-green-800"
                                    : project.status === "In Progress"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {project.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {project.dueDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-blue-600 h-2.5 rounded-full"
                                  style={{ width: `${project.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-500 mt-1 block">
                                {project.progress}%
                              </span>
                            </td>
                            {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                className="text-blue-600 hover:text-blue-900"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleProjectSelect(project);
                                }}
                              >
                                View Tasks
                              </button>
                            </td> */}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  {/* Pagination could be added here */}
                </div>
              </>
            ) : (
              /* No Projects View */
              <div className="bg-white rounded-lg shadow-sm p-10 text-center">
                <div className="flex justify-center">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <AlertCircle size={48} className="text-blue-600" />
                  </div>
                </div>
                <h2 className="mt-6 text-xl font-medium text-gray-900">
                  No projects found
                </h2>
                <p className="mt-2 text-gray-500">
                  There are currently no projects to display
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
