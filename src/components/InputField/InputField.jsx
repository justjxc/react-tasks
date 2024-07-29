import InvalidInputMessage from '../InvalidInputMessage/InvalidInputMessage';

const InputField = ({ type, id, label, value, setValue, placeholder, isTriggered, isValid, setValueValidation, validateInput, invalidMessage }) => {
	const handleChange = e => {
		setValue(e.target.value);

		validateInput(e.target, setValueValidation);
	};

	return (
		<div className='flex flex-col justify-between items-center w-full'>
			<div className='flex flex-col justify-between gap-4 w-full'>
				<label className='w-[100px]' htmlFor={id}>
					{label}
				</label>

				<input
					id={id}
					className='text-black p-2 outline-none w-full border-2 border-neutral-300 rounded-lg focus:border-neutral-500'
					onBlur={e => validateInput(e.target, setValueValidation)}
					type={type}
					value={value}
					onChange={e => handleChange(e)}
					placeholder={placeholder}
				/>
			</div>

			{isTriggered && !isValid && <InvalidInputMessage message={invalidMessage} />}
		</div>
	);
};

export default InputField;
