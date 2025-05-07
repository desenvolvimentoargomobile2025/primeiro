import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProjectsList from "@/components/dashboard/ProjectsList";
import { Helmet } from "react-helmet";

const ProjectsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <Helmet>
        <title>Projetos - Argo Mobile</title>
        <meta name="description" content="Gerencie seus projetos de desenvolvimento de games." />
      </Helmet>
      <ProjectsList />
    </DashboardLayout>
  );
};

export default ProjectsPage;
