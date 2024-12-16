import { DataProvider } from "@/lib/dataProvider";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  return (
  <DataProvider>
  <Component {...pageProps} />
  <ToastContainer theme="colored"/>
  </DataProvider>
);

}
