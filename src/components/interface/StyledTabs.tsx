import React, { FunctionComponent } from 'react';
// import { useTheme } from '@mui/material/styles';

import {
  Box,
  Tab,
  Tabs
} from '@mui/material';

type Props = {
  value: number;
  onChange: (n:number) => void;
  tabs: (string|React.ReactNode)[];
};

export const StyledTabs: FunctionComponent<Props> = ({value, onChange, tabs}) => {
  // const theme = useTheme();

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={value}
        onChange={(e, newTab) => {
          onChange(newTab);
        }}
      >
        {tabs.map((t, i) => (<Tab label={t} id={`tab-${i}`} key={`tab-${i}`} aria-controls={`tabpanel-${i}`} />))}
      </Tabs>
    </Box>
  );
}