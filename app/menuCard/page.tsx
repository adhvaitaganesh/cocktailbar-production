
import Image from 'next/image'
import Header from '@/components/header'

export default function Menu() {
  const cocktails = [
    {
      name: "Bohemian Sunset",
      description: "A mesmerizing blend of aged rum, absinthe, and exotic fruit juices",
      price: "$14",
      image: "https://images.pexels.com/photos/2480828/pexels-photo-2480828.jpeg" // Add your image to public folder
    },
    {
      name: "Artist's Muse",
      description: "Gin infused with lavender, elderflower liqueur, and champagne",
      price: "$16",
      image: "https://images.pexels.com/photos/1304540/pexels-photo-1304540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    // Add more cocktails as needed
  ]

  return (
    <main className="min-h-screen bg-[#1a1814]">
      <Header />
      <div className="max-w-7xl mx-auto pt-28 px-6">
        <h1 className="text-4xl md:text-6xl text-center font-serif text-[#cda45e] mb-16">
          Our Signature Cocktails
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cocktails.map((cocktail, index) => (
            <div 
              key={index} 
              className="border border-[#cda45e] p-6 rounded-lg hover:bg-black/30 transition-all"
            >
              <div className="relative h-48 mb-4">
                <Image
                  src={cocktail.image}
                  alt={cocktail.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <h3 className="text-xl text-[#cda45e] mb-2">{cocktail.name}</h3>
              <p className="text-gray-300 mb-4">{cocktail.description}</p>
              <p className="text-[#cda45e] font-bold">{cocktail.price}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}