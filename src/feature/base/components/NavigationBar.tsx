"use client";

import React, { JSX } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { Box, IconButton } from "@mui/material";
import { theme } from "@/app/thema";

type NavItem = {
  label: string;
  icon: JSX.Element | null;
  route: string;
  fontFamily: string;
  fontWeight: string;
  isSpecial?: boolean; // Flag to determine if a button has a custom design
};

type NavigationBarProps = {
  onItemSelect?: (label: string) => void;
};

const NavigationBar: React.FC<NavigationBarProps> = ({ onItemSelect }) => {
  const items: NavItem[] = [
    {
      label: "Home",
      icon: <Icon icon="lucide:home" style={{ fontSize: "24px" }} />,
      route: "./home",
      fontFamily: "SF Pro Text",
      fontWeight: "500",
    },
    {
      label: "Search",
      icon: (
        <Icon icon="icon-park-outline:search" style={{ fontSize: "24px" }} />
      ),
      route: "./search",
      fontFamily: "Helvetica",
      fontWeight: "400",
    },
    {
      label: "Scan",
      icon: null, // Special button doesn't use a standard icon
      route: "./scan",
      fontFamily: "Helvetica",
      fontWeight: "400",
      isSpecial: true,
    },
    {
      label: "Chat",
      icon: <Icon icon="wpf:chat" style={{ fontSize: "24px" }} />,
      route: "./chat",
      fontFamily: "Helvetica",
      fontWeight: "400",
    },
    {
      label: "Social",
      icon: <Icon icon="iconoir:community" style={{ fontSize: "24px" }} />,
      route: "./social",
      fontFamily: "SF Pro Text",
      fontWeight: "400",
    },
  ];

  return (
    <Box
      sx={{
        position: "fixed", // Fixes the bar at a specific position
        bottom: 0, // Positions it at the bottom of the page
        left: 0, // Ensures it spans from the left edge
        width: "100%", // Makes it span the full width of the page
        height: "100px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: theme.palette.accent.main,
        borderRadius: "16px 16px 0 0", // Optional: rounded corners at the top
        padding: "10px",
        zIndex: 1000, // Ensures it stays above other content
      }}
    >
      {items.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link href={item.route} passHref>
            {item.isSpecial ? (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  paddingTop: 14,
                  paddingBottom: 17,
                  paddingLeft: 15,
                  paddingRight: 16,
                  background: "#F9F6D3",
                  boxShadow: "0px 4px 12px #853536",
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  display: "inline-flex",
                }}
              >
                <Icon
                  icon="lucide:home"
                  style={{
                    fontSize: "24px",
                    color: theme.palette.secondary.main,
                  }}
                />
              </div>
            ) : (
              <IconButton
                onClick={() => onItemSelect && onItemSelect(item.label)}
                sx={{ color: theme.palette.primary.main }}
              >
                {item.icon}
              </IconButton>
            )}
          </Link>
          <Box
            sx={{
              color: "#F9F6D3",
              fontSize: "12px",
              fontFamily: item.fontFamily,
              fontWeight: item.fontWeight,
              marginTop: "5px",
            }}
          >
            {item.label}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default NavigationBar;
