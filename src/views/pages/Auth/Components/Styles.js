import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery"; 

export const AuthMainContainer = styled(Box)({
  // height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  // maxHeight: '100vh',
  // background: "linear-gradient(291deg, rgba(41,157,223,1) 0%, rgba(33,197,223,1) 40%, rgba(33,197,223,1) 100%);",
});

export const AuthSection = styled(Paper)(({ theme }) => ({
  width: useMediaQuery(theme.breakpoints.up("md")) ? "45vw" : "70vw", 
  padding: "2.5rem 3rem",
  // border: ".5px solid #ccc",
  // ".css-mhc70k-MuiGrid-root>.MuiGrid-item": {
  //   paddingLeft: "0px",
  // },
  // background: "linear-gradient(291deg, rgba(41,157,223,1) 0%, rgba(33,197,223,1) 40%, rgba(33,197,223,1) 100%);",
}));

export const FormContainer = styled(Box)({
  width: "100%",
});

export const AuthFooter = styled(Stack)(({ theme , justifyContent }) => ({
  flexDirection: "row",
  display: "flex",
  justifyContent: justifyContent ? 'flex-end' : 'space-between',
  alignItems: "center",
  marginTop: theme.spacing(1),
}));

 export const StyledCheckboxStack = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  }));
  
  export const AuthTitle = styled(Typography)({
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    margin:'1rem 0',
    // padding: '0 .3rem',
    fontWeight: 500
  });

  export const AuthImg = styled(Grid)(({ theme })=>({
    display: "flex",
    justifyContent: "center",
    height: '100px', 
    "& img": {
      height: useMediaQuery(theme.breakpoints.down("md"))  ?  '80%' : 'auto', 

    },
  }));

  export const AuthSectionTwo = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // width: useMediaQuery(theme.breakpoints.up("md")) ? "30vw" : "70vw", 
    padding: "4rem",
  }));
  export const Container = styled(Box)(({
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "4rem",
  }));

 export  const FormWrapper = styled(Box)(({
    width: "100%",
    backgroundColor: "transparent",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
    color: "black",
  }));
  export const FormWrapperLogin = styled(Box)(({
    width: "600px",
    backgroundColor: "transparent",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
    color: "white",
  }));