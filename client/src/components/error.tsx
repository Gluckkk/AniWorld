import { Box, Typography, useTheme } from "@mui/material";
export interface ErrorType {
  message: string;
}

const Error = (values: ErrorType) => {
  const theme = useTheme();
  return (
    <Box color={theme.palette.accent.main} width="100%" textAlign="center">
      <Typography variant="h1">Sorry, something went wrong</Typography>
      <Typography variant="h3">{values.message}</Typography>
    </Box>
  );
};

export default Error;
