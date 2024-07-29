import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../firebase/firebase';
import { handleError } from '../../utils/handleError';
import { useAddContext } from '../../contexts/AddContext';
import InputField from '../InputField/InputField';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [emailValidation, setEmailValidation] = useState({ isTriggered: false, isValid: false });
	const [passwordValidation, setPasswordValidation] = useState({ isTriggered: false, isValid: false });

	const { setIsLoginFormActive } = useAddContext();

	const validateInput = (target, setValid) => {
		setValid(prev => {
			return { ...prev, isTriggered: true };
		});

		let isValid = false;

		switch (target.id) {
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

	const handleClick = () => {
		setIsLoginFormActive(prev => !prev);
	};

	const handleSubmit = async e => {
		e.preventDefault();

		if (emailValidation.isValid && passwordValidation.isValid) {
			await signInWithEmailAndPassword(auth, email, password).catch(handleError);

			setIsLoginFormActive(prev => !prev);
		} else {
			alert('Fill all the fields');

			setEmailValidation(prev => {
				return { ...prev, isTriggered: true };
			});
			setPasswordValidation(prev => {
				return { ...prev, isTriggered: true };
			});
		}
	};

	return (
		<div className='flex justify-center items-center w-screen h-screen absolute top-0 left-0 bg-black/80 z-50'>
			<form
				className='flex flex-col justify-between gap-8  w-[400px] p-6 pb-10 border border-black absolute bg-neutral-100 text-black rounded-lg'
				onSubmit={handleSubmit}
			>
				<h2 className='text-center text-2xl font-semibold'>Login</h2>

				<div className='flex flex-col justify-start items-center gap-4'>
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

				<div className='flex justify-between items-center gap-4'>
					<button
						className='rounded-lg border-2 border-neutral-300 p-3 min-w-32 transition-colors duration-300 hover:bg-white'
						type='button'
						onClick={handleClick}
					>
						Cancel
					</button>

					<button className='rounded-lg border-2 border-neutral-300 p-3 min-w-32 transition-colors duration-300 hover:bg-white' type='submit'>
						Login
					</button>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
