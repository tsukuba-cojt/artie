"use client";

import { useTheme } from "@mui/material";
import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import BasicTab from "@/features/works/components/BasicTab";
import ArtistTab from "./ArtistTab";
import TipsTab from "./TipsTab";
import DiscussionTab from "./DiscussionTab";

const SlidingTabs = () => {
  const theme = useTheme();

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newValue: number
  ): void => {
    setActiveTab(newValue);
  };

  const tabs = [
    { label: "基本情報", component: <BasicTab /> },
    { label: "作者について", component: <ArtistTab /> },
    { label: "豆知識", component: <TipsTab /> },
    { label: "ディスカッション", component: <DiscussionTab /> },
  ];
  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        left: "50%",
        transform: "translateX(-50%)",
        overflowX: "hidden",
      }}
    >
      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        textColor="inherit"
        TabIndicatorProps={{
          style: {
            backgroundColor: theme.palette.accent.main,
            height: "3px",
          },
        }}
        sx={{
          "& .MuiTabs-scroller": {
            overflowX: "auto",
          },
          "& .MuiTab-root": {
            whiteSpace: "nowrap",
            fontWeight: "bold",
            color: "grey.700",
            "&.Mui-selected": { color: "common.black" },
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            id={`tab-${index}`}
            aria-controls={`tabpanel-${index}`}
          />
        ))}
      </Tabs>

      {/* Tab Content */}
      <Box
        id={`tabpanel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        sx={{ padding: "20px", textAlign: "center", color: "#333" }}
      >
        {tabs[activeTab].component}
      </Box>
    </Box>
  );
};

export default SlidingTabs;
