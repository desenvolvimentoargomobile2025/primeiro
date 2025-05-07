import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import TeamManagement from "@/components/dashboard/TeamManagement";
import { Helmet } from "react-helmet";

const TeamPage: React.FC = () => {
  return (
    <DashboardLayout>
      <Helmet>
        <title>Equipe - Argo Mobile</title>
        <meta name="description" content="Gerencie os membros da equipe e seus papéis nos projetos de desenvolvimento de games." />
      </Helmet>
      <TeamManagement />
    </DashboardLayout>
  );
};

export default TeamPage;
