import FileTagger from './components/FileTagger';

function App() {
  return (
    <FileTagger
      className="min-h-[70vh] h-full w-full bg-blue-500/10 rounded-md border border-blue-500"
      title="Drop files here"
      multiple
    />
  );
}

export default App;
