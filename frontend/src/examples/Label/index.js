import { Typography, Box, colors } from '@mui/material';

export const Label = (props) => {
  const { required, children } = props;
  return (
    <>
      <Typography component="label" variant="body1">
        {children}{' '}
        {required && (
          <Box component="span" sx={{ color: colors.red['700'] }}>
            (*)
          </Box>
        )}
      </Typography>
    </>
  );
};
