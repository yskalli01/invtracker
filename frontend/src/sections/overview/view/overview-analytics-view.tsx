// import { _user } from "src/_mock";
import { roleViews } from "../config";
import { DashboardContent } from "src/layouts/dashboard";
import { Typography } from "@mui/material";
import { useAuth } from "src/context/auth-context";

export function OverviewAnalyticsView() {
  const { user } = useAuth();
  const View = roleViews[user?.role as keyof typeof roleViews];
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, Welcome back {user?.name} 👋
      </Typography>
      <View />
    </DashboardContent>
  );
}
