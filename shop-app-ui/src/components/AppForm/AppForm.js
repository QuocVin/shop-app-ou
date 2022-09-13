import React from "react";
import { Grid, Box, Button } from '@material-ui/core';
import AppInput from '../AppInput/AppInput'
import { useStyles } from './AppForm.styles';

const options = [
	{ id: 'radio1', label: 'radio 1' },
	{ id: 'radio2', label: 'radio 2' },
	{ id: 'radio3', label: 'radio 3' },
	{ id: 'radio4', label: 'radio 4' },
	{ id: 'radio5', label: 'radio 5' },
]

export default function AppForm({
	fields = [],
	control,
	onGoBack = () => { },
	onGoSubmit = () => { },
	formType = '',
}) {
	const classes = useStyles();

	const RenderBoxBtn = () => {
		return (
			<Box className={classes.AppForm}>
				<Box className='row-search'>
					<Button className='btn-search btn-goback' onClick={onGoBack}>Quay về</Button>
				</Box>
				<Box >
					<Button className='btn-search btn-submit' type="submit">{formType === 'insert' ? 'Tạo mới' : 'Cập nhật'}</Button>
				</Box>
			</Box>
		)
	}

	return (
		<form onSubmit={onGoSubmit}>
			<Grid container spacing={1}>
				{fields.map((field, idx) => {
					let _xs = field?.xs ? field.xs : 6;
					// if (field.component?.radio) {
					// 	return (
					// <Grid item xs={_xs} key={idx + '-form-grip'}>
					// 	<AppInput field={field} control={control} component={field.component} options={options} />
					// </Grid>
					// 	)
					// } else
					// return (
					// 	<Grid item xs={_xs} key={idx + '-form-grip'}>
					// 		<AppInput field={field} control={control} component={field.component} />
					// 	</Grid>
					// )
					return field.component?.radio && (
						<Grid item xs={_xs} key={idx + '-form-grip'}>
							<AppInput field={field} control={control} component={field.component} options={field.options} />
						</Grid>
					)
						|| field.component?.selectBox && (
							<Grid item xs={_xs} key={idx + '-form-grip'}>
								<AppInput field={field} control={control} component={field.component} options={field.options} />
								{/* <h1>sad</h1> */}
							</Grid>
						)
						|| field.component?.textField && (
							<Grid item xs={_xs} key={idx + '-form-grip'}>
								<AppInput field={field} control={control} component={field.component} />
							</Grid>
						)
				})}
				<RenderBoxBtn />
			</Grid>
		</form>
	);

};