import { ToastContainer } from "react-toastify";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }) {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="mx-auto w-full lg:max-w-[800px] xl:max-w-[1200px] px-4 pb-2">
        <Topbar />
        {children}
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={true}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={false}
          theme="dark"
          toastClassName="bg-zinc-100 text-zinc-900"
          className="w-full max-w-[400px]"
        />
      </div>
    </div>
  );
}
