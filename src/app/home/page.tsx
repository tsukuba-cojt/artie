"use client";

import React, { useState } from "react";
import { IconButton, Stack } from "@mui/material";
import Header from "@/features/base/components/header";
import ProfileCard from "@/features/home/components/ProfileCard";
import Sidebar from "@/features/home/components/Sidebar";
import { Icon } from "@iconify/react";
import { theme } from "../thema";
import PickUpWork from "@/features/home/components/PickUpWork";

export default function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <Stack flexDirection="column" height="100dvh" px={2} gap={2}>
        <Header
          title="Home"
          rightReactNode={
            <IconButton onClick={toggleSidebar} aria-label="open sidebar">
              <Icon
                icon="mdi:settings-outline"
                width="30"
                height="30"
                color={theme.palette.grey[700]}
              />
            </IconButton>
          }
        />
        <ProfileCard />
        <PickUpWork />
      </Stack>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </>
  );
}
