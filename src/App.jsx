import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import WhyChooseUs from './components/WhyChooseUs'
import ProcessTimeline from './components/ProcessTimeline'
import Products from './components/Products'
import Portfolio from './components/Portfolio'
import Partners from './components/Partners'
import Leadership from './components/Leadership'
import Contact from './components/Contact'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="app-content">
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <ProcessTimeline />
        <Products />
        <Portfolio />
        <Partners />
        <Leadership />
        <Contact />
      </main>
    </div>
  )
}

export default App
