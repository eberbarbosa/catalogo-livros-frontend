import Header from "./Header";
import "@/styles/global.css";

export default function Layout({ children }) {
  return (
    <div className="app">
      <Header />

      <main className="container">
        {children}
      </main>
    </div>
  );
}