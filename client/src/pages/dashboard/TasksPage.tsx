import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import TasksList from "@/components/dashboard/TasksList";
import { Helmet } from "react-helmet";

const TasksPage: React.FC = () => {
  return (
    <DashboardLayout>
      <Helmet>
        <title>Tarefas - Argo Mobile</title>
        <meta name="description" content="Gerencie suas tarefas em diferentes projetos de desenvolvimento de games." />
      </Helmet>
      <TasksList />
    </DashboardLayout>
  );
};

export default TasksPage;
