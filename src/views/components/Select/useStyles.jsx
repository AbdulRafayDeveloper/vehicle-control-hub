import { useTheme } from '@mui/system';

function useGenerateStyles(touched, error) {
  const theme = useTheme();
  return {
    control: (baseStyles, state) => ({
      ...baseStyles,
      height: '40px',
      fontFamily: 'Roboto',
      background: state.isDisabled ? theme.palette.dim.main : 'transparent',
      borderColor:
        touched && error ? theme.palette.error.main : theme.palette.dim.light
      
    }),
    menu: baseStyles => ({
      ...baseStyles,
      zIndex: 9999,
      fontFamily: 'Roboto',
      fontSize: '16px'
    }),
    placeholder: baseStyles => ({
      ...baseStyles
    })
  };
}

export default useGenerateStyles;
