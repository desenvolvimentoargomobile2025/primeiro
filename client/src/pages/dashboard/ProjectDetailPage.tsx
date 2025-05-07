import React from "react";
import { useParams } from "wouter";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProjectDetail from "@/components/dashboard/ProjectDetail";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Fetch project name for the page title
  const { data: project } = useQuery({
    queryKey: [`/api/projects/${id}`],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return (
    <DashboardLayout>
      <Helmet>
        <title>{project ? `${project.name} - Argo Mobile` : "Detalhes do Projeto - Argo Mobile"}</title>
        <meta name="description" content="Detalhes e gerenciamento do projeto de game." />
      </Helmet>
      <ProjectDetail projectId={id} />
    </DashboardLayout>
  );
};

export default ProjectDetailPage;
