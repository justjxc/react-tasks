import Layout from './components/Layout/Layout';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { AuthProvider } from './contexts/AuthContext';
import { BoardsProvider } from './contexts/BoardsContext';
import { AddProvider } from './contexts/AddContext';
import { ActiveBoardProvider } from './contexts/ActiveBoardContext';

function App() {
	return (
		<div className='App'>
			<BoardsProvider>
				<AuthProvider>
					<AddProvider>
						<ActiveBoardProvider>
							<Header />

							<Layout>
								<Main />
							</Layout>
						</ActiveBoardProvider>
					</AddProvider>
				</AuthProvider>
			</BoardsProvider>
		</div>
	);
}

export default App;
