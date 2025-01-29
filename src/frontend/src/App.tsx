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
    <div className="flex flex-col items-center w-full dark h-lvh">
      <Header />
      <div className="flex flex-grow flex-col items-center justify-center w-full gap-10 p-5 mb-20 max-w-2xl">
        <div className="flex w-full">
          <img alt="ic" className="w-40" src="/icp-logo.png" />
        </div>
        <SendFile />
        <ReceivedFiles />
        <div className="bg-destructive/50 rounded p-5 text-primary/50">
          Do not trust this application with real secrets, it uses a fake
          implementation of the vetKeys api. The production of vetKeys will be
          available Q2 2025.
        </div>
        <div className="text-primary/50">
          Fork on{" "}
          <a
            href="https://github.com/kristoferlund/send_file_to_eth_demo"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
