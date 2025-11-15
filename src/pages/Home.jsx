const Home = () => {
    return (
        // CORREÇÃO ESSENCIAL: BrowserRouter deve envolver os Routes
        <BrowserRouter>
            <Navbar /> 
            <main className="container mx-auto p-4 min-h-screen"> 
                <div className="mt-8">
                    {/* Aqui o seu roteamento está seguro e funcional */}
                    <Routes>
                        <Route path="/" element={<Home />} /> 
                        <Route path="/profiles" element={<ProfileList />} /> 
                    </Routes>
                </div>
            </main>
            <Footer />
        </BrowserRouter>
    );
}

// Componente Footer para completar a estética
const Footer = () => (
    <footer className="bg-gray-800 text-white p-4 mt-10">
        <div className="max-w-7xl mx-auto text-center text-sm">
            © {new Date().getFullYear()} Talent.Hub. Todos os direitos reservados.
        </div>
    </footer>
);


export default Home;