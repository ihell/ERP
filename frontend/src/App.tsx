import { Button } from "@/components/ui/button";
import Produk from './pages/Produk'
import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Produk />
      <Button variant="default" size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
        Hello ERP ✨
      </Button>
    </div>
  )
}

export default App
