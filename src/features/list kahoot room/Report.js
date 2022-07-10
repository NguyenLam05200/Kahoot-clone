import { Container } from "@mui/material";
import { Box } from "@mui/system";

const Report = () => {
    return (
        <Box sx={{
            // border: "2px solid red",
            flex: "1 1 auto",
            backgroundColor: 'grey',
            zIndex: 10,
            display: 'flex'
        }}>
            <Box
                sx={{
                    width: '20%',
                    backgroundColor: 'white',
                    minHeight: '100%',
                    boxShadow: '0px 20px 5px rgba(0,0,0,0.7)',
                    zIndex: 11
                }}>
                hi</Box>

            <Box
                sx={{
                    width: '60%',
                    backgroundColor: 'white',
                    minHeight: '100%',
                    zIndex: 10
                }}>
            </Box>
            <Box
                sx={{
                    width: '20%',
                    backgroundColor: 'white',
                    minHeight: '100%',
                    boxShadow: '0px 20px 5px rgba(0,0,0,0.7), 5px -5px 0 rgba(0,0,0,1)',
                    zIndex: 11
                }}>
            </Box>
        </Box>
    )
}

export default Report;