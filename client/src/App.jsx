import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Advantages from "./components/Advantages";
import ContactInfo from "./components/ContactInfo";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import HowToOrder from "./components/HowToOrder";
import PopularServices from "./components/popularServices";
import Works from "./components/Works";
import "./index.css";

function App() {
  return (
    <div>
      <Header />

      <main>
        <Hero />
        <PopularServices />
        <Services />

        <HowToOrder />

        <Advantages />
        <Works />
        <ContactInfo />
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}

export default App;
