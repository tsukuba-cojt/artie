"use client";

import React from "react";
import { Button } from "@mui/material";

interface CustomButtonProps {
  label: string;
  onClick: () => void;
  color?: "primary" | "secondary" | "success" | "error" | "warning" | "info";
  size?: "small" | "medium" | "large";
  variant?: "contained" | "outlined" | "text";
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  color = "primary",
  size = "medium",
  variant = "contained",
}) => {
  return (
    <Button color={color} size={size} variant={variant} onClick={onClick}>
      {label}
    </Button>
  );
};

export default CustomButton;
