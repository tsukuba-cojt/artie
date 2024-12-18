"use client"; // Ensures the component is client-side for Next.js 13+
import { useTheme } from "@mui/material";
import { SetStateAction, useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import BasicTab from "@/features/works/components/BasicTab";
import ArtistTab from "./ArtistTab";
import TipsTab from "./TipsTab";
import DiscussionTab from "./DiscussionTab";

const SlidingTabs = () => {
  const theme = useTheme();

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: any, newValue: SetStateAction<number>) => {
    setActiveTab(newValue);
  };

  const tabs = ["基本情報", "作者について", "豆知識", "ディスカッション"];
  const content = [<BasicTab />, <ArtistTab />, <TipsTab />, <DiscussionTab />];

  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable" /* Enables horizontal scrolling */
        scrollButtons="auto" /* Show scroll buttons if necessary */
        textColor="inherit"
        TabIndicatorProps={{
          style: {
            backgroundColor: theme.palette.accent.main, // Red sliding bar
            height: "3px",
          },
        }}
        sx={{
          "& .MuiTabs-scroller": {
            overflowX: "auto", // Enables scrolling outside the screen width
          },
          "& .MuiTab-root": {
            whiteSpace: "nowrap", // Prevent tabs from breaking into a new line
            fontWeight: "bold",
            color: "#bbb",
            "&.Mui-selected": { color: "#333" },
          },
        }}
      >
        {tabs.map((label, index) => (
          <Tab key={index} label={label} />
        ))}
      </Tabs>

      {/* Tab Content */}
      <Box sx={{ padding: "20px", textAlign: "center", color: "#333" }}>
        <Typography>{content[activeTab]}</Typography>
      </Box>
    </Box>
  );
};

export default SlidingTabs;
