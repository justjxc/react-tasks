import { useState } from 'react';
import { useAddContext } from '../../contexts/AddContext';
import InputField from '../InputField/InputField';

import addUser from '../../utils/addUser';

const AddUser = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [firstNameValidation, setFirstNameValidation] = useState({ isTriggered: false, isValid: false });
	const [lastNameValidation, setLastNameValidation] = useState({ isTriggered: false, isValid: false });
	const [emailValidation, setEmailValidation] = useState({ isTriggered: false, isValid: false });
	const [passwordValidation, setPasswordValidation] = useState({ isTriggered: false, isValid: false });

	const { setIsAddUserActive } = useAddContext();

	const validateInput = (target, setValid) => {
		setValid(prev => {
			return { ...prev, isTriggered: true };
		});

		let isValid = false;

		switch (target.id) {
			case 'firstName': {
				isValid = firstName.match(/^[а-яА-Яa-zA-Z]{2,20}$/);
				break;
			}

			case 'lastName': {
				isValid = lastName.match(/^[а-яА-Яa-zA-Z]{2,20}$/);
				break;
			}
			case 'email': {
				isValid = email.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
				break;
			}

			case 'password': {
				if (password.length > 5) isValid = true;

				break;
			}
		}

		if (!isValid) {
			target.style.border = '2px solid red';

			setValid(prev => {
				return { ...prev, isValid: false };
			});
		} else {
			target.style.border = '2px solid green';

			setValid(prev => {
				return { ...prev, isValid: true };
			});
		}
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (firstNameValidation.isValid && lastNameValidation.isValid && emailValidation.isValid && passwordValidation.isValid) {
			console.log('add user');
			addUser(email, password, firstName, lastName);

			setIsAddUserActive(prev => !prev);
		} else {
			alert('Fill all the fields');

			setFirstNameValidation(prev => {
				return { ...prev, isTriggered: true };
			});
			setLastNameValidation(prev => {
				return { ...prev, isTriggered: true };
			});
			setEmailValidation(prev => {
				return { ...prev, isTriggered: true };
			});
			setPasswordValidation(prev => {
				return { ...prev, isTriggered: true };
			});
		}
	};

	const handleClick = () => {
		setIsAddUserActive(prev => !prev);
	};

	console.log('firstNameValidation.isTriggered && !firstNameValidation.isValid', firstNameValidation.isTriggered && !firstNameValidation.isValid);

	return (
		<div className='flex justify-center items-center w-screen h-screen fixed z-50 top-0 left-0 bg-black/80'>
			<form
				noValidate
				className='flex flex-col justify-between gap-8  w-[400px] p-6 border border-black absolute bg-neutral-100 text-black rounded-lg'
				onSubmit={handleSubmit}
			>
				<h2 className='text-center text-2xl font-semibold'>New user</h2>

				<div className='flex flex-col justify-start items-center gap-4'>
					<InputField
						type='text'
						id='firstName'
						label='First name'
						value={firstName}
						setValue={setFirstName}
						placeholder='Enter first name'
						isTriggered={firstNameValidation.isTriggered}
						isValid={firstNameValidation.isValid}
						setValueValidation={setFirstNameValidation}
						validateInput={validateInput}
						invalidMessage='Invalid first name'
					/>

					<InputField
						type='text'
						id='lastName'
						label='Last name'
						value={lastName}
						setValue={setLastName}
						placeholder='Enter last name'
						isTriggered={lastNameValidation.isTriggered}
						isValid={lastNameValidation.isValid}
						setValueValidation={setLastNameValidation}
						validateInput={validateInput}
						invalidMessage='Invalid last name'
					/>

					<InputField
						type='email'
						id='email'
						label='Email'
						value={email}
						setValue={setEmail}
						placeholder='Enter email'
						isTriggered={emailValidation.isTriggered}
						isValid={emailValidation.isValid}
						setValueValidation={setEmailValidation}
						validateInput={validateInput}
						invalidMessage='Invalid email'
					/>

					<InputField
						type='password'
						id='password'
						label='Password'
						value={password}
						setValue={setPassword}
						placeholder='Enter password'
						isTriggered={passwordValidation.isTriggered}
						isValid={passwordValidation.isValid}
						setValueValidation={setPasswordValidation}
						validateInput={validateInput}
						invalidMessage='Invalid password'
					/>
				</div>

				<div className='flex justify-between items-center gap-4 mt-4'>
					<button
						className='rounded-lg border-2 border-neutral-300 p-3 min-w-32 transition-colors duration-300 hover:bg-white'
						type='button'
						onClick={handleClick}
					>
						Cancel
					</button>

					<button className='rounded-lg border-2 border-neutral-300 p-3 min-w-32 transition-colors duration-300 hover:bg-white' type='submit'>
						Add
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddUser;
