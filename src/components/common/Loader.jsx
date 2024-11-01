import { useLoader } from "../../stores/loader";

function Loader() {
  const { isLoading } = useLoader();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
    </div>
  );
}

export default Loader;
