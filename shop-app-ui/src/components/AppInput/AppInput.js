import React from 'react';
import {
	Box, TextField, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Checkbox, InputLabel, InputBase, Select, MenuItem
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useStyles } from './AppInput.styles';
import { useForm, Controller } from "react-hook-form";

const BootstrapInput = withStyles((theme) => ({
	root: {
		'label + &': {
			// marginTop: theme.spacing(3),
		},
	},
	input: {
		borderRadius: 4,
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0,
		position: 'relative',
		backgroundColor: theme.palette.background.paper,
		border: '1px solid #ced4da',
		fontSize: 16,
		padding: '17.5px 14px',
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		// Use the system font instead of the default Roboto font.
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
		'&:focus': {
			borderRadius: 4,
			borderColor: '#80bdff',
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
		},
	},
}))(InputBase);

export default function AppInput({ field = {}, control, className = '', component = {}, options = [] }) {
	const classes = useStyles();
	const { radio, selectBox, checkbox, textField } = component;

	const RenderLabel = ({ label = '', labelClass }) => {
		const arrClasses = [];
		arrClasses.push(className)
		if (label === '') {
			arrClasses.push(classes.labelSpace)
		} else {
			arrClasses.push(classes.labelBorder)
		}
		if (field?.required) {
			arrClasses.push(classes.labelRequired)
		}
		return (
			<Typography className={[...arrClasses].join(' ')} style={{ ...labelClass }}>{label}</Typography>
		)
	}

	const RenderInput = (component = { radio: false, selectBox: false, checkbox: false, textField: false }) => {
		// tham khảo cách này
		// const elm = {
		//     radio: <></>,
		//     checkbox: <></>
		// }
		// return elm[control]

		return radio && (
			<Controller
				control={control}
				name={field.id}
				defaultValue=""
				render={({ field: { onChange, value } }) => {
					return (
						<FormControl component="fieldset" className={[classes.marginLeft, classes.boxInput].join(' ')}>
							<RadioGroup className={classes.row} aria-label="gender" name="gender1" value={value} onChange={onChange}>
								{options.map((op, idx) => (
									<FormControlLabel key={idx + 'item-radio-' + op.id} value={op.id} control={<Radio color="primary" />} label={op.label} />
								))}
							</RadioGroup>
						</FormControl>)
				}}
			/>)
			|| selectBox && (
				<Controller
					control={control}
					name={field.id}
					defaultValue={false}
					render={({ field: { onChange, value } }) => {
						return (
							<FormControl component="fieldset" className={[classes.marginLeft, classes.boxInput].join(' ')}>
								{/* <InputLabel htmlFor="demo-customized-select-native">Age</InputLabel> */}
								<Select
									disabled={field?.disabled || false}
									labelId="demo-customized-select-label"
									id="demo-customized-select"
									value={value}
									onChange={onChange}
									input={<BootstrapInput />}
								>
									{options.map((op, idx) => (
										<MenuItem value={op[field.id]} key={idx + 'item-select-box' + op.id}>{op.name}</MenuItem>
										// <FormControlLabel key={idx + 'item-radio-' + op.id} value={op.id} control={<Radio color="primary" />} label={op.label} />
									))}
								</Select>
							</FormControl>
						)
					}}
				/>)
			|| checkbox && (
				<Controller
					control={control}
					name={field.id}
					defaultValue={false}
					render={({ field: { onChange, value } }) => {
						return (
							<FormControl component="fieldset" className={[classes.marginLeft, classes.boxInput].join(' ')}>
								<FormControlLabel
									value={value}
									label={field.label?.title}
									control={<Checkbox color="primary" onChange={onChange} name={field.id} />}
								/>
							</FormControl>
						)
					}}
				/>)
			|| textField && (
				<Controller
					control={control}
					name={field.id}
					defaultValue=""
					render={({ field: { onChange, value } }) => {
						const _more = {};
						if (field?.multiline) {
							_more.multiline = true;
							_more.rows = field.rows
						}
						if (field?.required) {
							_more.required = true;
						}
						return (
							<FormControl component="fieldset" className={classes.boxInput}>
								<TextField
									control={control}
									value={value}
									onChange={onChange}
									variant="outlined"
									InputLabelProps={{
										shrink: true,
									}}
									type={field?.type || 'text'}
									fullWidth
									{..._more}
								/>
							</FormControl>
						)
					}}
				/>
			)
	}

	return (
		<Box className={classes.row}>
			<RenderLabel label={field.label?.title} labelClass={field?.labelClass} />
			<RenderInput component={component} />
		</Box>
	)
}