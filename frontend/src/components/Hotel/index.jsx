import { QuerySchema } from "schema";
import { Form, Input } from "components/Form";
import { useGlobalContext } from "hooks";
import { useState, useRef } from "react";
import { getErrorMessage } from "utils";
import { useAuthControls } from "hooks/useAuthControls";
import { Box, Button, Card, Typography, useTheme, Grid, Fab, TextField } from "@mui/material";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import LinearProgress from '@mui/material/LinearProgress';
import { request } from "api";
import { DataGrid } from '@mui/x-data-grid';
import SendIcon from '@mui/icons-material/Send';


const getMenu = async (hotelName) => {
    console.log('"Making Initial request');
    const hotel = await request({ method: "POST", url: '/getMenu', data: { "hotel": hotelName } })
    return (hotel)
}

// const useFocus = () => {
//     const htmlElRef = useRef(null)
//     const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }

//     return [htmlElRef, setFocus]
// }

export default function Hotel(props) {
    const { hotelName } = props
    const [error, setError] = useState(null);
    const { setPageLoading } = useGlobalContext();
    const { login } = useAuthControls();
    const theme = useTheme()
    const queryClient = useQueryClient()
    // const tableRef = useRef(null)
    // const [inputRef, setInputFocus] = useFocus()
    const mutation = useMutation({
        mutationFn: async (query) => {
            const newMenu = await request({ method: "POST", url: '/filterData', data: query })
            return (newMenu)
        },
        onSuccess: (data) => {
            console.log('Current Data on Cache ', (queryClient.getQueryData({ queryKey: 'mainMenu' })).data);
            console.log('new Fetched Data', data.data);
            try {
                queryClient.setQueryData(["mainMenu"], (oldData) => {
                    console.log("The data being returned", oldData, {
                        ...oldData,
                        data: {
                            items: data.data.items
                        }
                    })
                    return {
                        ...oldData,
                        data: {
                            items: data.data.items
                        }
                    }
                });
                console.log('New Data on Cache : ', (queryClient.getQueryData({ queryKey: ['mainMenu'] })).data);
            }
            catch (error) { console.log('"Not able to setttt', error); }
        }
    })
    const mainMenu = useQuery({ queryKey: ["mainMenu"], queryFn: () => getMenu(hotelName), select: (data) => data.data }, { staleTime: Infinity })

    if (mainMenu.isLoading) {
        console.log('Loadinngggg');
        <h1>Loading ...</h1>
    }
    if (mainMenu.isError) {
        console.log('Eroorrrrr', mainMenu.error);
        <h1>Error..</h1>
    }
    if (mainMenu.isSuccess) {
        console.log('askdjhakdjhadkjashdjk', mainMenu.data);
    }


    const handleSubmit = (data) => {
        console.log('Submitted Query', data.query);
        mutation.mutate({ data: data.query, hotel: hotelName })
        // tableRef.current.focus()
        // setInputFocus()
    }

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 150,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 550,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'calories',
            headerName: 'Calories',
            width: 150,
            headerAlign: 'center',
            align: 'center',
        }
    ]
    return (<>
        <Typography variant="h3" gutterBottom>
            {hotelName}
        </Typography>
        <Box sx={{ height: 600, width: '95%' }}>
            <DataGrid
                slots={{
                    loadingOverlay: LinearProgress,
                }}
                loading={mutation.isLoading}
                rows={mainMenu.data?.items || []}
                columns={columns}
            />
        </Box >
        <Form schema={QuerySchema} onSubmit={handleSubmit}>
            <Grid container style={{ padding: '20px' }}>
                <Grid item xs={11}>
                    <Input name="query" label="User Query" fullWidth />
                </Grid>
                <Grid xs={1} align="right">
                    <Fab onClick={() => { console.log('Fabbb Clickeddd'); }} type="submit" color="primary" aria-label="add"><SendIcon /></Fab>
                </Grid>
            </Grid>
            {error && <p>{error}</p>}
        </Form>
    </>
    );
}
