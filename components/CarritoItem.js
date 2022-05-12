import { IconButton, ListItem, ListItemText, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { CarritoContext } from './Carrito';

const CarritoItem = ({data}) => {
	const {carrito, setCarrito} = useContext(CarritoContext)

	const updateItem = ({target}) => {
		setCarrito(carritoPrev => carritoPrev.map((item) => {
			if (item.slug === data.slug) {
            item.cantidad = target.value;
          }
          return item;
		}))
	}

	const removeItem = () => {
		setCarrito(carritoPrev => carritoPrev.filter((item) => item.slug !== data.slug))
	}

	return (
		<ListItem
			disableGutters
			secondaryAction={
				<Box edge="end" display={"flex"} gap={5}>
					<TextField
						sx={{width: 75}}
						type={"number"}
						size="small"
						value={data.cantidad}
						onChange={updateItem}
						InputProps={{
							inputProps: {min: 1}
						}}
					/>
					<IconButton color="error" aria-label="delete" onClick={removeItem}>
						<DeleteIcon />
					</IconButton>
				</Box>
			}
		>
			<ListItemText
				primary={data.titulo}
				secondary={`$${data.precio.toFixed(2)}`}
			/>
		</ListItem>
	)
}

export default CarritoItem