import React, { useState } from "react";
import {
  Search,
  X,
  ChevronLeft,
  Calendar,
  Tag,
  Clock,
  Layers,
  PieChart,
  SlidersHorizontal,
  CheckCircle2,
} from "lucide-react";
import ProjectTask from "../components/common/ProjectTask";
import ProjectsTable from "../components/common/Table/ProjectTable";
import Data from "./Data";

export default function MyProjectsPage() {
  const [projects, setProjects] = useState(Data);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(5);
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
      <div className=" mx-auto">
        {/* Show ProjectTask component when a project is selected */}
        {showProjectTask && selectedProject ? (
          <div>
            <div className="mb-4">
              <button
                onClick={handleBackToProjects}
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} className="mr-1" />
                <span>Back to Projects</span>
              </button>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm mb-6">
              <h1 className="text-xl font-semibold text-gray-900 mb-2">
                {selectedProject.name}
              </h1>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full flex items-center">
                  <Tag size={12} className="mr-1" />
                  {selectedProject.category}
                </span>
                <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full flex items-center">
                  <Calendar size={12} className="mr-1" />
                  Due: {selectedProject.dueDate}
                </span>
                <span
                  className={`text-xs ${
                    selectedProject.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : selectedProject.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                  } px-2 py-1 rounded-full flex items-center`}
                >
                  {selectedProject.status === "Completed" ? (
                    <CheckCircle2 size={12} className="mr-1" />
                  ) : selectedProject.status === "In Progress" ? (
                    <Clock size={12} className="mr-1" />
                  ) : (
                    <Layers size={12} className="mr-1" />
                  )}
                  {selectedProject.status}
                </span>
              </div>
            </div>
            <ProjectTask />
          </div>
        ) : (
          // Projects List View
          <>
            {/* Header and Search */}
            <div className="bg-white p-4 rounded-md shadow-sm mb-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div className="flex items-center">
                  <Layers size={20} className="text-blue-600 mr-2" />
                  <h1 className="text-xl font-semibold text-gray-900">
                    My Projects
                  </h1>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="pl-10 pr-4 py-2 w-full md:w-64 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </div>
                  <button
                    className="flex items-center text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors px-3 py-2 rounded-md text-sm"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <SlidersHorizontal size={16} className="mr-2" />
                    <span>{showFilters ? "Hide Filters" : "Filters"}</span>
                  </button>
                </div>
              </div>

              {/* Expanded Filter Panel */}
              {showFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200 transition-all duration-300 ease-in-out">
                  <div className="flex flex-wrap justify-end items-end gap-4">
                    {/* Category Filter */}
                    <div className="w-full sm:w-auto">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Tag size={14} className="inline mr-1" />
                        Category
                      </label>
                      <select
                        className="w-full sm:w-40 rounded-md border border-gray-300 py-2 px-3 text-sm"
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
                        <Clock size={14} className="inline mr-1" />
                        Status
                      </label>
                      <select
                        className="w-full sm:w-40 rounded-md border border-gray-300 py-2 px-3 text-sm"
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
                        <PieChart size={14} className="inline mr-1" />
                        Progress
                      </label>
                      <select
                        className="w-full sm:w-40 rounded-md border border-gray-300 py-2 px-3 text-sm"
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
                    {(filters.category ||
                      filters.status ||
                      filters.progress ||
                      filters.searchTerm) && (
                      <button
                        onClick={clearFilters}
                        className="flex items-center text-red-600 hover:text-red-800 transition-colors text-sm"
                      >
                        <X size={14} className="mr-1" />
                        <span>Clear All</span>
                      </button>
                    )}
                  </div>

                  {/* Active Filters */}
                  {(filters.category ||
                    filters.status ||
                    filters.progress ||
                    filters.searchTerm) && (
                    <div className="mt-4 flex flex-wrap gap-2 items-center">
                      <span className="text-sm text-gray-500">
                        Active filters:
                      </span>
                      {filters.searchTerm && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center">
                          <Search size={10} className="mr-1" />
                          {filters.searchTerm}
                          <button
                            onClick={() => handleFilterChange("searchTerm", "")}
                            className="ml-1 hover:text-blue-600"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      )}
                      {filters.category && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center">
                          <Tag size={10} className="mr-1" />
                          {filters.category}
                          <button
                            onClick={() => handleFilterChange("category", "")}
                            className="ml-1 hover:text-blue-600"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      )}
                      {filters.status && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center">
                          <Clock size={10} className="mr-1" />
                          {filters.status}
                          <button
                            onClick={() => handleFilterChange("status", "")}
                            className="ml-1 hover:text-blue-600"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      )}
                      {filters.progress && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center">
                          <PieChart size={10} className="mr-1" />
                          Progress: {filters.progress}
                          <button
                            onClick={() => handleFilterChange("progress", "")}
                            className="ml-1 hover:text-blue-600"
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

            {/* Integrate the ProjectsTable component */}
            <ProjectsTable
              projects={projects}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              projectsPerPage={projectsPerPage}
              filters={filters}
              clearFilters={clearFilters}
              onProjectClick={handleProjectSelect}
            />
          </>
        )}
      </div>
    </div>
  );
}
