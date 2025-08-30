import React, { useState } from "react";
import FiltersPanel from "../components/FiltersPanel";
import SummaryCardsContainer from "../components/SummaryCardsContainer";
import MapView from "../components/MapView";
import TimeSeriesChart from "../components/TimeSeriesChart";
import CategoryPieChart from "../components/CategoryPieChart";
import Leaderboard from "../components/Leaderboard";
import BadgesOverview from "../components/BadgesOverview";
import RecentIncidents from "../components/RecentIncidents";
import DashboardHeader from "../components/DashboardHeader.tsx";

const Dashboard: React.FC = () => {
    const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
        start: null,
        end: null,
    });
    const [incidentType, setIncidentType] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-10">
            <DashboardHeader />

            {/* Filters */}
            <div className="mb-12">
                <FiltersPanel
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                    incidentType={incidentType}
                    setIncidentType={setIncidentType}
                />
            </div>

            {/* Summary Cards */}
            <div className="mb-14">
                <SummaryCardsContainer dateRange={dateRange} incidentType={incidentType} />
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Map Section */}
                <section
                    className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8 h-[750px]
  flex flex-col overflow-hidden transition-transform transform hover:scale-[1.02] duration-300 ease-in-out"
                    aria-label="Geotagged Incident Map"
                >
                    <MapView dateRange={dateRange} incidentType={incidentType} />
                </section>

                {/* Analytics & Gamification */}
                <aside className="space-y-12 flex flex-col">
                    <div className="bg-white rounded-3xl shadow-xl p-8 h-[350px] transition-shadow hover:shadow-2xl">
                        <TimeSeriesChart dateRange={dateRange} incidentType={incidentType} />
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-8 h-[350px] transition-shadow hover:shadow-2xl">
                        <CategoryPieChart dateRange={dateRange} incidentType={incidentType} />
                    </div>

                    <div
                        className="bg-white rounded-3xl shadow-xl p-6 overflow-auto max-h-72 transition-shadow hover:shadow-2xl"
                        aria-label="Top Contributors Leaderboard"
                    >
                        <Leaderboard />
                    </div>

                    <div
                        className="bg-white rounded-3xl shadow-xl p-6 transition-shadow hover:shadow-2xl"
                        aria-label="Community Badges Overview"
                    >
                        <BadgesOverview />
                    </div>
                </aside>
            </div>

            {/* Recent Incidents Feed */}
            <section
                className="bg-white rounded-3xl shadow-xl p-8 mt-16 max-h-[420px] overflow-y-auto
          transition-transform transform hover:scale-[1.01] duration-300 ease-in-out"
                aria-label="Recent Incident Reports Feed"
            >
                <RecentIncidents dateRange={dateRange} incidentType={incidentType} />
            </section>
        </div>
    );
};

export default Dashboard;
