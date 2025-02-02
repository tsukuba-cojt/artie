// components/FloatingAudioToggle.tsx
"use client";

import React from "react";
import { Fab, Box, Tooltip } from "@mui/material";
import { Icon } from "@iconify/react";
import useUserSettings from "@/features/auth/hooks/useUserSettings";
import { theme } from "@/app/thema";

const FloatingAudioToggle: React.FC = () => {
  const { settings, updateSettings } = useUserSettings();

  const handleToggle = () => {
    updateSettings({ autoPlayAudioGuide: !settings.autoPlayAudioGuide });
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "170px",
        right: "20px",
        zIndex: 1000,
      }}
    >
      <Tooltip title="音声ガイドの自動再生を切り替え">
        <Fab
          onClick={handleToggle}
          sx={{
            backgroundColor: theme.palette.grey[300],
            color: "text.primary",
            width: 56,
            height: 56,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {settings.autoPlayAudioGuide ? (
            <Icon icon="mdi:volume-high" width={24} height={24} />
          ) : (
            <Icon icon="mdi:volume-off" width={24} height={24} />
          )}
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default FloatingAudioToggle;
