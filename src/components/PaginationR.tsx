import React from 'react';
import "@/styles/index.css"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
const PaginationR: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div>
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          variant="outlined"
          shape="rounded"
          onChange={(_event, page) => onPageChange(page)}
          sx={{
            '& .MuiPaginationItem-page': {
              color: '#0D93F2', // Couleur des nombres
            },
            '& .MuiPaginationItem-root': {
              backgroundColor: '#081028', // Couleur de fond
            },
          }}
        />
      </Stack>
    </div>
  );
}

export default PaginationR;
