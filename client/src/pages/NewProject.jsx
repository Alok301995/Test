import React, { useState } from "react";

// Custom Imports
import { projectTemplate } from "../utils/Config";

function NewProject() {
  const [formData, setFormData] = useState({
    projectName: "",
    owner: "",
    team: "",
    stakeholders: "",
    description: "",
    benefitToACE: "",
    template: "",
  });

  // Sample templates

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTemplateChange = (e) => {
    const templateId = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      template: templateId,
    }));

    // Here you could pre-fill other fields based on the selected template
    if (templateId === "agile") {
      setFormData((prevState) => ({
        ...prevState,
        template: templateId,
        description: "Agile project with sprints and iterative development.",
        benefitToACE:
          "Faster delivery with continuous feedback and improvement.",
      }));
    } else if (templateId === "waterfall") {
      setFormData((prevState) => ({
        ...prevState,
        template: templateId,
        description: "Sequential project with defined phases.",
        benefitToACE: "Clear milestones and structured delivery approach.",
      }));
    }
    // Add other template logic as needed
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Project data submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Project created successfully!");
    // Reset form or redirect as needed
  };

  return (
    <div className="max-w-full mx-auto p-8 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg">
      <div className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-800">Create New Project</h1>
        <p className="text-gray-500 mt-2">
          Fill in the details to set up your new project
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Template Selection - Full Width */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <label
                htmlFor="template"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Project Template
              </label>
              <select
                id="template"
                name="template"
                value={formData.projectTemplate}
                onChange={handleTemplateChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
              >
                <option value="">Select a template...</option>
                {projectTemplate.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-2">
                Choose a template to pre-fill some fields or start with a blank
                project
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <label
                htmlFor="owner"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Owner
              </label>
              <input
                type="text"
                id="owner"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                placeholder="Project owner name"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <label
                htmlFor="team"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Team
              </label>
              <input
                type="text"
                id="team"
                name="team"
                value={formData.team}
                onChange={handleChange}
                placeholder="Team members (comma separated)"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <label
                htmlFor="benefitToACE"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Benefit to ACE
              </label>
              <textarea
                id="benefitToACE"
                name="benefitToACE"
                value={formData.benefitToACE}
                onChange={handleChange}
                rows="3"
                placeholder="How does this project benefit ACE?"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              ></textarea>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <label
                htmlFor="projectName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Project Name
              </label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                placeholder="Enter project name"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <label
                htmlFor="stakeholders"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Stakeholders
              </label>
              <input
                type="text"
                id="stakeholders"
                name="stakeholders"
                value={formData.stakeholders}
                onChange={handleChange}
                placeholder="Project stakeholders"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Project description"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              ></textarea>
            </div>
          </div>
        </div>

        {/* Submit Button - Full Width Below the Grid */}
        <div className="mt-10 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-md"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewProject;
