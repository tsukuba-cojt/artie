"use client";

import React, { JSX } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { Box, IconButton, Stack, useTheme } from "@mui/material";
import NavigationBarSVG from "./NavigationBarSVG";

type NavItem = {
  label: string;
  icon: JSX.Element | null;
  route: string;
  fontFamily: string;
  fontWeight: string;
  isSpecial?: boolean;
};

type NavigationBarProps = {
  onItemSelect?: (label: string) => void;
};

const NavigationBar: React.FC<NavigationBarProps> = ({ onItemSelect }) => {
  const theme = useTheme();

  const items: NavItem[] = [
    {
      label: "Home",
      icon: <Icon icon="lucide:home" style={{ fontSize: "24px" }} />,
      route: "./home",
      fontFamily: "SF Pro Text",
      fontWeight: "400",
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
      label: " ",
      icon: null,
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
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        bottom: "5px",
        position: "fixed",
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          width: "393px",
          height: "107px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-end",
          zIndex: 1000,
        }}
      >
        {/* SVG Background */}
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        >
          <NavigationBarSVG width={"100%"} fill={theme.palette.accent.main} />
        </Box>

        <Stack
          sx={{
            height: "75px",
            width: "393px",
            allignItems: "center",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          {/* Icons and Circles */}
          {items.map((item, index) => (
            <Box
              key={index}
              sx={{
                height: "75px",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link href={item.route} passHref>
                {item.isSpecial ? (
                  <Box
                    sx={{
                      position: "relative",
                      bottom: "60px",
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {/* Beige Circle */}
                    <Box
                      sx={{
                        width: "56px",
                        height: "56px",
                        backgroundColor: "primary.main",
                        boxShadow: "0px 4px 12px #853536",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        zIndex: 2,
                      }}
                    >
                      <Icon
                        icon="lets-icons:user-scan"
                        style={{
                          fontSize: "24px",
                          color: theme.palette.secondary.main,
                        }}
                      />
                    </Box>
                  </Box>
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
                  color: "primary.main",
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
        </Stack>
      </Box>
    </Box>
  );
};

export default NavigationBar;
