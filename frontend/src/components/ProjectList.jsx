//  Lists user projects and handles selection

import React from "react";

const ProjectList = ({ projects, selectedProjectId, onSelectProject }) => {
  return (
    <div className="mt-6">
      <h3 className="text-md font-semibold mb-2">Your Projects</h3>
      <ul>
        {projects.map((project) => (
          <li
            key={project._id}
            onClick={() => onSelectProject(project)}
            className={`p-2 cursor-pointer rounded ${
              selectedProjectId === project._id
                ? "bg-blue-100 font-bold"
                : "hover:bg-gray-100"
            }`}
          >
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
