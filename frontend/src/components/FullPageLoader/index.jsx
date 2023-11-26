import { Box, CircularProgress } from '@mui/material'

export default function FullPageLoader() {
    return (
        <>
            <Box />
            <Box
                sx={{
                    position: "fixed",
                    top: "50%",
                    left: "44%",
                }}
            >
                <CircularProgress size={50} />
            </Box>
        </>

    )
}
