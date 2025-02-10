import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SignIn from './components/SignIn';
import Home from './pages/Home';
import DogDetails from './pages/DogDetails.tsx';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<Routes>
					<Route path='/signin' element={<SignIn />} />
					<Route path='/home' element={<Home />} />
					<Route path='/dogs/:id' element={<DogDetails />} />
					<Route path='/' element={<Navigate to='/signin' replace />} />
				</Routes>
			</Router>
		</QueryClientProvider>
	);
}

export default App;
