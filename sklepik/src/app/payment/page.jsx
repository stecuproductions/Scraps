'use client';

import { useCart } from '../data/CartContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
export default function PaymentPage() {
  const { cart } = useCart();
  const router = useRouter();
   

  // Calculate total
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    zip: '',
    street: '',
    houseNumber: '',
    apartmentNumber: '',
    deliveryMethod: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmitPayment = (e) => {
    e.preventDefault();
    alert('Przejdź do płatności - formularz wysłany!');
  };

  return (
    <div className=" bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Summary - Left side */}
          <div className="lg:col-span-5">
            <div className="mb-8">
              <h2 className="text-3xl font-header">Podsumowanie</h2>
            </div>

            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-20 h-20 relative bg-gray-800 rounded-md overflow-hidden">
                    {item.images && item.images[0] && (
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        layout="responsive"
                        width={800}
                        height={600}
                        quality={100}
                        className="object-contain"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <a href={`/products/${item.id}`} className="font-header text-xl ">{item.name}</a>
                    <p className="text-gray-400">
                      Cena: {item.price.toFixed(2)} zł
                    </p>
                    <p className="text-gray-400">
                      Ilość: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-800">
              <div className="flex justify-between items-center">
                <span className="font-header text-xl">Razem</span>
                <span className="font-header text-2xl">{totalPrice.toFixed(2)} zł</span>
              </div>
            </div>
          </div>

          {/* Shipping Information - Right side */}
          <div className="lg:col-span-7">
            <div className="mb-8">
              <h2 className="text-3xl font-header">Dane do wysyłki</h2>
            </div>

            <form onSubmit={handleSubmitPayment} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  placeholder="Imię"
                  className="w-full p-3 bg-transparent border border-gray-700 focus:border-blue-400 outline-none transition-colors"
                  required
                />
                
                <input
                  type="text"
                  placeholder="Nazwisko"
                  className="w-full p-3 bg-transparent border border-gray-700 focus:border-blue-400 outline-none transition-colors"
                  required
                />
                
                <input
                  type="email"
                  placeholder="E-mail"
                  className="w-full p-3 bg-transparent border border-gray-700 focus:border-blue-400 outline-none transition-colors"
                  required
                />
                
                <input
                  type="tel"
                  placeholder="Nr. telefonu"
                  className="w-full p-3 bg-transparent border border-gray-700 focus:border-blue-400 outline-none transition-colors"
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Miasto"
                    className="w-full p-3 bg-transparent border border-gray-700 focus:border-blue-400 outline-none transition-colors"
                    required
                  />
                  
                  <input
                    type="text"
                    placeholder="Kod Pocztowy"
                    className="w-full p-3 bg-transparent border border-gray-700 focus:border-blue-400 outline-none transition-colors"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Ulica"
                    className="w-full p-3 bg-transparent border border-gray-700 focus:border-blue-400 outline-none transition-colors"
                    required
                  />
                  
                  <input
                    type="text"
                    placeholder="Numer domu"
                    className="w-full p-3 bg-transparent border border-gray-700 focus:border-blue-400 outline-none transition-colors"
                    required
                  />
                </div>
                
                <input
                  type="text"
                  placeholder="Numer Mieszkania"
                  className="w-full p-3 bg-transparent border border-gray-700 focus:border-blue-400 outline-none transition-colors"
                />
                
                <select
                  className="w-full p-3 bg-black border border-gray-700 focus:border-blue-400 outline-none transition-colors"
                  required
                >
                  <option  value="" defaultValue selected >Wybierz metodę dostawy</option>
                  <option value="courier">Kurier</option>
                  <option value="parcel_locker">Paczkomat</option>
                  <option value="post">Poczta Polska</option>
                </select>
                
                <div className="mt-6">
                  <button
                  
                    type="submit"
                    className="border-2 border-blue-400 text-blue-200 hover:bg-blue-400 hover:text-blue-950 font-body py-3 px-10 rounded-none transition-all duration-300 uppercase tracking-wider text-sm font-medium"
                  >
                    Przejdź do płatności
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}