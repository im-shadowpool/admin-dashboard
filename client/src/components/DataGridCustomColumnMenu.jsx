import React from 'react'
import { GridColumnMenuContainer, GridColumnMenuFilterItem, GridColumnMenuHideItem } from '@mui/x-data-grid'

export const CustomColumnMenu = (props) => {
    const {hideMenu, colDef, open } = props;
    console.log(colDef);
  return (
    <GridColumnMenuContainer
    hideMenu={hideMenu}
    colDef={colDef}
    open={open}
    
    >
        <GridColumnMenuFilterItem onClick={hideMenu} colDef={colDef } />
        <GridColumnMenuHideItem onClick={hideMenu} colDef={colDef} />

    </GridColumnMenuContainer>
  )
}
