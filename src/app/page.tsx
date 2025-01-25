"use client";

import React, { useState } from "react";
import { IconButton, Stack } from "@mui/material";
import Header from "@/features/base/components/header";
import ProfileCard from "@/features/home/components/ProfileCard";
import Sidebar from "@/features/home/components/Sidebar";
import { Icon } from "@iconify/react";
import PickUpWork from "@/features/home/components/PickUpWork";
import { theme } from "./thema";
import FavoritesCard from "@/features/home/components/FavoritesCard";

export default function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <Stack flexDirection="column" height="100dvh">
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
        <Stack
          flexDirection="column"
          sx={{
            overflowX: "auto",
          }}
          width="100%"
          gap={2}
          pb="113px"
        >
          <ProfileCard />
          <PickUpWork />
          <FavoritesCard />
        </Stack>
      </Stack>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </>
  );
}
