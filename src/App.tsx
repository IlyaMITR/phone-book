import AuthForm from './components/forms/AuthForm';
import RegistrationForm from './components/forms/RegistrationForm';
import PhoneBook from './components/phone-book/PhoneBook';
import { useAppSelector } from './hooks/redux';

function App() {
  const page = useAppSelector(state => state.data.currentPage) // 1 - authorisation, 2 - registration, 3 - phone book

  const switchPage = () => {
    switch (page) {
      case 1:
        return <AuthForm />
      case 2:
        return <RegistrationForm />
      case 3:
        return <PhoneBook />
      default:
        return <AuthForm />
    }
  }
  
  return (
    <div className="App">
      {
        switchPage()
      }
    </div>
  );
}

export default App;
