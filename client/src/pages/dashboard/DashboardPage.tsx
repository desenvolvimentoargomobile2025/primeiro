import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardHome from "@/components/dashboard/DashboardHome";
import { Helmet } from "react-helmet";

const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout title="Dashboard">
      <Helmet>
        <title>Dashboard - Argo Mobile</title>
        <meta name="description" content="Dashboard do sistema de gerenciamento de projetos da Argo Mobile." />
      </Helmet>
      <DashboardHome />
    </DashboardLayout>
  );
};

export default DashboardPage;
