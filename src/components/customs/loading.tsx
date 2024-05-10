import { HashLoader } from "react-spinners";

interface LoadingProps {
  state: boolean;
}

const Loading = ({ state }: LoadingProps) => {
  return (
    <>
      {state ? (
        <main className="absolute w-full h-full z-20 transition-all ease-in-out">
          <div className="flex justify-center items-center flex-col bg-black/80  h-full p-2">
            <div className="bg-white p-6 rounded-lg flex flex-col gap-6 justify-center items-center">
              <HashLoader color="#4245D1" />
              <span className="text-primary font-semibold">
                Sedang Memproses...
              </span>
            </div>
          </div>
        </main>
      ) : null}
    </>
  );
};

export default Loading;
