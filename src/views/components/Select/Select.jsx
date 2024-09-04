import React, { Fragment } from 'react';
import Select, { components } from 'react-select';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MUIButton from '../Button/MUIButton';
import useGenerateStyles from './useStyles';
import { CircularProgress, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const CustomSelect = ({ touched, error, loading, onSelect, editClick, ...otherProps }) => {
  const styles = useGenerateStyles(touched, error);
  return (
    <>
      <Select
        {...otherProps} // other props like multi searchable etc
        isLoading={loading}
        isSearchable={true}
        selectProps={{ onSelect }}
        components={{ Menu, Option: props => <Option {...props} editClick={editClick}/>  }} // customize menu and options
        styles={styles}
      />
      {error && (
        <Box mt={'4px'}>
          <Typography color='error' variant='caption' className='Mui-error'>
            {error ? error : null}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default CustomSelect;

export const Menu = props => { 
  return (
    <Fragment>
      <components.Menu {...props}>
        <Box>
          {props.selectProps.creatable &&
            typeof props.selectProps.onCreateOption === 'function' &&
            props.selectProps.inputValue && (
              <Option {...props} /> // This option is only shown if select is creatable and search string has some text
            )}
          <Box>{props.children}</Box>
          {
            // show all the other options
          }
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {props.selectProps.loading ? (
              <CircularProgress style={{ height: '25px', width: '25px' }} /> // show loader at the bottom of options if api is fetching data
            ) : (
              <>
                {
                  props.selectProps.configureButton &&
                    props.selectProps.configureButton
                  // show random configuratin buttons at the bottom of menu if user sets the configureButton prop
                }
              </>
            )}
          </Box>
        </Box>
      </components.Menu>
    </Fragment>
  );
};

export const Option = props => {
  return (
    <Fragment>
      {typeof props.children !== 'string' ? ( // show the create option button if select is creatable and user types option label
        <MUIButton
          variant={'outlined'}
          onClick={() => {

            props.selectProps.onCreateOption(props.selectProps.inputValue)
          }
          }
          sx={{ width: '100%' }}>
          {'Create ' + props.selectProps.inputValue}
        </MUIButton>
      ) : (
        <>
          {typeof props.children === 'string' && ( // show simple options if user is not typing
            <components.Option  {...props}>
              <Box  p={0} m={0} sx={{ display:  "flex", justifyContent: 'space-between'}}>
                {props.children}
            </Box>
            </components.Option>
          )}
        </>
      )}
    </Fragment>
  );
};
