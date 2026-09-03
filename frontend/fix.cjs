const fs = require("fs");

function replaceAll(file, search, replace) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, "utf8");
    content = content.split(search).join(replace);
    fs.writeFileSync(file, content);
  }
}
replaceAll("src/pages/public/StudentDashboardPage/StatsCards.tsx", "fontWeight={600}", "sx={{ fontWeight: 600 }}");
replaceAll("src/pages/public/StudentDashboardPage/StatsCards.tsx", "s.id === user?.id", "s.id === Number(user?.id)");
replaceAll("src/pages/company/CompanyInternsPage/CompanyInternsPage.tsx", "fontWeight={600}", "sx={{ fontWeight: 600 }}");
replaceAll("src/pages/company/CompanyInternsPage/CompanyInternsPage.tsx", "mt={0.5}", "sx={{ mt: 0.5 }}");
replaceAll("src/pages/company/CompanyInternsPage/CompanyInternsPage.tsx", "justifyContent=\"space-between\"\n          alignItems={{ xs: \"flex-start\", sm: \"center\" }}", "sx={{ justifyContent: \"space-between\", alignItems: { xs: \"flex-start\", sm: \"center\" } }}");
replaceAll("src/pages/company/CompanyInternsPage/CompanyInternsPage.tsx", "direction=\"row\"\n                    alignItems=\"center\"", "direction=\"row\"\n                    sx={{ alignItems: \"center\" }}");
replaceAll("src/pages/company/CompanyDashboardPage/CompanyDashboardPage.tsx", "fontWeight={600}", "sx={{ fontWeight: 600 }}");
replaceAll("src/pages/company/CompanyDashboardPage/CompanyDashboardPage.tsx", "fontWeight={500}", "sx={{ fontWeight: 500 }}");
replaceAll("src/pages/public/opportunitiesDetail/OpportunityDetailsPage.tsx", "opp.id === id", "opp.id === Number(id)");
replaceAll("src/pages/shared/NotificationsPage/NotificationsPage.tsx", "const [loading, setLoading] = useState(true);", "");
replaceAll("src/pages/shared/NotificationsPage/NotificationsPage.tsx", "setLoading(false);", "");
replaceAll("src/pages/shared/NotificationsPage/NotificationsPage.tsx", "TYPE_META[n.type]", "TYPE_META[n.type as keyof typeof TYPE_META]");
replaceAll("src/pages/student/InternshipRequestPage/InternshipRequestPage.tsx", "const { user } = useAuth();", "const { } = useAuth();");
replaceAll("src/pages/supervisor/CompanyManagementPage/CompanyManagementPage.tsx", "(event: React.SyntheticEvent, newValue: number)", "(_event: React.SyntheticEvent, newValue: number)");
replaceAll("src/pages/supervisor/StudentRow.tsx", "import { useState, useEffect } from \"react\";", "import { useState } from \"react\";");
replaceAll("src/pages/supervisor/StudentDetailPage.tsx", "(step) =>", "(step: any) =>");
replaceAll("src/pages/supervisor/StudentDetailPage.tsx", "(report) =>", "(report: any) =>");
replaceAll("src/pages/supervisor/StudentDetailPage.tsx", "(internship, index) =>", "(internship: any, index: number) =>");
replaceAll("src/pages/HoursPage/HoursPage.tsx", "const [loading, setLoading] = useState(true);", "");
replaceAll("src/pages/HoursPage/HoursPage.tsx", "setLoading(false);", "");
replaceAll("src/pages/HoursPage/HoursPage.tsx", "(prev) => prev.map", "(prev: any) => prev.map");

