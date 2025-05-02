'use client';

import { useCart } from '../data/CartContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';
import { products } from '../data/products';


export default function PaymentPage() {
  const { cart } = useCart();
  const router = useRouter();

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

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    console.log(formData);
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    const body = {
      products: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      ...formData,
    }
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await fetch('/api/checkout-session', {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }    
  };

  return (
    <div className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-header mb-8">Podsumowanie</h2>
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-20 h-20 relative bg-gray-800 rounded-md overflow-hidden">
                    {item.images?.[0] && (
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
                    <a href={`/products/${item.id}`} className="font-header text-xl">{item.name}</a>
                    <p className="text-gray-400">Cena: {item.price} zł</p>
                    <p className="text-gray-400">Ilość: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-800">
              <div className="flex justify-between items-center">
                <span className="font-header text-xl">Razem</span>
                <span className="font-header text-2xl">{totalPrice} zł</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2 className="text-3xl font-header mb-8">Dane do wysyłki</h2>
            <form onSubmit={handleSubmitPayment} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <input name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="Imię" className="form-input" />
                <input name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Nazwisko" className="form-input" />
                <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="E-mail" className="form-input" />
                <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="Nr. telefonu" className="form-input" />
                <div className="grid grid-cols-2 gap-4">
                  <input name="city" value={formData.city} onChange={handleChange} required placeholder="Miasto" className="form-input" />
                  <input name="zip" value={formData.zip} onChange={handleChange} required placeholder="Kod pocztowy" className="form-input" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input name="street" value={formData.street} onChange={handleChange} required placeholder="Ulica" className="form-input" />
                  <input name="houseNumber" value={formData.houseNumber} onChange={handleChange} required placeholder="Numer domu" className="form-input" />
                </div>
                <input name="apartmentNumber" value={formData.apartmentNumber} onChange={handleChange} placeholder="Numer mieszkania" className="form-input" />
                <select name="deliveryMethod" value={formData.deliveryMethod} onChange={handleChange} required className="form-input">
                  <option value="">Wybierz metodę dostawy</option>
                  <option value="courier">Kurier</option>
                  <option value="parcel_locker">Paczkomat</option>
                  <option value="post">Poczta Polska</option>
                </select>
                <div className="mt-6">
                  <button type="submit" className="border-2 border-blue-400 text-blue-200 hover:bg-blue-400 hover:text-blue-950 font-body py-3 px-10 transition-all uppercase tracking-wider text-sm font-medium">
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
