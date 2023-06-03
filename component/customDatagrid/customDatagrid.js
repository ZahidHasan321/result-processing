import {
    DataGrid,
    GridFooter,
    GridFooterContainer,
    gridPageCountSelector,
    gridPageSelector, useGridApiContext,
    useGridSelector
} from '@mui/x-data-grid';
import * as React from 'react';

import { Grow, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { styled } from '@mui/material/styles';
import BasicSelect from '../selector/selector';



const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    border: 1,
    color:
        theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnsContainer': {
        backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
    },
    '& .MuiDataGrid-iconSeparator': {
        display: 'none',
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
        borderRight: `1px solid ${theme.palette.mode === 'light' ? '#e0e0e0' : '#303030'
            }`,
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
        borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
            }`,
        borderLeft: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
            }`,
    },
    '& .MuiDataGrid-cell': {
        color:
            theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
    },
    '& .MuiPaginationItem-root': {
        borderRadius: 5,
    },
    '& .MuiDataGrid-cell--editing': {
        backgroundColor: theme.palette.mode === 'dark' ? '#376331' : 'rgb(217 243 190)',
    },
    '& .MuiDataGrid-booleanCell[data-value="true"]': {
        color: theme.palette.success.main
    },
    '& .MuiDataGrid-booleanCell[data-value="false"]': {
        color: theme.palette.error.main
    }
}));

function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <Pagination
            color="primary"
            variant="outlined"
            shape="rounded"
            page={page + 1}
            count={pageCount}
            // @ts-expect-error
            renderItem={(props2) => <PaginationItem {...props2} disableRipple />}

            onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
    );
}

function CustomFooter(pageSize) {
    const apiRef = useGridApiContext();
    const [rowCount, setRowCount] = React.useState(10);
    React.useEffect(() => {
        apiRef.current.setPageSize(10);
    }, [])

    const rowsize = [
        { id: 10, name: '10' },
        { id: 20, name: '20' },
        { id: 30, name: '30' },
        { id: 50, name: '50' },
        { id: 10000, name: 'All' }
    ]
    const onSizeChange = (value) => {
        setRowCount(value);
        apiRef.current.setPageSize(value);
    }
    return (
        <GridFooterContainer>
            <Typography fontSize={14} sx={{ ml: 'auto', mr: 2 }}>Rows Per Page:</Typography>
            <BasicSelect sx={{ width: 'auto', mr: 5, bgcolor: 'ghostwhite', height: 'auto' }} variant={'standard'} value={rowCount} list={rowsize} onChange={(value) => { onSizeChange(value) }} />
            <GridFooter sx={{
                border: 'none', // To delete double border.
            }} />
        </GridFooterContainer>
    );
}


export default function AntDesignGrid(props) {
    const { checked, rows, columns, component, ...restProps } = props;

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Grow in={checked}>
                <StyledDataGrid

                    {...restProps}
                    disableSelectionOnClick
                    components={{
                        Pagination: CustomPagination,
                        Footer: CustomFooter,
                        ...component
                    }}
                    columns={columns}
                    rows={rows}
                />
            </Grow>
        </div>
    );
}