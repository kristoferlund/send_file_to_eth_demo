import Header from "./components/header/Header";
import ReceivedFiles from "./components/ReceivedFiles";
import SendFile from "./components/SendFile";
import useRegisterUser from "./user/hooks/useRegisterUser";

function App() {
  // Calling this hook "registers" the user with the backend actor,
  // that is, it ensures that the user is known to the backend actor and
  // that the users Ethereum address is linked with the user principal.
  const { data: registeredAddress, isPending } = useRegisterUser();

  if (isPending) {
    return null;
  }

  if (!registeredAddress) {
    return <div>Failed to register user</div>;
  }

  return (
    <div className="flex flex-col items-center w-full dark">
      <Header />
      <div className="flex flex-col items-center w-full gap-10 p-5 mb-20">
        <SendFile />
        <ReceivedFiles />
      </div>
    </div>
  );
}

export default App;
